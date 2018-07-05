uniform float time;
uniform float force;
uniform float frequency;
uniform float speed;

varying vec2 vUv;
varying vec3 vPos;

@import ./util/noise;

void main () {
    vUv = uv;
    vec3 p = position;
    vec3 n = normalize(position);
    float t = time * 0.003 * speed;
    float frequency = 0.0002 * frequency;
    float force = force * 0.15;
    for(int i = 0; i < 20; i++){
        p.x += force * (sin(t * speed + p.y * frequency) + sin(t * speed + p.z * frequency)) * 0.5;
        p.y += force * (cos(t * speed + p.z * frequency) + cos(t * speed + p.x * frequency)) * 0.5;
        p.z += force * (sin(t * speed + p.x * frequency) + sin(t * speed + p.y * frequency)) * 0.5;
    }

    vPos = p;
    vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}