/**
 * Core
 * renderer / mainScene / cameraの管理
 */
class Core {
    constructor(){
        this.renderer;
        this.mainScene;
        this.camera;
    }
    /**
     * 初期化
     */
    init() {
        this._createRenderer();
        this._createMainScene();
    }
    /**
     * PerspectiveCameraの更新
     * @param {*} camera 
     * @param {*} width 
     * @param {*} height 
     */
    updatePerspectiveCamera(camera, width ,height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        camera.position.z = height / Math.tan(camera.fov * Math.PI / 360) / 2;
    }
    /**
     * OrthographicCameraの更新
     * @param {*} camera 
     * @param {*} width 
     * @param {*} height 
     */
    updateOrthographicCamera(camera, width ,height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    /**
     * リサイズ処理
     * @param {*} width 
     * @param {*} height 
     */
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setPixelRatio(window.devicePixelRatio || 1)
        this.renderer.setSize(width, height);
        this.renderer.clear();
    }
    /**
     * 描画
     */
    update(){
        this.renderer.render(this.mainScene, this.camera);
    }
    /**
     * Rendererの作成
     */
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
        this.renderer.setClearColor( 0x888888, 1 );
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        console.log(this.renderer.context.getExtension('OES_standard_derivatives'));
    }
    /**
     * Main Sceneの作成
     */
    _createMainScene() {
        this.mainScene = new THREE.Scene();
    }
    /**
     * カメラの作成
     * @param {*} isOrthographic 
     */
    createCamera(isOrthographic) {
        if(isOrthographic){
            return new THREE.OrthographicCamera();
        }
        return new THREE.PerspectiveCamera(45, 1, 0.1, 2000);

    }
}

export default Core;