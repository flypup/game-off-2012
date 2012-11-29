var ec=ec||{version:"0.1.107"};(function(a){"use strict",a.ec=ec;var b=a.document,c=a.Modernizr;c.addTest({mobile:function(){return/iPhone|iPad|iPod|Android/.test(navigator.userAgent)},ios:function(){return/iPhone|iPad|iPod/.test(navigator.userAgent)},ipad:function(){return/iPad/.test(navigator.userAgent)},android:function(){return/Android/.test(navigator.userAgent)},standalone:function(){return!!navigator.standalone}}),ec.webgl=c.webgl,ec.touch=c.touch,ec.mobile=c.mobile,ec.ios=c.ios,ec.ipad=c.ipad,ec.android=c.android,ec.fullscreen=c.fullscreen,ec.gamepads=c.gamepads,ec.debug=1;var d,e,f,g,h=ec.TIME_STEP=1/60,i=!1,j,k,l,m=0,n=5,o,p,q=null,r="resizeDisplay,addBrowserListeners,Box,Circle,Player,World,ThreeJsBoxView,ThreeJsSphereView,ThreeJsWorldView,Canvas2dView,TextField,ChipmunkDebugView,DebugView,UserInput,SpriteSheets,ButtonOverlay".split(","),s="cp,THREE,createjs,Stats,dat".split(","),t=function(a,b){for(var c=0,d=b.length;c<d;c++)if(a[b[c]]===undefined)return!1;return!0},u=ec.core={load:function(b){if(!t(a,s)||!t(ec,r)){console.log("loading"),v(u.load);return}console.log("init"),u.init(b)},init:function(b){k=b,l=0,v(u.animate),o=new ec.UserInput,d=new ec.World,d.addWalls(),p=d.add((new ec.Player).setPos(-200,400,32).setInput(o).setView(new ec.ThreeJsSphereView)),d.add((new ec.Box(d.createStaticBody())).setPos(-250,0,32).setView(new ec.ThreeJsBoxView)),d.add((new ec.Box(d.createStaticBody())).setPos(250,0,32).setView(new ec.ThreeJsBoxView)),d.add((new ec.Box).setView(new ec.ThreeJsBoxView)),d.add((new ec.Circle).setView(new ec.ThreeJsSphereView)),ec.resizeDisplay(),ec.SpriteSheets.init(),e=new ec.Canvas2dView,g=new ec.ChipmunkDebugView(d.space),f=new ec.DebugView,ec.debug&&ec.core.setDebugLevel(ec.debug),e.setInput(o),ec.addBrowserListeners(o);if(ec.touch){var c=e.width*ec.pixelRatio,h=e.height*ec.pixelRatioY||ec.pixelRatio;ec.ButtonOverlay.viewWidth=c,ec.ButtonOverlay.viewHeight=h,o.setLeftStickOverlay(o.addButtonOverlay(new ec.ButtonOverlay({x:160,y:h-160,radius:150}))),o.setRightStickOverlay(o.addButtonOverlay(new ec.ButtonOverlay({x:c-160,y:h-160,radius:150})));var j=o.addButtonOverlay(new ec.ButtonOverlay({x:c,y:50,radius:150})),m=o.addButtonOverlay(new ec.ButtonOverlay({x:0,y:50,radius:150}));ec.bind(j,"touchstart",ec.core.togglePause,!1),ec.bind(m,"touchstart",ec.core.cycleDebug,!1)}ec.mobile&&a.scrollTo(0,1),ec.view=e,ec.world=d,i=!0,q=new Image,q.src="img/ui/startscreen.png",e.lookAt(p.body.p.x,-p.body.p.y),ec.touch?ec.bind(ec.core.getViewDom(),"touchstart",ec.core.start,!1):ec.bind(ec.core.getViewDom(),"mousedown",ec.core.start,!1),!!ec.touch,ec.core.trackEvent("core","inited",ec.version,undefined,!0)},start:function(){q=null},animate:function(a){v(u.animate),ec.debug>0&&f.stats.begin(),j=(a-k)/1e3,k=a,j=Math.max(h,Math.min(j,h*10));if(!i){l+=j;while(l>=h)l-=h,d.step(h);m+=j,d.entities.length<100&&m>n&&(m-=n,d.add((new ec.Box).setView(new ec.ThreeJsBoxView)),d.add((new ec.Circle).setView(new ec.ThreeJsSphereView))),e.lookAt(p.body.p.x,-p.body.p.y)}ec.debug<3&&e.draw(d),ec.debug>0&&(ec.debug>1&&g.step(),f.stats.end())},getOverlay:function(){return q},pause:function(){console.log("pause"),i=!0,e.pause()},resume:function(){console.log("resume"),i=!1,e.resume()},togglePause:function(){ec.core.paused()?ec.core.resume():ec.core.pause()},paused:function(){return i},fullscreen:function(){if(ec.fullscreen){var a=b.body;a.requestFullscreen=a.requestFullscreen||a.mozRequestFullscreen||a.mozRequestFullScreen||a.webkitRequestFullscreen,a.requestFullscreen()}},resize:function(){ec.resizeDisplay()&&(e.resize(),g.resize())},getViewDom:function(){return e.getDom()},trackPage:function(b){a._gaq&&a._gaq.push(["_trackPageview",b])},trackEvent:function(b,c,d,e,f){a._gaq&&a._gaq.push(["_trackEvent",b,c,d,e,f])},trackCustom:function(b,c,d,e){a._gaq&&a._gaq.push(["_setCustomVar",b,c,d,e])},setDebugLevel:function(a){a<0&&(a=3),f.hide(),g.hide();switch(a){case 3:case 2:g.show();case 1:f.show()}ec.debug=a,console.log("debug level",a)},cycleDebug:function(){ec.core.setDebugLevel(ec.debug-1)}};Date.now||(Date.now=function(){return+(new Date)});var v=a.requestAnimationFrame||c.prefixed("RequestAnimationFrame",a);if(!v){var w=0;v=function(b,c){var d=Date.now(),e=Math.max(0,16-(d-w)),f=a.setTimeout(function(){b(d+e)},e);return w=d+e,f}}v(u.load),ec.core.trackEvent("core","preload",ec.version,undefined,!0)})(window),function(a){"use strict";var b=a.ec,c=a.document;b.addBrowserListeners=function(d){this.bind(a,"blur",this.core.pause,!1),b.touch?(this.bind(b.core.getViewDom(),"touchstart",d.touchstart,!1),this.bind(b.core.getViewDom(),"touchmove",d.touchmove,!1),this.bind(b.core.getViewDom(),"touchend",d.touchend,!1)):(this.bind(b.core.getViewDom(),"mousedown",d.mousedown,!1),this.bind(b.core.getViewDom(),"mouseup",d.mouseup,!1)),b.mobile||this.bind(a,"resize",this.core.resize,!1),this.bind(c,"keydown",d.keydown,!1),this.bind(c,"keyup",d.keyup,!1)},b.bind=function(a,b,c,d){d=d||!1,a.addEventListener?a.addEventListener(b,c,d):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c},b.unbind=function(a,b,c,d){d=d||!1,a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent?a.detachEvent("on"+b,c):delete a["on"+b]}}(window),function(a){"use strict";var b=a.ec,c=a.document;b.resizeDisplay=function(){var d,e,f,g;d=e=b.forcePixelRatio||a.devicePixelRatio||1,b.ipad&&!b.webgl&&(e=Math.min(1.333333,d),d=Math.min(1,d));if(b.mobile){var h=Math.max(a.screen.width,a.screen.height),i=Math.min(a.screen.width,a.screen.height);f=h,g=i}else{var j=16,k=9,l,m;f=j,g=k,l=a.innerWidth,m=a.innerHeight;while(f+j<=l&&g+k<=m)f+=j,g+=k;c.body.style.left=Math.floor((l-f)/2)+"px",c.body.style.top=Math.floor((m-g)/2)+"px"}return b.width!==f||b.height!==g||b.pixelRatio!==d||b.pixelRatioY!==e?(b.pixelRatio=d,b.pixelRatioY=e,b.width=f,b.height=g,c.body.style.width=f+"px",c.body.style.height=g+"px",!0):!1}}(window),function(a){"use strict";var b=a.cp,c=b.v,d=64,e=64,f=a.ec.Box=function(a){if(a)this.body=a;else{var c=1,f=b.momentForBox(c,d,e);a=this.body=new b.Body(c,f)}var g=this.shape=new b.BoxShape(a,d,e);g.setElasticity(0),g.setFriction(.6),this.setPos(-64,0,32)},g=f.prototype;g.z=0,g.setView=function(a){return this.view=this.shape.view=a,this},g.setPos=function(a,b,c){this.body.activate(),this.body.p.x=a,this.body.p.y=b,c!==undefined&&(this.z=this.body.z=c);if(this.body.isStatic())for(var d=0;d<this.body.shapeList.length;d++){var e=this.body.shapeList[d];e.update(this.body.p,this.body.rot),e.space&&e.space.staticShapes.reindexObject(e,e.hashid)}return this},g.step=function(a){return this}}(window),function(a){"use strict";var b=a.cp,c=b.v,d=32,e=a.ec.Circle=function(){var a=1,e=b.momentForCircle(a,0,d,c(0,0)),f=this.body=new b.Body(a,e),g=this.shape=new b.CircleShape(f,d,c(0,0));g.setElasticity(0),g.setFriction(.6),this.setPos(64,64,32)},f=e.prototype;f.z=0,f.setView=function(a){return this.view=this.shape.view=a,this},f.setPos=function(a,b,c){return this.body.activate(),this.body.p.x=a,this.body.p.y=b,c!==undefined&&(this.z=this.body.z=c),this},f.step=function(a){return this}}(window),function(a){"use strict";var b=a.ec,c=a.cp,d=c.v,e=Math.abs,f=32,g=d(0,0);b.playerInteracted=!1;var h=a.ec.Player=function(){var a=1,e=c.momentForCircle(a,0,f,d(0,0)),g=this.body=new c.Body(a,e),h=this.shape=new c.CircleShape(g,f,d(0,0));this.input=function(){},h.setElasticity(0),h.setFriction(0),this.setPos(64,64,32),this.speed=8,b.core.trackCustom(1,"Player Interacted","No",2)},i=h.prototype;i.z=0,i.setView=function(a){return this.view=this.shape.view=a,this},i.setPos=function(a,b,c){return this.body.activate(),this.body.p.x=a,this.body.p.y=b,c!==undefined&&(this.z=this.body.z=c),this},i.setInput=function(a){return this.input=a,this},i.step=function(a){return this.input.poll(),this.body.resetForces(),g.x=this.input.axes[0],g.y=-this.input.axes[1],e(g.x)>.1||e(g.y)>.1?((e(g.x)>.7||e(g.y)>.7)&&g.mult(1/d.len(g)),g.mult(this.speed/a),this.body.activate(),this.body.vx+=g.x,this.body.vy+=g.y,this.body.vx*=.5,this.body.vy*=.5,this.body.w=0,this.body.a=Math.atan2(g.y,g.x),b.playerInteracted||(b.playerInteracted=!0,b.core.trackCustom(1,"Player Interacted","Yes",2))):(this.body.vx=0,this.body.vy=0,this.body.w*=.99),this}}(window),function(a){"use strict";var b=a.cp,c=b.v,d=1<<31,e=~d,f=640,g=a.ec.World=function(){var d=this.space=new b.Space;d.gravity=c(0,0),d.iterations=10,d.sleepTimeThreshold=a.ec.TIME_STEP*9,d.idleSpeedThreshold=.1,d.collisionSlop=.025,d.collisionBias=Math.pow(.25,60),d.damping=.5,this.entities=[]};g.prototype.addWalls=function(){this.addLineSegment(c(f,-f),c(f,f)),this.addLineSegment(c(f,f),c(-f,f)),this.addLineSegment(c(-f,f),c(-f,-f)),this.addLineSegment(c(-f,-f),c(f,-f))},g.prototype.addLineSegment=function(a,c){var d=this.space.addShape(new b.SegmentShape(this.space.staticBody,a,c,0));return d.setElasticity(0),d.setFriction(1),d.setLayers(e),d},g.prototype.add=function(a){var b=this.entities.indexOf(a);return b<0?(a.body.isStatic()||this.space.addBody(a.body),this.space.addShape(a.shape),this.entities.push(a),a):(console.error("entity already a child of world",a),null)},g.prototype.remove=function(a){var b=this.entities.indexOf(a);return b>-1?(a.body.isStatic()||this.space.removeBody(a.body),this.space.removeShape(a.shape),this.entities.splice(b,1),a):(console.error("entity not a child of world",a),null)},g.prototype.createStaticBody=function(){var a=new b.Body(Infinity,Infinity);return a.nodeIdleTime=Infinity,a},g.prototype.step=function(a){for(var b=0,c=this.entities.length;b<c;b++)this.entities[b].step(a);this.space.step(a)}}(window),function(a){"use strict";var b=a.THREE,c=a.ec.ThreeJsBoxView=function(){this.update=this.createMesh};c.prototype.createMesh=function(a,c){var d=64,e=64,f=new b.CubeGeometry(d,e,d),g=new b.MeshBasicMaterial({color:16711680,wireframe:!0}),h=this.mesh=new b.Mesh(f,g);h.matrixAutoUpdate=!1,h.frustumCulled=!1,c.add(h),this.update=this.updateMesh,this.update(a,c)},c.prototype.updateMesh=function(a,b){a.body&&!a.body.isSleeping()&&(this.mesh.position.x=a.body.p.x,this.mesh.position.y=a.body.p.y,this.mesh.position.z=a.body.z,this.mesh.rotation.z=a.body.a,this.mesh.updateMatrix())}}(window),function(a){"use strict";var b=a.THREE,c=a.ec.ThreeJsSphereView=function(){this.update=this.createMesh};c.prototype.createMesh=function(a,c){var d=32,e=4,f=2,g=new b.SphereGeometry(d,e,f),h=new b.MeshBasicMaterial({color:16711680,wireframe:!0}),i=this.mesh=new b.Mesh(g,h);i.matrixAutoUpdate=!1,i.frustumCulled=!1,c.add(i),this.update=this.updateMesh,this.update(a,c)},c.prototype.updateMesh=function(a,b){a.body&&!a.body.isSleeping()&&(this.mesh.position.x=a.body.p.x,this.mesh.position.y=a.body.p.y,this.mesh.position.z=a.body.z,this.mesh.rotation.z=a.body.a,this.mesh.updateMatrix())}}(window),function(a){"use strict";var b=a.ec,c=a.THREE,d=function(a,b,d){return new c.Vector3(a,b,d)},e=b.ThreeJsWorldView=function(){var a=Math.floor(320*b.width/b.height),e=this.camera=new c.OrthographicCamera(-a,a,320,-320,-1e3,5e3);e.matrixAutoUpdate=!1,e.position.x=-320,e.position.y=-320,e.position.z=262,e.up=d(0,0,1),e.lookAt(d(0,0,0));var f=this.scene=new c.Scene,g=new c.ImageUtils.loadTexture("img/tile/floor_8888_32.png");g.wrapS=g.wrapT=c.RepeatWrapping,g.repeat.x=10,g.repeat.y=10;var h=new c.Mesh(new c.PlaneGeometry(1280,1280,4,4),new c.MeshBasicMaterial({map:g,wireframe:!1,wireframeLinewidth:16,shading:c.NoShading}));h.matrixAutoUpdate=!1,h.frustumCulled=!1,h.renderDepth=-1e3,f.add(h);var i=c.ImageUtils.loadTexture("img/sprite/minipr.png");for(var j=0;j<20;j++){var k=new c.Particle(new c.ParticleBasicMaterial({color:16777215,map:i,size:100,sizeAttenuation:!0,vertexColors:!1,fog:!1}));k.position.x=Math.random()*800-400,k.position.y=Math.random()*800-400,k.position.z=Math.random()*800-400,k.scale.x=k.scale.y=Math.random()*10+10,f.add(k)}var l;try{l=this.renderer=b.webgl?new c.WebGLRenderer:new c.CanvasRenderer,b.webgl=l instanceof c.WebGLRenderer}catch(m){l=this.renderer=new c.CanvasRenderer,b.webgl=!1,b.resizeDisplay()}l.antialias=!0,l.sortObjects=!1,l.sortElements=!1,l.autoClear=!1,l.setClearColorHex(15724543,1),l.domElement.style.position="absolute",l.domElement.style.left=l.domElement.style.top="0px",this.resize(),document.body.appendChild(l.domElement),this.updateShapeView=this.updateShape()},f=e.prototype;f.updateShape=function(){var a=this.scene;return function(b){b.view&&b.view.update(b,a)}},f.lookAt=function(a,b,c){this.camera.lookAt(d(a,b,c))},f.setInput=function(a){return this.input=a,a.resize(b.width,b.height),this},f.draw=function(a){a.space.activeShapes.count>0&&a.space.eachShape(this.updateShapeView),this.renderer.render(this.scene,this.camera)},f.pause=function(){this.renderer.autoUpdateScene=this.renderer.autoUpdateObjects=!1},f.resume=function(){this.renderer.autoUpdateScene=this.renderer.autoUpdateObjects=!0},f.getDom=function(){return this.renderer.domElement},f.resize=function(){var a=b.pixelRatio,c=b.pixelRatioY||a,d=this.renderer;d.setSize(b.width*a,b.height*c),d.domElement.style.width=b.width+"px",d.domElement.style.height=b.height+"px",d.domElement.getContext("2d")&&d.domElement.getContext("2d").scale(a,c),this.input&&this.input.resize(b.width,b.height)},f.debugGui=function(a){var b=this,d=function(){b.lookAt(0,0,0)},e=function(){b.camera.updateProjectionMatrix()},f=[];if(b.camera instanceof c.PerspectiveCamera||b.camera instanceof c.CombinedCamera)f.push({name:"fov",listen:!0,onChange:e}),f.push({name:"aspect",listen:!0,onChange:e}),f.push({name:"near",onChange:e,params:{step:10,min:1,max:1e3}}),f.push({name:"far",onChange:e,params:{step:100,min:1e3,max:1e4}});if(b.camera instanceof c.OrthographicCamera||b.camera instanceof c.CombinedCamera)f.push({name:"left",onChange:e,params:{min:-1e4,max:-100}}),f.push({name:"right",onChange:e,params:{min:100,max:1e4}}),f.push({name:"bottom",onChange:e,params:{min:-1e4,max:-100}}),f.push({name:"top",onChange:e,params:{min:100,max:1e4}}),f.push({name:"near",onChange:e,params:{step:10,min:-1e4,max:1e4}}),f.push({name:"far",onChange:e,params:{step:100,min:1e3,max:1e4}});a.addGui([{name:"camera position",remember:!0,target:b.camera.position,props:[{name:"x",listen:!0,onChange:d,params:{step:1,min:-320,max:-160}},{name:"y",listen:!0,onChange:d,params:{step:1,min:-320,max:-160}},{name:"z",listen:!0,onChange:d,params:{step:1,min:240,max:320}}]},{name:"camera rotation",remember:!0,target:b.camera.rotation,props:[{name:"x",listen:!0,onChange:d,params:{step:.01,min:-6,max:6}},{name:"y",listen:!0,onChange:d,params:{step:.01,min:-6,max:6}},{name:"z",listen:!0,onChange:d,params:{step:.01,min:-6,max:6}}]}]),a.addGui([{name:"camera",remember:!0,target:b.camera,props:f}])}}(window),function(a){"use strict";var b=a.ec;b.SpriteSheets={init:function(){b.SpriteSheets.monk=new a.createjs.SpriteSheet({images:["img/sprite/minimonk_64.png"],frames:[[0,152,96,143,0,47.5,131.4],[165,0,64,141,0,36.5,124.4],[165,0,64,141,0,36.5,124.4],[96,0,69,139,0,35.5,124.4],[0,0,96,152,0,47.5,140.4],[96,139,69,139,0,32.5,124.4],[165,141,64,141,0,26.5,124.4],[165,141,64,141,0,26.5,124.4]],animations:{standing:0}}),b.SpriteSheets.ninja=new a.createjs.SpriteSheet({images:["img/sprite/ninja_64.png"],frames:[[0,138,74,137,0,37,126],[74,138,62,141,0,33,124],[74,138,62,141,0,33,124],[77,0,69,138,0,35,124],[0,0,77,138,0,38,127],[146,0,69,138,0,32,124],[136,138,62,141,0,27,124],[136,138,62,141,0,27,124]],animations:{standing:0}}),b.SpriteSheets.lion=new a.createjs.SpriteSheet({images:["img/sprite/lion_64.png"],frames:[[0,0,80,212,0,40,180]]})}}}(window),function(a){"use strict";var b=a.ec,c=b.Canvas2dView=function(){this.x=this.y=-16,this.scale=1;var b=this.canvas=a.document.createElement("canvas");b.style.position="absolute",this.context=b.getContext("2d"),this.resize(),a.document.body.appendChild(b),this.map={draw:function(a){a.drawImage(this.canvas,-640,-640,this.canvas.width,this.canvas.height)},canvas:a.document.createElement("canvas"),tile:new Image},this.map.canvas.width=1280,this.map.canvas.height=1280;var c=this.map.context=this.map.canvas.getContext("2d");this.map.tile.onload=function(){console.log("loaded",this.width,this.height);for(var a=0;a<400;a++){var b=a%20*64,d=Math.floor(a/20)*64;c.drawImage(this,b,d,this.width,this.height)}},this.map.tile.src="img/tile/floor_8888_64.png",this.drawEntities=this.drawEntity()},d=c.prototype;d.drawEntity=function(){var a=this.context,c=b.SpriteSheets.monk,d=b.SpriteSheets.ninja,e=Math.PI,f=Math.round,g=function(a,b){var c=b.getNumFrames(),d=a,g=(6-f(d*4/e))%8;while(g<0)g+=c;var h=b.getFrame(g);return h===null?(b.complete&&console.error("SpriteSheet null frame. Complete:",b.complete,g,"/",b.getNumFrames(),b.getAnimations()),null):h},h=b.SpriteSheets.lion.getFrame(0);return function(e){var f=e.body.p.x,i=-e.body.p.y,j,k;e instanceof b.Box?(a.fillStyle="#888888",j=h,j?(k=j.rect,a.drawImage(j.image,k.x,k.y,k.width,k.height,f-j.regX,i-j.regY,k.width,k.height)):h=b.SpriteSheets.lion.getFrame(0)):e instanceof b.Player?(j=g(e.body.a,c),j&&(k=j.rect,a.drawImage(j.image,k.x,k.y,k.width,k.height,f-j.regX,i-j.regY,k.width,k.height))):e instanceof b.Circle?(j=g(e.body.a,d),j&&(k=j.rect,a.drawImage(j.image,k.x,k.y,k.width,k.height,f-j.regX,i-j.regY,k.width,k.height))):(a.fillStyle="#000088",a.fillRect(f-32,i-32,64,64))}},d.lookAt=function(a,b){this.x=-this.canvas.width/this.scaleX/2+a,this.y=-this.canvas.height/this.scaleY/2+b-64},d.zoom=function(a){var c=b.pixelRatio,d=b.pixelRatioY||c;this.scale=a,a=a*b.height/640,this.scaleX=c*a,this.scaleY=d*a,this.context.scale(this.scaleX,this.scaleY)},d.setInput=function(a){return this.input=a,a.resize(this.width,this.height),this};var e=function(a,b){return a.body.p.y>b.body.p.y?-1:b.body.p.y>a.body.p.y?1:0};d.draw=function(a){var c=this.context;c.save(),c.setTransform(1,0,0,1,0,0),c.setFillColor(.5,1),c.fillRect(0,0,this.canvas.width,this.canvas.height),c.save(),c.scale(this.scaleX,this.scaleY),c.translate(-this.x,-this.y),this.map.draw(c);var d=a.entities;a.space.activeShapes.count>0&&d.sort(e);var f=0,g=d.length;while(f<g)this.drawEntities(d[f]),f++;c.restore(),this.input&&this.input.draw(c,this.canvas.width,this.canvas.height),b.core.paused()?(c.setFillColor(0,.33),c.fillRect(0,0,this.canvas.width,this.canvas.height),c.setFillColor(1,.8),c.beginPath(),c.moveTo(this.canvas.width-15,35),c.lineTo(this.canvas.width-50,15),c.lineTo(this.canvas.width-50,55),c.fill()):b.touch&&(c.setFillColor(1,.8),c.fillRect(this.canvas.width-43,15,10,40),c.fillRect(this.canvas.width-25,15,10,40));var h=b.core.getOverlay();if(h){var i=this.canvas.height/h.height,j=this.canvas.width-h.width*i,k=this.canvas.height-h.height*i;c.drawImage(h,j/2,k/2,h.width*i,h.height*i)}c.restore()},d.pause=function(){},d.resume=function(){},d.getDom=function(){return this.canvas},d.resize=function(){var a=b.pixelRatio,c=b.pixelRatioY||a,d=this.canvas;this.width=b.width,this.height=b.height,d.width=this.width*a,d.height=this.height*c,d.style.width=this.width+"px",d.style.height=this.height+"px",this.zoom(this.scale),this.input&&this.input.resize(this.width,this.height)},d.debugGui=function(a){var c=this,d=function(){var a=b.pixelRatio,d=b.pixelRatioY;b.resizeDisplay(),b.pixelRatio=a,b.pixelRatioY=d,c.resize()};a.addGui([{name:"view",remember:!0,target:c,props:[{name:"x",params:{min:-480,max:1600}},{name:"y",params:{min:-320,max:1600}},{name:"scale",onChange:function(a){c.zoom(a)},params:{step:.01,min:.25,max:4}}]},{name:"pixelRatio",target:b,props:[{name:"pixelRatio",params:{min:1,max:2,step:.5},onChange:d},{name:"pixelRatioY",params:{min:1,max:2,step:.5},onChange:d}]}])}}(window),function(a){"use strict";var b=a.ec,c={type:"circle",x:0,y:0,radius:50},d=b.ButtonOverlay=function(a){a=f(a||{},c),f(this,a),this.radiusSq=this.radius?this.radius*this.radius:0,this.touches=[],this.pressed=!1,this.vx=this.vy=0};d.viewWidth=1280,d.viewHeight=720;var e=d.prototype;e.containerWidth=d.viewWidth,e.containerHeight=d.viewHeight,e.hitTest=function(a,b,c,e){this.containerWidth=c,this.containerHeight=e;if(this.type==="circle"){var f=a*d.viewWidth/c-this.x,g=b*d.viewHeight/e-this.y;if(f*f+g*g<=this.radiusSq)return!0}else if(this.type==="rectangle"){if(a>this.left&&a<this.right&&b>this.top&&b<this.buttom)return!0}else console.error(this,"invalid type:",this.type);return!1},e.addTouch=function(a){this.touches.indexOf(a)<0&&this.touches.push(a)},e.removeTouch=function(a){var b=this.touches.indexOf(a);b>-1&&(this.touches.splice(b,1),this.vx=this.vy=0)},e.hasTouch=function(a){return this.touches.indexOf(a)>-1},e.updateTouch=function(a,b,c){var e=b*d.viewWidth/this.containerWidth-this.x,f=c*d.viewHeight/this.containerHeight-this.y,g=Math.sqrt(e*e+f*f);Math.abs(e)>Math.abs(e*100/g)&&(e=e*100/g),Math.abs(f)>Math.abs(f*100/g)&&(f=f*100/g),this.vx=e,this.vy=f},e.touchStart=function(a,b){this.addTouch(b),this.pressed=!0,this.updateTouch(b,a.clientX,a.clientY)},e.touchEnd=function(a,b){this.hasTouch(b)&&(this.removeTouch(b),this.pressed=!1)},e.draw=function(a,b,c){this.type==="circle"&&(a.beginPath(),a.setFillColor(0,.05),a.arc(this.x*d.viewWidth/b,this.y*d.viewHeight/c,this.radius*d.viewWidth/b,0,2*Math.PI,!1),a.fill(),this.pressed&&(a.beginPath(),a.setFillColor(0,.1),a.arc((this.x+this.vx)*d.viewWidth/b,(this.y+this.vy)*d.viewHeight/c,80*d.viewWidth/b,0,2*Math.PI,!1),a.fill()))};var f=function(a,b){for(var c in b)a.hasOwnProperty(c)||(a[c]=b[c]);return a}}(window),function(a){"use strict";var b=a.ec.TextField=function(b,c,d,e){this.ctx=b,this.text="",this.x=c||0,this.y=d||0,this.width=e||100,this.height=16;var f=this.ratio=a.ec.pixelRatio||1,g=this.canvas=document.createElement("canvas");g.width=this.width*f,g.height=this.height*f,this.context=g.getContext("2d"),this.context.textAlign="start",this.context.textBaseline="top",this.context.fillStyle="black",this.context.font="12px sans-serif",this.context.scale(f,f)};b.prototype.setText=function(a){this.text!==a&&(this.text=a,this.redraw()),this.draw()},b.prototype.setPos=function(a,b){this.x=a,this.y=b},b.prototype.redraw=function(){this.context.clearRect(0,0,this.width,this.height),this.context.fillText(this.text,0,0,this.width)},b.prototype.draw=function(){this.ctx.drawImage(this.canvas,this.x,this.y,this.width,this.height)}}(window),function(a){"use strict";var b=a.document,c=a.ec,d=a.cp,e=d.v,f=1<<31,g=~f,h=function(a,b){return a-=b,function(){return a+=b,a}},i=function(){var a=e(0,0);return function(b,c){return a.x=b,a.y=c,a}}(),j=c.ChipmunkDebugView=function(a){this.space=a;var g=this.canvas=b.createElement("canvas");g.style.position="absolute",this.ctx=g.getContext("2d"),this.resize(),this.orthoPos=e.mult(this.orthoSize,.5).add(i(50/this.scale,0)),this.mouse=e(0,0);var j=this.width-10,k=h(5,15),l=this.infoFields=[];for(var m=6;m-->0;)l.push(new c.TextField(this.ctx,5,k(),j));l[5].setPos(5,this.height-50);var n=this,o=this.canvas2point=function(a,b){return e(a/n.scale-n.orthoPos.x,n.orthoPos.y-b/n.scale)};this.point2canvas=function(a){return e((a.x+n.orthoPos.x)*n.scale,(n.orthoPos.y-a.y)*n.scale)},this.canvas.onmousemove=function(a){n.mouse=o(a.offsetX,a.offsetY);if(n.mouseDown&&!n.mouseJoint){var b=i(a.offsetX-n.mouseDown.x,a.offsetY-n.mouseDown.y).mult(1/n.scale);n.mouseDown.x=a.offsetX,n.mouseDown.y=a.offsetY,n.orthoPos.add(b)}};var p=this.mouseBody=new d.Body(Infinity,Infinity);this.canvas.onmousedown=function(b){var c=b.which===3;if(!c&&!n.mouseJoint){var g=o(b.offsetX,b.offsetY);n.mouseDown=e(b.offsetX,b.offsetY);var h=a.pointQueryFirst(g,f,d.NO_GROUP);if(h){var i=h.body;if(!i.isStatic()){var j=n.mouseJoint=new d.PivotJoint(p,i,e(0,0),i.world2Local(g));j.maxForce=5e4,j.errorBias=Math.pow(.85,60),a.addConstraint(j)}}}},this.canvas.onmouseup=function(b){var c=b.which===3;c||(n.mouseJoint&&(a.removeConstraint(n.mouseJoint),n.mouseJoint=null),n.mouseDown=null)},this.canvas.onmousewheel=function(a){var b=a.detail?a.detail*-1:(a.wheelDeltaY?a.wheelDeltaY:a.wheelDelta)/40;n.scale=Math.min(Math.max(.005,n.scale+b/(-999*n.scale+1e3)),1);var c=e.sub(n.orthoSize,i(n.width,n.height).mult(1/n.scale));n.orthoSize.sub(c),n.orthoPos.sub(c.mult(.5))}};j.prototype.show=function(){this.canvas.style.display="block",b.body.appendChild(this.canvas)},j.prototype.hide=function(){this.canvas.style.display="none",this.canvas.parentNode&&b.body.removeChild(this.canvas)},j.prototype.resize=function(a){a=a||.33;var b=this.ratio=c.pixelRatio||1;this.width=Math.max(160/b,Math.round(c.width*a)),this.height=Math.max(90/b,Math.round(c.height*a)),this.scale=this.width*a/c.width,this.orthoSize=e(this.width,this.height).mult(1/this.scale);var d=this.canvas;d.width=this.width*b,d.height=this.height*b,d.style.width=this.width+"px",d.style.height=this.height+"px",d.style.left=c.width-this.width+"px",d.style.top=c.height-this.height+"px",this.ctx.scale(b,b)},j.prototype.drawInfo=function(){var a=this.space,c=this.infoFields,d=0;this.ctx.textAlign="start",this.ctx.textBaseline="alphabetic",this.ctx.fillStyle="black",c[d++].setText(b.body.clientWidth+", "+b.body.clientHeight+" x "+this.ratio);var e=a.arbiters.length;this.maxArbiters=this.maxArbiters?Math.max(this.maxArbiters,e):e,c[d++].setText("Arbiters: "+e+" (Max: "+this.maxArbiters+")");var f=0;for(var g=0;g<e;g++)f+=a.arbiters[g].contacts.length;this.maxContacts=this.maxContacts?Math.max(this.maxContacts,f):f,c[d++].setText("Contact points: "+f+" (Max: "+this.maxContacts+")"),c[d++].setText("Mouse: "+this.mouse.x.toFixed(0)+", "+this.mouse.y.toFixed(0)),this.message&&c[5].setText(this.message)},j.prototype.draw=function(){var a=this.ctx,b=this;a.fillStyle="#ACF",a.fillRect(0,0,this.width,this.height),a.strokeStyle="black",this.ctx.lineCap="round",this.space.eachShape(function(c){a.fillStyle=c.style(),c.draw(a,b.scale,b.point2canvas)}),a.strokeStyle="red",a.lineWidth=2;var c=this.space.arbiters;for(var d=0;d<c.length;d++){var e=c[d].contacts;for(var f=0;f<e.length;f++){var g=this.point2canvas(e[f].p);a.beginPath(),a.moveTo(g.x-2,g.y-2),a.lineTo(g.x+2,g.y+2),a.stroke(),a.beginPath(),a.moveTo(g.x+2,g.y-2),a.lineTo(g.x-2,g.y+2),a.stroke()}}if(this.mouseJoint){a.beginPath();var h=this.point2canvas(this.mouseBody.p);a.arc(h.x,h.y,this.scale*5,0,2*Math.PI,!1),a.fill(),a.stroke()}this.space.eachConstraint(function(c){c.draw&&c.draw(a,b.scale,b.point2canvas)}),this.drawInfo()},j.prototype.step=function(){var a=e.lerp(this.mouseBody.p,this.mouse,.25);this.mouseBody.v=e.mult(e.sub(a,this.mouseBody.p),60),this.mouseBody.p=a,this.draw()};var k=function(a,b,c,d,e){d=c(d),a.beginPath(),a.arc(d.x,d.y,b*e,0,2*Math.PI,!1),a.fill(),a.stroke()},l=function(a,b,c,d){c=b(c),d=b(d),a.beginPath(),a.moveTo(c.x,c.y),a.lineTo(d.x,d.y),a.stroke()},m=[e(0,0),e(.2,0),e(.25,3),e(.3,-6),e(.35,6),e(.4,-6),e(.45,6),e(.5,-6),e(.55,6),e(.6,-6),e(.65,6),e(.7,-3),e(.75,6),e(.8,0),e(1,0)],n=function(a,b,c,d,f){d=c(d),f=c(f),a.beginPath(),a.moveTo(d.x,d.y);var g=e.sub(f,d),h=e.len(g),j=e.mult(g,1/h);for(var k=1;k<m.length;k++){var l=e.add(d,e.rotate(i(m[k].x*h,m[k].y*b),j));a.lineTo(l.x,l.y)}a.stroke()};d.PolyShape.prototype.draw=function(a,b,c){a.beginPath();var d=this.tVerts,e=d.length,f=c(i(d[e-2],d[e-1]));a.moveTo(f.x,f.y);for(var g=0;g<e;g+=2){var h=c(i(d[g],d[g+1]));a.lineTo(h.x,h.y)}a.fill(),a.stroke()},d.SegmentShape.prototype.draw=function(a,b,c){var d=a.lineWidth;a.lineWidth=Math.max(1,this.r*b*2),l(a,c,this.ta,this.tb),a.lineWidth=d},d.CircleShape.prototype.draw=function(a,b,c){k(a,b,c,this.tc,this.r),l(a,c,this.tc,e.mult(this.body.rot,this.r).add(this.tc))},d.PinJoint.prototype.draw=function(a,b,c){var d=this.a.local2World(this.anchr1),e=this.b.local2World(this.anchr2);a.lineWidth=2,a.strokeStyle="grey",l(a,c,d,e)},d.SlideJoint.prototype.draw=function(a,b,c){var d=this.a.local2World(this.anchr1),f=this.b.local2World(this.anchr2),g=e.add(d,e.clamp(e.sub(f,d),this.min));a.lineWidth=2,a.strokeStyle="grey",l(a,c,d,f),a.strokeStyle="red",l(a,c,d,g)},d.PivotJoint.prototype.draw=function(a,b,c){var d=this.a.local2World(this.anchr1),e=this.b.local2World(this.anchr2);a.strokeStyle="grey",a.fillStyle="grey",k(a,b,c,d,2),k(a,b,c,e,2)},d.GrooveJoint.prototype.draw=function(a,b,c){var d=this.a.local2World(this.grv_a),e=this.a.local2World(this.grv_b),f=this.b.local2World(this.anchr2);a.strokeStyle="grey",l(a,c,d,e),k(a,b,c,f,3)},d.DampedSpring.prototype.draw=function(a,b,c){var d=this.a.local2World(this.anchr1),e=this.b.local2World(this.anchr2);a.strokeStyle="grey",n(a,b,c,d,e)};var o=function(){return Math.floor(Math.random()*256)},p=[];for(var q=0;q<100;q++)p.push("rgb("+o()+", "+o()+", "+o()+")");d.Shape.prototype.style=function(){var a;return this.sensor?"rgba(255,255,255,0)":(a=this.body,a.isSleeping()?"rgb(50,50,50)":a.nodeIdleTime>this.space.sleepTimeThreshold?"rgb(170,170,170)":p[this.hashid%p.length])}}(window),function(a){"use strict";var b=a.ec,c=a.Stats,d=a.dat,e=b.DebugView=function(){var a=this.stats=new c;a.domElement.style.position="absolute",a.domElement.style.left="0px",a.domElement.style.top="0px"};e.prototype.show=function(){this.stats.domElement.style.display="block",a.document.body.appendChild(this.stats.domElement)},e.prototype.hide=function(){this.stats.domElement.style.display="none",this.stats.domElement.parentNode&&a.document.body.appendChild(this.stats.domElement)},e.prototype.addGui=function(a){var b=new d.GUI,c=b;for(var e=0;e<a.length;e++){var f=a[e];f.remember&&b.remember(f.target),f.name&&(c=b.addFolder(f.name),c.open());for(var g=0;g<f.props.length;g++){var h=f.props[g],i=h,j=null,k;h.name&&(j=h.params,i=h.name),j?j.min!==undefined&&j.max!==undefined?k=c.add(f.target,i,j.min,j.max,j.step):j.step&&(k=c.add(f.target,i).step(j.step)):k=c.add(f.target,i,j),h.listen&&k.listen(),h.onChange&&k.onChange(h.onChange)}}return b},e.prototype.worldGui=function(a){this.addGui([{name:"space",remember:!0,target:a.space,props:[{name:"iterations",params:{min:1,max:40}},{name:"sleepTimeThreshold",params:{step:b.TIME_STEP,min:b.TIME_STEP,max:1}},{name:"collisionSlop",params:{step:.1,min:.1,max:1}},"damping",{name:"idleSpeedThreshold",listen:!0,params:{min:0,max:50}},{name:"collisionBias"},"enableContactGraph"]}]),this.addGui([{name:"gravity",target:a.space.gravity,props:[{name:"x",params:{step:10,min:-1e3,max:1e3}},{name:"y",params:{step:10,min:-1e3,max:1e3}}]}])}}(window),function(a){"use strict";var b=a.ec,c=[undefined,undefined,undefined,undefined];b.keyPressed={};var d,e=b.UserInput=function(c){d=this,this.index=c||0,this.gamepadTime=1;var e=this.buttons=new Array(17);for(var f=0;f<17;f++)e[f]=0;var g=this.axes=new Array(4);for(f=0;f<4;f++)g[f]=0;b.gamepads&&(b.bind(a,"MozGamepadConnected",this.onGamepadConnect,!1),b.bind(a,"MozGamepadDisconnected",this.onGamepadDisconnect,!1)),this.pollGamePad=navigator.webkitGetGamepads!==undefined?this.pollGamePadList:this.pollDummyGamePadList,this.keyboardAxes1=!1,this.keyboardAxes2=!1,this.overlays=[]},f=e.prototype;f.addButtonOverlay=function(a){var b=this.overlays.indexOf(a);return b<0?(this.overlays.push(a),a):(console.error("overlay already a child of input",a),null)},f.removeButtonOverlay=function(a){var c=this.overlays.indexOf(a);return c>-1?(this.overlays.splice(c,1),b.unbind(a,"touchstart",a.touchStart,!1),b.unbind(a,"touchend",a.touchEnd,!1),a):(console.error("overlay not a child of input",a),null)},f.draw=function(a,b,c){for(var d=0,e=this.overlays.length;d<e;d++){var f=this.overlays[d];f.draw(a,b,c)}},f.resize=function(a,b){this.width=a,this.height=b},f.testOverlays=function(a,b,c){var d=this.width,e=this.height;for(var f=0,g=this.overlays.length;f<g;f++){var h=this.overlays[f];if(a==="touchend"||a==="mouseup")h["on"+a]!==undefined&&h["on"+a].apply(h,[b,c]);else if(h.hitTest(b.clientX,b.clientY,d,e))return h["on"+a]!==undefined&&h["on"+a].apply(h,[b,c]),h}return null},f.setLeftStickOverlay=function(a){this.leftStickOverlay=a,b.bind(a,"touchstart",a.touchStart,!1),b.bind(a,"touchend",a.touchEnd,!1)},f.setRightStickOverlay=function(a){this.rightStickOverlay=a,b.bind(a,"touchstart",a.touchStart,!1),b.bind(a,"touchend",a.touchEnd,!1)},f.setAxes1=function(a,b){this.axes[0]=a,this.axes[1]=b},f.setAxes2=function(a,b){this.axes[3]=a,this.axes[4]=b},f.setButton=function(a,b){this.buttons[a]=b},f.mapButton=function(a,b){h[a]=b},f.poll=function(){this.leftStickOverlay&&!this.keyboardAxes1&&this.setAxes1(this.leftStickOverlay.vx/100,this.leftStickOverlay.vy/100),this.rightStickOverlay&&!this.keyboardAxes2&&this.setAxes2(this.rightStickOverlay.vx/100,this.rightStickOverlay.vy/100);var a=this.pollGamePad()[this.index];a&&this.gamepadTime!==a.timestamp&&(this.gamepadTime=a.timestamp||1,a.buttons[9]===1&&this.buttons[9]!==1&&b.core.togglePause(),a.buttons.join("")!==this.buttons.join("")&&console.log("gamepad button change",a.buttons.indexOf(1),this.buttons.indexOf(1),a.axes),this.buttons=a.buttons.slice(0),this.keyboardAxes1||this.setAxes1(a.axes[0],a.axes[1]),this.keyboardAxes2||this.setAxes2(a.axes[3],a.axes[4]))},f.touchstart=function(a){if(b.core.paused()){b.core.resume();return}for(var c=0,e=a.changedTouches.length;c<e;c++)d.testOverlays(a.type,a.changedTouches[c],a.changedTouches[c].identifier)},f.touchmove=function(a){for(var b=0,c=d.overlays.length;b<c;b++){var e=d.overlays[b];for(var f=0,g=a.changedTouches.length;f<g;f++)if(e.hasTouch(a.changedTouches[f].identifier)){e.updateTouch(a.changedTouches[f].identifier,a.changedTouches[f].clientX,a.changedTouches[f].clientY);break}}a.preventDefault()},f.touchend=function(a){for(var b=0,c=a.changedTouches.length;b<c;b++)d.testOverlays(a.type,a.changedTouches[b],a.changedTouches[b].identifier)},f.mousedown=function(a){if(b.core.paused()){b.core.resume();return}d.testOverlays(a.type,a,-1)},f.mousemove=function(a){},f.mouseup=function(a){d.testOverlays(a.type,a,-1)},f.keydown=function(a){var c=a.keyCode||a.which;b.keyPressed[c]=!0;switch(c){case g.RIGHT:case g.D:case g.LEFT:case g.A:case g.UP:case g.W:case g.DOWN:case g.S:d.updateAxes1FromKeys();break;case g.SPACE:case g.ENTER:d.setButton(h.SELECT,1);break;case g.BACKSLASH:d.setButton(h.CANCEL,1)}},f.keyup=function(a){var c=a.keyCode||a.which;b.keyPressed[c]=!1;switch(c){case g.RIGHT:case g.D:case g.LEFT:case g.A:case g.UP:case g.W:case g.DOWN:case g.S:d.updateAxes1FromKeys();break;case g.SPACE:case g.ENTER:d.setButton(h.SELECT,0);break;case g.BACKSLASH:d.setButton(h.CANCEL,0);break;case g.P:b.core.paused()?b.core.resume():b.core.pause();break;case g.O:b.core.cycleDebug();break;case g.F:case g.SLASH:b.core.fullscreen();break;default:console.log(String.fromCharCode(c),c)}},f.updateAxes1FromKeys=function(){var a=(b.keyPressed[g.LEFT]||b.keyPressed[g.A]?-1:0)+(b.keyPressed[g.RIGHT]||b.keyPressed[g.D]?1:0),c=(b.keyPressed[g.UP]||b.keyPressed[g.W]?-1:0)+(b.keyPressed[g.DOWN]||b.keyPressed[g.S]?1:0);this.keyboardAxes1=a||c,this.setAxes1(a,c)},f.pollDummyGamePadList=function(){return c},f.pollGamePadList=function(){return navigator.webkitGetGamepads()},f.onGamepadConnect=function(a){console.log("onGamepadConnect",a);if(a.gamepad.index===0){var b=a.gamepad;this.pollGamePad=function(){return b}}},f.onGamepadDisconnect=function(a){console.log("onGamepadDisconnect",a),a.gamepad.index===0&&(this.pollGamePad=this.pollDummyGamePadList)};var g={LEFT:37,UP:38,RIGHT:39,DOWN:40,ENTER:13,SHIFT:16,CTRL:17,ALT:18,SPACE:32,NUM0:48,NUM1:49,NUM2:50,NUM3:51,NUM4:52,NUM5:53,NUM6:54,NUM7:55,NUM8:56,NUM9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,SLASH:191,BACKSLASH:220},h={SELECT:0,CANCEL:1}}(window);