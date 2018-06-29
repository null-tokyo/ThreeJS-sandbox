uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
uniform float cameraConstant;

varying vec4 vColor;

@import ./util/color;

void main () {
    vec4 posTemp = texture2D( texturePosition, uv );
    vec4 velTemp = texture2D( textureVelocity, uv );
    vec3 pos = posTemp.xyz;
    vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
    gl_PointSize = 0.5 * cameraConstant / ( - mvPosition.z );
    float d1 = length(posTemp.xyz) * 0.04;
    float d2 = length(velTemp.xyz) * 0.1;

    float h = (180.0 + (20.0 * d2)) / 360.0;
    float s = 0.5 * d1 + 0.1;
    float b = 0.3 * d2 + 0.7;

    vec3 color = hsb2rgb(vec3(h, s, b));

    vColor = vec4(color, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}