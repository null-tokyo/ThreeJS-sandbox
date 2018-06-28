uniform sampler2D texturePosition;
uniform float cameraConstant;

varying vec4 vColor;

void main () {
    vec4 posTemp = texture2D( texturePosition, uv );
    vec3 pos = posTemp.xyz;
    vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
    gl_PointSize = 0.5 * cameraConstant / ( - mvPosition.z );
    vColor = vec4( 1.0, 0.7, 1.0, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}