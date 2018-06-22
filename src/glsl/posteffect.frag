uniform sampler2D tDiffuse;
varying vec2 vUv;

@import ./util/noise;

void main () {
    vec2 st = vUv * 10.0;
    st = fract(st); 
    vec4 dest = texture2D(tDiffuse, st);
    gl_FragColor = vec4(dest);
}