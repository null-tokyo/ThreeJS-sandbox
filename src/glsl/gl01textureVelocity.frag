#include <common>

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D( texturePos, uv );
    vec4 tmpVel = texture2D( textureVelocity, uv );
    vec3 c = curlNoise(tmpPos.xyz);
    vec3 vel = tmpVel.xyz + c;
    gl_FragColor = vec4( vel, 1.0 );
}