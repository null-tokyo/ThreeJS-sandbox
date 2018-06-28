import * as THREE from 'three';
import 'three/examples/js/GPUComputationRenderer';
import $ from 'jquery';
import {throtlle, debounce} from 'lodash';

window.THREE = THREE;
window.GPUComputationRenderer = GPUComputationRenderer;
window.$ = $;
window.throttle = throtlle;
window.debounce = debounce;