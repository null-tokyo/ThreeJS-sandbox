precision mediump float;

uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform vec3 lightPos;
uniform vec3 eyeDirection;

varying vec2 vUv;
varying vec3 vPos;

@import ./util/lighting;

void main () {
    vec4 color = vec4(0.7);
    vec3 normal = getNormal(vPos);
    vec3 ca1 = diffuseAmbLightColor(color.rgb, normal, vec3(0.0) - lightPos, vec3(0.6234, 0.7824, 0.983));
    //vec3 ca2 = diffuseAmbLightColor(color.rgb, normal, vec3(1.0, 1.0, -1.0), vec3(0.7824, 0.983, 0.6234));
    vec3 ca = ca1 + vec3(getSpecular(normal, normalize(vec3(0.0) - lightPos), eyeDirection));
    gl_FragColor = vec4(ca, color.a);
}