import Core from './webgl/Core';
import vertShader from '../glsl/gl03plane.vert';
import FragShader from '../glsl/gl03plane05.frag';

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
    super.updatePerspectiveCamera(this.camera, this.width, this.height);
    this._initPlane();

    console.log(this.uniforms);
  }
  _initPlane() {
    this.uniforms = {
      time: {type: 'f', value: 0},
      resolution: {type: 'v2', value: new THREE.Vector2(this.width, this.height)},
      tDiffuse: {type: 't', value: new THREE.TextureLoader().load( '/images/sample.jpg' )}
    }

    this.geometory = new THREE.PlaneBufferGeometry(this.width, this.height);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: FragShader,
      uniforms: this.uniforms
    });
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