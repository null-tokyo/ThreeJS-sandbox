precision mediump float;

uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform vec3 lightPos;

varying vec2 vUv;
varying vec3 vPos;

@import ./util/getNormal;

void main () {
    vec4 color = vec4(1.0);
    vec3 normal = getNormal(vPos);
    float diffuse = clamp(dot(normal, normalize(lightPos)), 0.0, 1.0);
    color = color * vec4(vec3(diffuse + 0.3), 1.0);
    gl_FragColor = color;
}