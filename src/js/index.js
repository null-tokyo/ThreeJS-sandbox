/* debug */
import SiteSpeedChecker from './debug/SiteSpeedChecker';
import LongTaskChecker from './debug/LongTaskChecker';
//import $ from 'jquery';
//import {throtlle, debounce} from 'lodash';
import * as THREE from 'three';
import param from './const/param';
import Canvas from './webgl/Canvas';
import RenderTarget from './webgl/RenderTarget';
import postVert from '../glsl/postVert.vert';
import postFrag from '../glsl/postFrag.frag';

// new SiteSpeedChecker().getAll();
// new LongTaskChecker().observe();

let width = window.innerWidth;
let height = window.innerHeight;

//renderer / mainScene / camera
const canvas = new Canvas();
canvas.init();
const mainCamera = canvas.createCamera();
canvas.updatePerspectiveCamera(mainCamera, width ,height);
canvas.camera = mainCamera;

//container
const container =  new THREE.Object3D();

// Box
const geometory = new THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometory, material);
canvas.mainScene.add(box);
container.add(box);

const renderTarget = new RenderTarget();
renderTarget.resize(width, height);

renderTarget.add(container);
const dest = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1),
  new THREE.ShaderMaterial({
    vertexShader   : postVert,
    fragmentShader : postFrag,
    uniforms:{
      tDiffuse  : {value: renderTarget.getTexture() },
      time   : {value:0}
    }
  })
);

dest.scale.set(width, height, 1);
canvas.mainScene.add(dest);

const draw = () => {
    box.rotation.x += 0.001 * param.box.speedX.value;
    box.rotation.y += 0.001 * param.box.speedY.value;
}

const tick = () => {
    requestAnimationFrame(tick);
    draw();
    renderTarget.render(canvas.renderer, mainCamera);
    canvas.update();
}

tick();