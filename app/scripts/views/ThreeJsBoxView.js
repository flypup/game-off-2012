var ec = ec || {};

(function() {
	'use strict';
	var THREE = window.THREE;

	ec.ThreeJsBoxView = function() {
		this.update = this.createMesh;
	};

	ec.ThreeJsBoxView.prototype.createMesh = function(body, scene) {

		//var verts = body.shape.verts;
		var BOX_WIDTH  = 64;
		var BOX_HEIGHT = 64;

		var geometry = new THREE.CubeGeometry( BOX_WIDTH, BOX_HEIGHT, BOX_WIDTH );
	    var material = new THREE.MeshBasicMaterial( {
			color: 0xff0000, wireframe: true
	    } );

	    var mesh =
	    this.mesh = new THREE.Mesh( geometry, material );
	    mesh.matrixAutoUpdate = false;
	    mesh.frustumCulled = false;
	     //mesh.renderDepth

	    scene.add( mesh );

	    this.update = this.updateMesh;
	    this.update(body, scene);
	};

	ec.ThreeJsBoxView.prototype.updateMesh = function(shape, scene) {
		if (shape.body && !shape.body.isSleeping()) {
			this.mesh.position.x = shape.body.p.x;
			this.mesh.position.y = shape.body.p.y;
			this.mesh.position.z = shape.body.z;
			this.mesh.rotation.z = shape.body.a;
			// TODO: mesh.renderDepth - custom (faster) depth sorting
			this.mesh.updateMatrix();
		}
	};

})();