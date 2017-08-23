// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){ return fract(sin(x)*43758.5453); }
float random(in vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }

float noise(in vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm( in vec2 p ){
    float s = 0.0;
    float m = 0.0;
    float a = 0.5;
    for(int i=0; i<2; i++ ){
        s += a * noise(p);
        m += a;
        a *= 0.5;
        p *= 2.0;
    }
    return s/m;
}

float bin(vec2 ipos, float n){
    float remain = mod(n,33554432.);
    for(float i = 0.0; i < 25.0; i++){
        if ( floor(i/3.) == ipos.y && mod(i,3.) == ipos.x ) {
            return step(1.0,mod(remain,2.));
        }
        remain = ceil(remain/2.);
    }
    return 0.0;
}

float char(vec2 st, float n){
    st.x = st.x*2.-0.5;
    st.y = st.y*1.2-0.1;

    vec2 grid = vec2(3.,5.);

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    n = floor(mod(n,10.));
    float digit = 0.0;
    if (n < 1. ) { digit = 31600.; }
    else if (n < 2. ) { digit = 9363.0; }
    else if (n < 3. ) { digit = 31184.0; }
    else if (n < 4. ) { digit = 31208.0; }
    else if (n < 5. ) { digit = 23525.0; }
    else if (n < 6. ) { digit = 29672.0; }
    else if (n < 7. ) { digit = 29680.0; }
    else if (n < 8. ) { digit = 31013.0; }
    else if (n < 9. ) { digit = 31728.0; }
    else if (n < 10. ) { digit = 31717.0; }
    float pct = bin(ipos, digit);

    vec2 borders = vec2(1.);
    // borders *= step(0.01,fpos.x) * step(0.01,fpos.y);   // inner
    borders *= step(0.0,st)*step(0.0,1.-st);            // outer

    return step(.5,1.0-pct) * borders.x * borders.y;
}

float grid(vec2 st, float res) {
    vec2 grid = fract(st*res);
    return 1.-(step(res,grid.x) * step(res,grid.y));
}

float superGrid(vec2 st) {
    return  1.*grid(st,0.01) +
            0.5*grid(st,0.02) +
            0.6*grid(st,0.1);
}

float box(in vec2 st, in vec2 size){
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float cross(in vec2 st, vec2 size){
    return  clamp(box(st, vec2(size.x*0.5,size.y*0.125)) +
            box(st, vec2(size.y*0.125,size.x*0.5)),0.,1.);
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    float aspect = u_resolution.x/u_resolution.y;

    vec2 grain_st = st-.5;
    vec3 color = vec3(0.0);
    float grain = 0.0;
    grain = mix(1., 0.8, dot(grain_st,grain_st) + (fbm(gl_FragCoord.xy*0.6)*0.1) );

    // Fix Aspect ration
    st -= .5;
    st.x *= aspect;

    // Zoom
    st *= 2.8;

    // Random blocks
    vec2 blocks_st = floor((st-.25)*6.);
    float t = u_time*.3+random(blocks_st);
    float time_i = floor(t);
    float time_f = fract(t);
    float block = step(0.9,random(blocks_st+time_i))*(1.0-time_f);
    vec2 offset = vec2(block*0.02,block*0.001)+(1.0-grain)*.08;

    // Grid
    vec2 grid_st = st*300.;

    vec3 grid_chroma = vec3(0.0);
    grid_chroma.r = superGrid(grid_st+offset*100.);
    grid_chroma.g = superGrid(grid_st);
    grid_chroma.b = superGrid(grid_st-offset*100.);
    color += vec3(0.1,0.08,0.08)*grid_chroma;

    // Crosses
    vec2 crosses_st = st + .5;
    crosses_st *= 3.;
    vec2 crosses_st_f = fract(crosses_st);
    color *= 1.-cross(crosses_st_f,vec2(.2,.2));

    vec3 cross_chroma = vec3(0.0);
    cross_chroma.r = cross(crosses_st_f+offset,vec2(.15,.15));
    cross_chroma.g = cross(crosses_st_f,vec2(.15,.15));
    cross_chroma.b = cross(crosses_st_f-offset,vec2(.15,.15));
    color += vec3(.7)*cross_chroma;

    // Digits
    vec2 digits_st = mod(st*60.,20.);
    vec2 digits_st_i = floor(digits_st);
    float digits_n = ceil(block*5.);
    offset *= 10.;
    if (block > 0.0 &&
        digits_st_i.y == 1. &&
        digits_st_i.x > 0. && digits_st_i.x < digits_n ) {
        vec2 digits_st_f = fract(digits_st);
        float pct = random(digits_st_i+floor(crosses_st)+floor(u_time*20.));

        color.r += block*char(digits_st_f+offset,100.*pct);
        color.g += block*char(digits_st_f,100.*pct);
        color.b += block*char(digits_st_f-offset,100.*pct);
    } else if ( block > 0.0 &&
                digits_st_i.y == 2. &&
                digits_st_i.x > 0. && digits_st_i.x < digits_n ) {
        vec2 digits_st_f = fract(digits_st);
        float pct = random(digits_st_i+floor(crosses_st)+floor(u_time*20.));

        color.r += block*char(digits_st_f+offset,100.*pct);
        color.g += block*char(digits_st_f,100.*pct);
        color.b += block*char(digits_st_f-offset,100.*pct);
    }
    gl_FragColor = vec4( (1.0-color) * grain, 1.0);
}
