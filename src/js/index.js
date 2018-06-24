/* debug */
import SiteSpeedChecker from './debug/SiteSpeedChecker';
import LongTaskChecker from './debug/LongTaskChecker';
//import $ from 'jquery';
//import {throtlle, debounce} from 'lodash';
import * as THREE from 'three';
import param from './const/param';
import Core from './webgl/Core';
import RenderTarget from './webgl/RenderTarget';
import postVert from '../glsl/posteffect.vert';
import postFrag from '../glsl/posteffect.frag';
import matVert from '../glsl/material.vert';
import matFrag from '../glsl/material.frag';

// new SiteSpeedChecker().getAll();
// new LongTaskChecker().observe();

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

// Box
//const geometory = new THREE.BoxGeometry(150, 150, 150);
const geometory = new THREE.SphereBufferGeometry(150, 50, 50);
//const material = new THREE.MeshLambertMaterial({color: 0xf18a66});

const material = new THREE.ShaderMaterial({
  vertexShader   : matVert,
  fragmentShader : matFrag,
  uniforms: {
    time : {value:0},
    resolution: {type: 'v2', value: new THREE.Vector2(width, height) },
    lightPos: {type: 'v2', value: light.position },
  },
  extensions: {
    derivatives: true
  }
});

const box = new THREE.Mesh(geometory, material);
core.mainScene.add(box);
container.add(box);

const renderTarget = new RenderTarget();
renderTarget.resize(width, height);


const uniforms = {
  tDiffuse  : {value: renderTarget.getTexture()},
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

console.log(dest.material.uniforms);

const draw = () => {
  material.uniforms.time.value += clock.getDelta();
  uniforms.time.value += clock.getDelta();
  uniforms.noiseForce.value = param.effect.noiseForce.value;
  box.rotation.x += 0.001 * param.box.speedX.value;
  box.rotation.y += 0.001 * param.box.speedY.value;
}

const tick = () => {
    requestAnimationFrame(tick);
    draw();
    renderTarget.render(core.renderer, mainCamera);
    core.update();
}

tick();