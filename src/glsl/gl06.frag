varying vec2 vUv;
varying vec3 vPos;

uniform float time;
uniform vec2 resolution;
uniform sampler2D tDiffuse;
uniform vec3 eyePosition;
uniform samplerCube cubeTexture;
uniform float eta;

@import ./util/lighting;

#define PI 3.14159263

void main () {
    vec2 st = (gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
    vec3 normal = getNormal(vPos);

    vec3 re = reflect(vPos - eyePosition, normal);
    vec3 ra = refract( normalize(vPos - eyePosition), normal, eta);
    vec4 reColor = textureCube(cubeTexture, re);
    vec4 raColor = textureCube(cubeTexture, ra);
    
    vec4 destColor = mix(reColor, raColor, 0.5);

    for(int i = 1; i < 20; i++){
        st.x+= 0.8 / float(i) * (sin(float(i) * 0.5 * st.y + time) + sin(float(i) * 1.2 * st.y + st.x + time)) * 0.8;
        st.y+= 0.8 / float(i) * (cos(float(i) * 1.7 * st.x + time) + cos(float(i) * 0.8 * st.x + st.y + time)) * 0.8;
    }

    float r = cos(st.x + st.y + 1.) * 0.5 + 0.5;
    float b = (cos(st.x + st.y) + sin(st.x + st.y)) * 0.5 + 0.5;
    float g = sin(st.x + st.y + 1.) * 0.5 + 0.5;

    destColor = mix(destColor, vec4(0.364, 0.219, 0.9271 * b, 0.5), 0.1);
    destColor = mix(destColor, vec4(0.9271 * r, 0.827, 0.364, 0.5), 0.1);


    // for(int i = 1; i < 20; i++){
    //     st.x+= 0.5 / float(i) * (cos(float(i) * 0.5 * st.y + time) + cos(float(i) * 1.2 * st.y + st.x + time)) * 0.5;
    //     st.y+= 0.5 / float(i) * (sin(float(i) * 1.7 * st.x + time) + sin(float(i) * 0.8 * st.x + st.y + time)) * 0.5;
    // }
    // float r = cos(st.x + st.y + 1.) * 0.5 + 0.5;
    // float b = (cos(st.x + st.y) + sin(st.x + st.y)) * 0.5 + 0.5;
    // float g = sin(st.x + st.y + 1.) * 0.5 + 0.5;

    // float d = 1.0 - (r + g + b) / 3.0;

    // vec3 color = mix(
    //     vec3(0.364, 0.827, 0.9271 * g),
    //     vec3(0.9271 * r, 0.364, 0.564),
    //     d);

    // vec3 c = diffuseDirLightColor(color, normal, vec3(1.0, 1.0, 1.0));
    gl_FragColor = vec4(destColor.rgb, 0.7);
}