varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

@import ./shaping/powerCurve;
@import ./util/transform;
@import ./shape/circle;
@import ./shape/rect;

void main () {
    vec2 st = (gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);

    float t = time * 0.5;

    st = rotate2d(st, t);

    float sn = ( sin(t * 1.2 + 0.2) + sin(t * 2.4 + 0.8) + sin(t * 3.5 + 1.2) ) / 0.3;
    sn = sn * 0.5;
    float cs = ( cos(t * 0.2 + 1.2) + cos(t * 1.5 + 0.3) + cos(t * 2.7 + 1.8) ) / 0.3;
    cs = cs * 0.5;

    float b = powerCurve(sn, 0.1, 0.9);
    float b2 = powerCurve(cs, 0.2, 0.8);

    float bb = b * b2;
    st = st * bb;
    st = fract(st);
    st -= 0.5;

    float index = floor(mod(st.x, bb)) +  floor(mod(st.y, bb));
    st = rotate2d(st, sn * cs);

    float d = rect(st, vec2(0.0), vec2(0.5, 0.5));

    vec3 c = vec3(d /(b * b2));

    gl_FragColor = vec4(c, 1.0); 
}