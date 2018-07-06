import Core from './webgl/Core';
import param from './const/param5';
import vertShader from '../glsl/gl05.vert';
import FragShader from '../glsl/gl06.frag';

class WG extends Core {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();
  }
  init() {
    super.init();
    this.camera = super.createCamera();
    this.controls = new THREE.OrbitControls( this.camera );
    super.updatePerspectiveCamera(this.camera, this.width, this.height);
    this._initScene();    
    this._initPlane();
  }
  _initScene() {
    this.cubeTex = new THREE.CubeTextureLoader()
	.setPath( '/images/map/' )
	.load( [
		'posx.jpg',
		'negx.jpg',
		'posy.jpg',
		'negy.jpg',
		'posz.jpg',
		'negz.jpg'
	] );
    this.mainScene.background = this.cubeTex;   
  }
  _initPlane() {
    console.log(this.camera);
    this.uniforms = {
      time: {type: 'f', value: 0},
      resolution: {type: 'v2', value: new THREE.Vector2(this.width, this.height)},
      tDiffuse: {type: 't', value: new THREE.TextureLoader().load( '/images/sample.jpg' )},
      speed: {type: 'f', value: param.base.speed.value },
      force: {type: 'f', value: param.base.force.value },
      frequency: {type: 'f', value: param.base.frequency.value },
      eyePosition: {type: 'v3', value: this.camera.position },
      cubeTexture: {type: 't', value: this.cubeTex },
      eta: {type: 'f', value: param.base.eta.value}
    }

    this.geometory = new THREE.IcosahedronBufferGeometry(100, 6);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: FragShader,
      uniforms: this.uniforms,
      blending: THREE.NormalBlending,
      alphaTest: true
    });
    this.material.transparent = true;
    this.material.extensions.derivatives = true;

    this.mesh = new THREE.Mesh(this.geometory, this.material);

    this.mainScene.add(this.mesh);
  }
  _updateUniforms() {
    this.uniforms.time.value += this.clock.getDelta();
  }
  update() {
    this._updateUniforms();
    super.update();
  }
}

let wg = new WG();
wg.init();

const tick = () => {
  requestAnimationFrame(tick);
  wg.update();
};
tick();

param.base.speed.gui.onChange((val) => {
    wg.uniforms.speed.value = val;
});
param.base.force.gui.onChange((val) => {
    wg.uniforms.force.value = val;
});
param.base.frequency.gui.onChange((val) => {
    wg.uniforms.frequency.value = val;
});
param.base.eta.gui.onChange((val) => {
    wg.uniforms.eta.value = val;
});