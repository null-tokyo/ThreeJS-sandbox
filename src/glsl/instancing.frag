precision highp float;
varying vec2 vUv;
varying vec3 vPos;
uniform vec3 lightPos;
uniform sampler2D toonTex;

@import ./util/lighting;
@import ./util/color;

void main() {
    vec4 color = vec4(0.6, 0.6, 0.6, 1.0);
    vec3 normal = getNormal(vPos);
    vec3 ca1 = diffuseToonColor(color.rgb, normal, lightPos, toonTex);
    gl_FragColor = vec4(ca1, color.a);
}