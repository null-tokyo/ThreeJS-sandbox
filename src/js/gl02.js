import Core from './webgl/Core';
import param from './const/param2';
import InstancingMesh from './webgl/InstancingMesh';
import instanceFrag from '../glsl/gl02instancing.frag';
import texturePositionFrag from '../glsl/gl01texturePosition.frag';
import textureVelocityFrag from '../glsl/gl01textureVelocity.frag';


class GCRenderer extends GPUComputationRenderer {
    constructor(width, height, renderer) {
        super(width, height, renderer);
        this.velocityVariable;
        this.positionVariable;
    }
    init() {
        super.init();
    }
    _createTexture() {
        let dtPosition = this.createTexture();
        let dtVelocity = this.createTexture();

        this._fillTextures(dtPosition, dtVelocity);

        this.velocityVariable = this.addVariable("textureVelocity", textureVelocityFrag ,dtVelocity);
        this.positionVariable = this.addVariable("texturePosition", texturePositionFrag ,dtPosition);

        this.setVariableDependencies( this.velocityVariable, [ this.positionVariable, this.velocityVariable ]);
        this.setVariableDependencies( this.positionVariable, [ this.positionVariable, this.velocityVariable ]);
        
        const err = this.init();

        if(err) {
            console.log(err);
        }
    }
    _fillTextures(texturePosition, textureVelocity){
        let posArray = texturePosition.image.data;
        let velArray = textureVelocity.image.data;

        for (let i = 0; i < posArray.length; i += 4) {
            let x, y, z, w;

            let angle = Math.random() * Math.PI * 2;

            x = Math.cos(angle) * Math.random() * 5;
            y = Math.sin(angle) * Math.random() * 5;
            z = Math.cos(angle) * Math.random() * 5;
            w = 0;

            posArray[i + 0] = x;
            posArray[i + 1] = y;
            posArray[i + 2] = z;
            posArray[i + 3] = w;
            
            x = Math.random() - 0.5;
            y = Math.random() - 0.5;
            z = Math.random() - 0.5;
            w = 0;

            velArray[i + 0] = x;
            velArray[i + 1] = y;
            velArray[i + 2] = z;
            velArray[i + 3] = w;
        }
    }
}

class WG extends Core {
    constructor(option) {
        super(option);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.bgColor = new THREE.Color(param.base.bgColor.value).getHSL();
        console.log(this.bgColor);
        this.geometrys = [
            new THREE.BoxBufferGeometry(20, 20, 20),
            new THREE.CircleBufferGeometry(20, 64),
            new THREE.ConeBufferGeometry( 20, 30, 64 ),
            new THREE.TetrahedronBufferGeometry( 20, 0 ),
            new THREE.TorusBufferGeometry(20, 10, 64, 64),
        ];
    }
    init() {
        super.init();
        this.camera = this.createCamera();
        this.updatePerspectiveCamera(this.camera, this.width, this.height);
        this._initLight();
        this._initInstanceMesh();
        this.update();
    }
    _initGPGPU() {

    }
    _initInstanceMesh() {
        let geoIndex = param.mesh.geometry.list.indexOf(param.mesh.geometry.value);
        this.instanceMesh = new InstancingMesh({
            instances: 300,
            bufferGeometry: this.geometrys[geoIndex],
            fragShader: instanceFrag 
        });
        this.instanceMesh.material.uniforms.time = {type: 'f', value: 0 };
        this.instanceMesh.material.uniforms.lightPos = {type: 'v3', value: this.light.position };
        this.instanceMesh.material.uniforms.toonTex = {type: 't', value: new THREE.TextureLoader().load( '/images/toon.png' ) };
        this.instanceMesh.material.uniforms.baseColor = {type: 'c', value: new THREE.Color( 0xffaa00 )}
        this.instanceMesh.material.extensions.derivatives = true;
        this.mainScene.add(this.instanceMesh);
    }
    _initLight () {
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(1, 1, 1).normalize();
        this.mainScene.add( this.light );
    }
    update() {
        this.instanceMesh.rotation.y += 0.001;
        this.instanceMesh.material.uniforms.time.value += 0.0001;
        this.instanceMesh.material.uniforms.baseColor.value = new THREE.Color(param.mesh.baseColor.value);
        super.update();
    }
    resetMesh() {
        this.instanceMesh.reset();
        this.mainScene.remove(this.instanceMesh);
        this._initInstanceMesh();
    }
}

let webgl = new WG({
    clearColor: new THREE.Color(param.base.bgColor.value)
});
webgl.init();

const tick = () => {
    requestAnimationFrame(tick);
    webgl.update();
}

tick();
console.log(param);
param.mesh.geometry.gui.onChange((val) => {
    webgl.resetMesh();
});
param.base.bgColor.gui.onChange((val) => {
    webgl.updateOptions({
        clearColor: new THREE.Color(val)
    });
});