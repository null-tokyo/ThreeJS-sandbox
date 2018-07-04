varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

@import ./shaping/powerCurve;
@import ./util/transform;
@import ./shape/circle;
@import ./shape/rect;
@import ./util/noise;

void main () {
    vec2 st = (gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
    float t = time * 0.5;
    float sn = ( sin(t * 1.2 + 0.2) + sin(t * 2.4 + 0.8) + sin(t * 3.5 + 1.2) ) / 0.3;
    sn = sn * 0.1;
    float cs = ( cos(t * 0.2 + 1.2) + cos(t * 1.5 + 0.3) + cos(t * 2.7 + 1.8) ) / 0.3;
    cs = cs * 0.1;

    float s = snoise(st * 0.2 + time * 0.2);
    s = snoise(vec2(st.x * 0.1 + s * sn, st.y * 0.3 + s * cs));
    vec3 baseColor = mix(
        vec3(0.2, 1.0, 0.3) + (sn * 0.2),
        vec3(0.9, 0.5, 0.2) + (cs * 0.2),
        vec3(snoise(st + s)));
    st = rotate2d(st, t);

    

    float b = powerCurve(sn, 0.1, 0.9);
    float b2 = powerCurve(cs, 0.2, 0.8);

    float bb = b * b2;
    st = st * bb;

    vec2 stt = st;
    st.x -= step(1.0, mod(stt.y, 2.0)) * smoothstep(0.0, 1.0, mod(powerCurve(time, 0.1, 0.9), 2.0));
    st.y -= step(1.0, mod(stt.x, 2.0)) * smoothstep(1.0, 2.0, mod(powerCurve(time, 0.1, 0.9), 2.0));
    st = fract(st);
    st -= 0.5;

    st = rotate2d(st, t);

    float index = floor(mod(st.x, bb)) +  floor(mod(st.y, bb));

    vec2 str = rotate2d(st, t);
    float d = rect(str, vec2(0.0), vec2(0.5, 0.5)) - rect(str, vec2(0.0), vec2(0.45, 0.45));
    str = rotate2d(st, sn * 1.5);
    d += rect(str, vec2(0.0), vec2(0.3, 0.3)) - rect(str, vec2(0.0), vec2(0.25, 0.25));
    str = rotate2d(st, cs * 2.0);
    d += rect(str, vec2(0.0), vec2(0.125, 0.125)) - rect(str, vec2(0.0), vec2(0.075, 0.075));
    d = d;

    vec3 c = 1.2 - vec3(d /(b * b2));

    gl_FragColor = vec4(1.0 - c * baseColor, 1.0); 
}