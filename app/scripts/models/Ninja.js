(function(window) {
	'use strict';

	var ec = window.ec;
	var cp = window.cp;
	var v = cp.v;
	var abs = Math.abs;

	var RADIUS = 32;
	var direction = v(0,0);
	var intent = v(0,0);

	var Ninja = ec.Ninja = function() {
		this.groupId = ec.Entity.groupId++;

		this.assignCircleShape(RADIUS, 1);
		
		this.shape.setElasticity(0);
		this.shape.setFriction(0);

		this.setPos(0, 0, 32);
		this.body.a = 3;

		this.shape.collision_type = ec.World.MONSTER_TYPE;

		// TODO: better states!
		this.shape.group = this.groupId;
		this.state = 'standing';
		this.walkCount = 0;
		this.speed = 8;
		this.attack = new ec.EmptyHand(RADIUS-4, 1); // Ninja Star

		this.isShadowClone = false;
		this.hitPoints = 100;
	};

	var proto = Ninja.prototype;
	ec.extend(proto, ec.Entity.prototype);

	proto.shadowClone = function() {
		if (this.isShadowClone) {
			console.error('shadow clone tried to clone itself!');
			return;
		}
		var shadowClone = new ec.Ninja().setPos(this.body.p.x, this.body.p.y, 32).setInput(new ec.EnemyInput());
		// TODO: use ShadowClone class and prototype or something cool to inherit stuff
		shadowClone.isShadowClone = true;
		shadowClone.master = this;
		ec.world.add(shadowClone);
	};

	proto.hit = function(arbiter, world, damage) {
		var energy = arbiter.totalKE();
		//console.log('HIT', this, 'KE', energy);
		if (energy > 0) {
			this.state = 'hit';
			this.hitTime =
			this.hitDuration = 1000;
			if (this.isShadowClone) {
				this.hitPoints = damage ? 0 : this.hitPoints;
			} else {
				this.hitPoints -= damage;
			}
			// TODO: Apply impulse
			this.body.w = energy/10000;
		}
		return this;
	};

	proto.step = function(delta) {
		this.input.poll(this);
		
		//this.attackStep(ec.world.time, ec.world);
		if (this.hitTime > 0) {
			this.hitTime -= delta;
			//hit animation
			if (this.hitTime <= 0) {
				this.hitTime = 0;
				if (this.hitPoints <= 0) {
					this.state = 'dead';
					if (this.isShadowClone) {
						// TODO: POOF!
						ec.world.remove(this);
					} else {
						// TODO: remove all shadow clones

					}
				} else {
					this.state = 'standing'; //getting up
				}
			}
			return;
		}

		this.body.resetForces();

		if (this.attack.phase === ec.EmptyHand.PASSIVE || this.attack.phase === ec.EmptyHand.PULLING) {
			direction.x =  this.input.axes[0];
			direction.y = -this.input.axes[1];
			if (abs(direction.x) > 0.1 || abs(direction.y) > 0.1) {
				if (abs(direction.x) > 0.7 || abs(direction.y) > 0.7) {
					// normalize the vector
					direction.mult(1/v.len(direction));
				}

				// console.log(this.input.axes, direction.x, direction.y);
				// console.log('v', this.body.vx, this.body.vy);

				direction.mult(this.speed*1000/delta);
				this.body.activate();
				this.body.vx += direction.x;
				this.body.vy += direction.y;
				this.body.vx *= 0.5;
				this.body.vy *= 0.5;
				//this.body.applyForce(direction, cp.vzero);
				// direction.mult(this.speed);
				// this.body.applyImpulse(direction, cp.vzero);

				// TODO: tween angular motion
				this.body.w = 0;
				this.body.a = Math.atan2(direction.y, direction.x);

				if (!ec.playerInteracted) {
					ec.playerInteracted = true;
					ec.core.trackCustom(1, 'Player Interacted', 'Yes', 2);
				}

			} else {
				this.body.vx = 0;
				this.body.vy = 0;
				this.body.w *= 0.99;
				// if(!this.body.isSleeping() && this.body.space) {
				//	this.body.space.deactivateBody(this.body);
				// }
			}
		}
		intent.x =  this.input.axes[2];
		intent.y = -this.input.axes[3];
		if (abs(intent.x) > 0.1 || abs(intent.y) > 0.1) {
			//if (abs(intent.x) > 0.7 || abs(intent.y) > 0.7) {
			// normalize the vector
			intent.mult(1/v.len(intent));
			//}

			//this.punch(ec.world.time, ec.world, delta);
		} else {
			intent.x = 0;
			intent.y = 0;
		}

		return this;
	};

})(window);