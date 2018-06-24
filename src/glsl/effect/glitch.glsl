float distortion_x = 0.1;
float distortion_y = 0.1;
float seed = 0.02;
float seed_x = 0.01;
float seed_y = 0.01;
float col_s = 0.01;
float angle = 0.01;

vec4 offsetColor (sampler2D tDiffuse, vec2 uv, vec2 offset) {
    return texture2D(tDiffuse, uv + offset);
}

vec4 glitchBox (sampler2D tDiffuse, vec2 uv, float time) {
    seed = random(vec2(time * 10.0 , time * 60.));
    seed_y = random(vec2(time * 4.2 , time * 0.5)) - 0.5;
    seed_x = random(vec2(time * 0.1 , time * 8.)) - 0.5;
    distortion_x = random(vec2(time * 0.01 , time * 1.)) * 0.0005;
    distortion_y = random(vec2(time * 0.01 , time * 1.)) * 0.0005;
    angle = random(vec2(time * 0.1 , time * 1.2)) * 3.14150263 * 2.0;
    vec2 p = uv;
    float xs = floor(gl_FragCoord.x / 0.5);
    float ys = floor(gl_FragCoord.y / 0.5);
    vec4 normal = texture2D (tDiffuse, uv * seed * seed);
    if(p.y < distortion_y + col_s && p.y > distortion_x - col_s * seed) {
        if(seed_x > 0.0) {
            p.y = 1.0 - (p.y - distortion_y);
        } else {
            p.y = distortion_y;
        }
    }
    if(p.x < distortion_x + col_s && p.x > distortion_y - col_s * seed) {
        if(seed_y > 0.0) {
            p.x = 1.0 - (p.x - distortion_x);
        } else {
            p.x = distortion_x;
        }
    }
    p.x += normal.x * seed_x * (seed / 10.);
    p.y += normal.y * seed_x * (seed / 10.);

    vec2 offset = 0.02 * vec2(sin(angle), cos(angle));

    vec4 g = texture2D(tDiffuse, p);
    vec4 gr = offsetColor(tDiffuse, p, offset);
    vec4 gb = offsetColor(tDiffuse, p, -offset);

    return vec4(gr.r, g.g, gb.b, g.a);
}

vec4 glitch (sampler2D tDiffuse, vec2 uv, float time) {
    vec4 gb = glitchBox(tDiffuse, uv, time);
    return gb;
}