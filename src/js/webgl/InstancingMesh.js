import * as THREE from 'three';
import instancingVert from '../../glsl/instancing.vert';
import instancingfrag from '../../glsl/instancing.frag';

/**
 * Instancing
 */

class InstancingMesh extends THREE.Mesh {
    constructor() {
        super(
            new THREE.InstancedBufferGeometry(),
            new THREE.RawShaderMaterial()
        );
        this.instances = 10000;
        this.bufferGeometory;
        this.attribute = {
        }
        this.init();
    }
    init() {
        this._createBufferGeometory();
        this._setGeometory();
        this._setMaterial();
    }
    _createBufferGeometory () {
        this.bufferGeometry = new THREE.BoxBufferGeometry( 50, 5, 5 );
    }
    _setGeometory() {
        this.geometry.index = this.bufferGeometry.index;
        this.geometry.attributes.position = this.bufferGeometry.attributes.position;
        this.geometry.attributes.uv = this.bufferGeometry.attributes.uv;
        let vector = new THREE.Vector4();
        let x, y, z, w;
        let offsets = [];
        let orientations = [];
        for(let i = 0; i < this.instances; i++) {
            x = Math.random() * 50 - 25;
            y = Math.random() * 50 - 25;
            z = Math.random() * 50 - 25;
            vector.set( x, y, z, 0 ).normalize();
            vector.multiplyScalar( 80 ); // move out at least 5 units from center in current direction
            offsets.push( x + vector.x, y + vector.y, z + vector.z );

            // orientations
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            z = Math.random() * 2 - 1;
            w = Math.random() * 2 - 1;
            vector.set( x, y, z, w ).normalize();
            orientations.push( vector.x, vector.y, vector.z, vector.w );
        }

        let offsetAttribute = new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 );
        let orientationAttribute = new THREE.InstancedBufferAttribute( new Float32Array( orientations ), 4 ).setDynamic( true );
        
        this.geometry.addAttribute( 'offset', offsetAttribute );
        this.geometry.addAttribute( 'orientation', orientationAttribute );
    }
    _setMaterial() {
        this.material.uniforms = {
        }
        this.material.vertexShader = instancingVert;
        this.material.fragmentShader = instancingfrag;
        this.material.side = THREE.DoubleSide;
        this.material.transparent = true;
    }
}
export default InstancingMesh;
