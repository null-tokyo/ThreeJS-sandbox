precision mediump float;

uniform sampler2D tDiffuse;
uniform sampler2D tDisp;
uniform vec2 resolution;
uniform float time;
uniform float noiseForce;

varying vec2 vUv;

@import ./util/color;
@import ./util/noise;
@import ./effect/noiseEffect;
@import ./effect/glitch;

void main () {
    vec2 uv = vUv;
    vec4 c = texture2D(tDiffuse, uv);
    vec4 g = glitch(tDiffuse, tDisp, uv, time);
    vec3 n = noiseEffect(uv * resolution, time, noiseForce);

    float grade = (c.r + c.g + c.b + c.a) / 3.0;
    float h = 0.4 + grade * 0.4;
    float s = 1.0;
    float b = grade;

    vec3 color = hsb2rgb(vec3(h, s, b));
    color = mix(color, g.rgb, 0.2);
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(vec3(color - n * 0.9), c.a);
    //gl_FragColor = c;
}