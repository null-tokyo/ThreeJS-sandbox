/* debug */
import SiteSpeedChecker from './debug/SiteSpeedChecker';
import LongTaskChecker from './debug/LongTaskChecker';
//import $ from 'jquery';
//import {throtlle, debounce} from 'lodash';
import * as THREE from 'three';
import param from './const/param';

new SiteSpeedChecker().getAll();
new LongTaskChecker().observe();

const canvas = document.getElementById("canvas");
let width = canvas.clientWidth;
let height = canvas.clientHeight;

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
camera.position.set(0, 0, +1000);

const geometory = new THREE.BoxGeometry(400, 400, 400);
const material = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(geometory, material);

scene.add(box);

const update = () => {
    box.rotation.x += 0.001 * param.box.speedX.value;
    box.rotation.y += 0.001 * param.box.speedY.value;
}

const draw = () => {
    renderer.render(scene, camera);
}

const tick = () => {
    requestAnimationFrame(tick);
    update();
    draw();
}

tick();