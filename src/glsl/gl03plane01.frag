varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

@import ./shaping/powerCurve;
@import ./util/transform;
@import ./shape/circle;
@import ./shape/rect;

void main () {
    vec2 st = (gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);

    float t = fract(time * 0.2) * 2.0;
    st = rotate2d(st, t);
    st = st * 1.2;
    st = fract(st);
    float d = rect(st, vec2(0.5), vec2(t, t)) + 1.0 - rect(st, vec2(0.5), vec2(t - 0.1, t - 0.1));
    
    st = rotate2d(st, -t * 1.5);
    t = powerCurve(t, 0.1, 0.9);
    st = st * 0.8;
    st = fract(st);
    float d2 = rect(st, vec2(0.5), vec2(t, t)) + 1.0 - rect(st, vec2(0.5), vec2(t - 0.1, t - 0.1));
    
    st = rotate2d(st, t * 2.0);
    t = powerCurve(t, 0.0, 1.0);
    st = st * 1.6;
    st = fract(st);
    float d3 = rect(st, vec2(0.5), vec2(t, t)) + 1.0 - rect(st, vec2(0.5), vec2(t - 0.1, t - 0.1));
    
    st = rotate2d(st, -t * 4.0);
    t = powerCurve(t, 0.4, 0.6);
    st = st * 1.2;
    st = fract(st);
    float d4 = rect(st, vec2(0.5), vec2(t, t)) + 1.0 - rect(st, vec2(0.5), vec2(t - 0.1, t - 0.1));
    
    vec3 c = 1.0 - vec3(st.x * d, st.y * d, st.y * d);
    c += vec3(st.x * d2, st.y * d2, st.y * d2);
    c += -vec3(st.x * d3, st.y * d3, st.y * d3);
    c += vec3(st.x * d4, st.y * d4, st.y * d4);
    gl_FragColor = vec4(c, 1.0); 
}