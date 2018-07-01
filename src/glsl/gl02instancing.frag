precision highp float;
varying vec2 vUv;
varying vec3 vPos;
uniform vec3 lightPos;
uniform sampler2D toonTex;
uniform vec3 baseColor;
uniform float time;

@import ./util/lighting;
@import ./util/color;

void main() {
    vec3 color = baseColor;
    vec3 color2;
    vec3 color3;

    vec2 v = gl_FragCoord.xy * 0.3;
    float f = step(0.5, fract(v.x));

    vec3 hsb = rgb2hsb(baseColor);
    color = baseColor;
    hsb.r = hsb.r - 0.15;
    hsb.b = hsb.b + 0.20;
    color2 = hsb2rgb(hsb);
    hsb.r = hsb.r + 0.20;
    hsb.b = hsb.b + 0.40;
    color3 = hsb2rgb(hsb);

    vec3 normal = getNormal(vPos);
    vec3 ca1 = diffuseToonColor(normal, lightPos, toonTex);
    float diffuse = clamp(dot(normal, lightPos), 0.0, 1.0);
    float c = step(0.9, ca1.r) + step(0.7, ca1.r);
    
    float s;
    if(c == 2.0) {
        s = 1.0;
        diffuse = 0.9;
        color.rgb = color;
    }else if(c == 1.0) {
        s = 0.6;
        diffuse = 0.8;
        color.rgb = color2;
    }else if(c == 0.0) {
        s = 0.4;
        diffuse = 0.7;
        color.rgb = color3;
    }

    gl_FragColor = vec4(color * clamp((vec3(f) + diffuse) * s, 0.0, 1.0) + color, 1.0);
}