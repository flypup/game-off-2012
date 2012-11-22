var ec = ec || {};

(function() {
	'use strict';
	var THREE = window.THREE;
	var v3 = function(x, y, z) {
		return new THREE.Vector3(x, y, z);
	};

	var ThreeJsWorldView = ec.ThreeJsWorldView = function() {
		var halfwidth = Math.floor(320 * ec.width / ec.height);
	    var camera =
		//this.camera = new THREE.PerspectiveCamera( 75, ec.width / ec.height, 1, 10000 );
		this.camera = new THREE.OrthographicCamera( -halfwidth, halfwidth, 320, -320, -1000, 5000 );
		//this.camera = new THREE.CombinedCamera( halfwidth*2, halfwidth*2, 75, 1, 10000, -1000, 5000 );
	    camera.position.x = -320;//-1000;
	    camera.position.y = -320;//-1000;
	    camera.position.z = 262;
	    camera.up = v3( 0, 0, 1 );
	    camera.lookAt(v3(0, 0, 0));

	    var scene =
	    this.scene = new THREE.Scene();

	    var renderer;
	    try {
			renderer = this.renderer = ec.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
			ec.webgl = renderer instanceof THREE.WebGLRenderer;
	    } catch(e) {
			renderer = this.renderer = new THREE.CanvasRenderer();
			ec.webgl = false;
			ec.resizeDisplay();
	    }
	    renderer.setClearColorHex( 0xefefff, 1 );
	    renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.left =
		renderer.domElement.style.top = '0px';
		this.resize();
	    document.body.appendChild( renderer.domElement );
	};

	ThreeJsWorldView.prototype.updateShape = function() {
		var scene = this.scene;
		return function(shape) {
			if (shape.view) {
				shape.view.update(shape, scene);
			}
		};
	};

	ThreeJsWorldView.prototype.lookAt = function(x, y, z) {
		this.camera.lookAt(v3(x, y, z));
	};

	ThreeJsWorldView.prototype.draw = function() {
		this.renderer.render( this.scene, this.camera );
	};

	ThreeJsWorldView.prototype.resize = function() {
		var ratioX = ec.pixelRatio;
		var ratioY = ec.pixelRatioY || ratioX;
		var renderer = this.renderer;
		renderer.setSize( ec.width * ratioX, ec.height * ratioY );
	    renderer.domElement.style.width = ec.width + 'px';
        renderer.domElement.style.height = ec.height + 'px';
        if (renderer.domElement.getContext( '2d' )) {
			renderer.domElement.getContext( '2d' ).scale(ratioX, ratioY);
        }
	};

})();