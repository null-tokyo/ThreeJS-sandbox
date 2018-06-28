import param from './const/param';
import Core from './webgl/Core';
import RenderTarget from './webgl/RenderTarget';
import InstancingMesh from './webgl/InstancingMesh';
import postVert from '../glsl/posteffect.vert';
import postFrag from '../glsl/posteffect.frag';
import matVert from '../glsl/material.vert';
import matFrag from '../glsl/material.frag';

let width = window.innerWidth;
let height = window.innerHeight;
let clock =  new THREE.Clock();

//renderer / mainScene / camera
const core = new Core();
core.init();
const mainCamera = core.createCamera();
core.updatePerspectiveCamera(mainCamera, width ,height);
core.camera = mainCamera;

//container
const container =  new THREE.Object3D();

//light
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1).normalize();
core.mainScene.add( light );
container.add(light);

const generateHeightmap = ( dt_size ) => {
  let data_arr = new Float32Array( dt_size * dt_size * 3 );
  let length = dt_size * dt_size;

  for ( let i = 0; i < length; i ++ ) {
    let val = THREE.Math.randFloat( 0, 1 );
    data_arr[ i * 3 + 0 ] = val;
    data_arr[ i * 3 + 1 ] = val;
    data_arr[ i * 3 + 2 ] = val;
  }

  let texture = new THREE.DataTexture( data_arr, dt_size, dt_size, THREE.RGBFormat, THREE.FloatType );
  texture.needsUpdate = true;
  return texture;
};

const material = new THREE.ShaderMaterial({
  vertexShader   : matVert,
  fragmentShader : matFrag,
  uniforms: {
    time : {value:0},
    resolution: {type: 'v2', value: new THREE.Vector2(width, height) },
    lightPos: {type: 'v2', value: light.position },
    eyeDirection: {type: 'v2', value: mainCamera.getWorldDirection() },
    toonTex: {type: 't', value: new THREE.TextureLoader().load( '/images/toon.png' ) }
  },
  extensions: {
    derivatives: true
  }
});

const instanceBox = new InstancingMesh();
instanceBox.material.uniforms.time = {type: 'f', value: 0 };
instanceBox.material.uniforms.lightPos = {type: 'v2', value: light.position };
instanceBox.material.uniforms.toonTex = {type: 't', value: new THREE.TextureLoader().load( '/images/toon.png' ) };
instanceBox.material.extensions.derivatives = true;

core.mainScene.add(instanceBox);
container.add(instanceBox);

const renderTarget = new RenderTarget();
renderTarget.resize(width, height);


const uniforms = {
  tDiffuse  : {value: renderTarget.getTexture()},
  tDisp: {type: 't', value: generateHeightmap(32) },
  time   : {value:0},
  resolution: {type: 'v2', value: new THREE.Vector2(width, height) },
  noiseForce: {value: 0}
}

renderTarget.add(container);
const dest = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1),
  new THREE.ShaderMaterial({
    vertexShader   : postVert,
    fragmentShader : postFrag,
    uniforms: uniforms
  })
);

dest.scale.set(width, height, 1);
core.mainScene.add(dest);

const draw = () => {
  uniforms.time.value += 1 * 0.02;
  uniforms.noiseForce.value = param.effect.noiseForce.value;
  instanceBox.rotation.y += 1 * 0.05;
  instanceBox.material.uniforms.time.value = uniforms.time.value;
}

const tick = () => {
    requestAnimationFrame(tick);
    draw();
    renderTarget.render(core.renderer, mainCamera);
    core.update();
}

tick();