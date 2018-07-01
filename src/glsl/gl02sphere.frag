varying vec4 vColor;
varying vec3 vPos;

@import ./util/lighting;

void main () {
    vec3 normal = getNormal(vPos);
    gl_FragColor = vec4(normal, 1.0);
}