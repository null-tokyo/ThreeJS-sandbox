varying vec2 vUv;
varying vec3 vPos;
uniform float time;

void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 n = normalize(pos);
    pos.y += normal.y * sin(time * 5.0) * 100.0;
    pos.x = pos.x + (sin(time * 20.0 + pos.y * 0.1 + 1.2) + sin(time * 8.0 + pos.y * 0.1 + 2.2) / 2.0) * normal.x * 20.0 * pos.y * 0.02;
    pos.z = pos.z + cos(time * 5.0 + pos.y * 0.1 + 1.2) * normal.z * 20.0 * pos.y * 0.02;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}