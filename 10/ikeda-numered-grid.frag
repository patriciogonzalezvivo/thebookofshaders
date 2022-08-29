// Author @patriciogv - 2015
// Title: Ikeda Numered Grid

#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work.
//
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){ return fract(sin(x)*43758.5453); }
// float random(in vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }
float random(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

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

float grid(vec2 st, float res){
    vec2 grid = fract(st*res);
    return 1.-(step(res,grid.x) * step(res,grid.y));
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
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);

    // Grid
    vec2 grid_st = st*300.;
    color += vec3(0.5,0.,0.)*grid(grid_st,0.01);
    color += vec3(0.2,0.,0.)*grid(grid_st,0.02);
    color += vec3(0.2)*grid(grid_st,0.1);

    // Crosses
    vec2 crosses_st = st + .5;
    crosses_st *= 3.;
    vec2 crosses_st_f = fract(crosses_st);
    color *= 1.-cross(crosses_st_f,vec2(.3,.3));
    color += vec3(.9)*cross(crosses_st_f,vec2(.2,.2));

    // Digits
    vec2 digits_st = mod(st*60.,20.);
    vec2 digits_st_i = floor(digits_st);
    if (digits_st_i.y == 1. &&
        digits_st_i.x > 0. && digits_st_i.x < 6. ) {
        vec2 digits_st_f = fract(digits_st);
        float pct = random(digits_st_i+floor(crosses_st)+floor(u_time*20.));
        color += vec3(char(digits_st_f,100.*pct));
    } else if (digits_st_i.y == 2. &&
        digits_st_i.x > 0. && digits_st_i.x < 8. ) {
        vec2 digits_st_f = fract(digits_st);
        float pct = random(digits_st_i+floor(crosses_st)+floor(u_time*20.));
        color += vec3(char(digits_st_f,100.*pct));
    }
    gl_FragColor = vec4( color , 1.0);
}
