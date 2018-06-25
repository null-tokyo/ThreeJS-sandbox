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
    vec2 uv = vUv;
    vec4 c = texture2D(tDiffuse, uv);
    vec4 g = glitch(tDiffuse, uv, time);
    vec3 n = noiseEffect(uv * resolution, time, noiseForce);
    //gl_FragColor = vec4(vec3(g.rgb - n), c.a);
    gl_FragColor = c;
}