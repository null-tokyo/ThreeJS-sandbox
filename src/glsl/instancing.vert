precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;

attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute vec4 orientation;

varying vec2 vUv;
varying vec3 vPos;


vec3 applyQuaternionToVector( vec4 q, vec3 v ){
    return v + 2.0 * cross( q.xyz, cross( q.xyz, v ) + q.w * v );
}

void main () {
    vUv = uv;
    vec4 o = orientation;

    vPos = applyQuaternionToVector(o, position) + offset;
    vec3 n = normalize(vPos);
    vPos = vec3(
        vPos.x + sin(time * 2.0) * n.x * 20.0,
        vPos.y + sin(time * 2.0) * n.y * 10.0,
        vPos.z + sin(time * 2.0) * n.z * 10.0
    );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);
}