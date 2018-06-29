import Core from './webgl/Core';
import texturePositionFrag from '../glsl/gl01texturePosition.frag';
import textureVelocityFrag from '../glsl/gl01textureVelocity.frag';
import particleVert from '../glsl/gl01particle.vert';
import particleFrag from '../glsl/gl01particle.frag';

const WIDTH = 200;
const PARTICLES = WIDTH * WIDTH;

class GCRenderer extends GPUComputationRenderer {
    constructor(width, height, renderer) {
        super(width, height, renderer);
        this.velocityVariable;
        this.positionVariable;

        this._createTexture();
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


class Particles extends Core {
    constructor(){
        super();
        this.gpuc;
        this.particleUniforms;
    }
    init(){
        super.init();
        this.camera = super.createCamera();
        super.updatePerspectiveCamera(this.camera, window.innerWidth ,window.innerHeight);
        this.gpuc;
        this.geometory;
        this.material;
        this.particles;
        this._initComputeRenderer();
        this._initParticles();
    }
    _initComputeRenderer(){
        this.gpuc = new GCRenderer(WIDTH, WIDTH, this.renderer);
    }
    _initParticles() {
        this._initGeometory();
        this._initMaterial();
        this.particles = new THREE.Points(this.geometory, this.material);
        this.particles.matrixAutoUpdate = false;
        this.particles.updateMatrix();

        this.mainScene.add(this.particles);
    }
    _initGeometory() {
        this.geometory = new THREE.BufferGeometry();
        let positions = new Float32Array(PARTICLES * 3);
        let uvs = new Float32Array(PARTICLES * 2);
        for (let index = 0; index < positions.length; index ++) {
            positions[index] = 0;
        }
        
        let p = 0;
        for (let y = 0; y < WIDTH; y ++) {
            for(let x = 0; x < WIDTH; x++) {
                uvs[p++] = x / (WIDTH - 1);
                uvs[p++] = y / (WIDTH - 1);
            }
        }

        this.geometory.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        this.geometory.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    }
    _initMaterial() {
        this.particleUniforms = {
            texturePosition: {value: null},
            textureVelocity: {value: null},
            cameraConstant: {value: this._getCameraConstant() }
        }

        this.material = new THREE.ShaderMaterial({
            uniforms: this.particleUniforms,
            vertexShader: particleVert,
            fragmentShader: particleFrag,
            alphaTest: true
        });
        this.material.extensions.drawBuffers = true;
    }
    _getCameraConstant() {
        return window.innerHeight / ( Math.tan( THREE.Math.DEG2RAD * 0.5 * this.camera.fov ) / this.camera.zoom );
    }

    update(){
        this.gpuc.compute();
        
        this.particleUniforms.texturePosition.value = this.gpuc.getCurrentRenderTarget( this.gpuc.positionVariable ).texture;
        this.particleUniforms.textureVelocity.value = this.gpuc.getCurrentRenderTarget( this.gpuc.velocityVariable ).texture;
    
        super.update();
    }
}

let p = new Particles();
p.init();


const tick = () => {
    requestAnimationFrame(tick);
    p.update();
}
tick();