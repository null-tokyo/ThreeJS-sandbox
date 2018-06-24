precision mediump float;

uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float time;
uniform float noiseForce;

varying vec2 vUv;

@import ./util/noise;
@import ./effect/noiseEffect;
@import ./effect/glitch;

void main () {
    vec4 c = texture2D(tDiffuse, vUv);
    vec4 g = glitch(tDiffuse, vUv, time);
    vec3 n = noiseEffect(vUv * resolution, time, noiseForce);
    gl_FragColor = vec4(vec3(g.rgb - n), c.a);
}