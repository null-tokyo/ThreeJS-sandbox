varying vec2 vUv;
varying vec3 vPos;

uniform float time;

void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 n = normalize(pos);
    pos.x = pos.x + (sin(time * 20.0 + pos.x * 0.1 + 1.2) + sin(time * 8.0 + pos.x * 0.1 + 2.2) / 2.0) * normal.x * 10.0;
    pos.z = pos.z + sin(time * 5.0 + pos.z * 0.1 + 1.2) * normal.z * 10.0;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}