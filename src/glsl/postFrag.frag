uniform sampler2D tDiffuse;
varying vec2 vUv;

void main () {
    vec4 dest = texture2D(tDiffuse, vUv);
    gl_FragColor = dest;
}