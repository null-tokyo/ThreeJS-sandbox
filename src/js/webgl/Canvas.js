import * as THREE from 'three';

class Canvas {
    constructor(){
        this.renderer;
        this.mainScene;
        this.camera;
    }
    init() {
        this._createRenderer();
        this._createMainScene();
    }
    updatePerspectiveCamera(camera, width ,height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        camera.position.z = height / Math.tan(camera.fov * Math.PI / 360) / 2;
    }
    updateOrthographicCamera(camera, width ,height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setPixelRatio(window.devicePixelRatio || 1)
        this.renderer.setSize(width, height);
        this.renderer.clear()
    }
    update(){
        this.renderer.render(this.mainScene, this.camera);
    }
    _createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas             : document.querySelector('#canvas'),
            alpha              : true,
            antialias          : true,
            stencil            : false,
            depth              : true,
            premultipliedAlpha : false
        });
        this.renderer.autoClear = true;
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    }
    _createMainScene() {
        this.mainScene = new THREE.Scene();
    }
    createCamera(isOrthographic) {
        if(isOrthographic){
            return new THREE.OrthographicCamera();
        }
        return new THREE.PerspectiveCamera(45, 1, 0.1, 2000);

    }
}

export default Canvas;