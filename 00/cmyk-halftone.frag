// Author: tsone
// https://www.shadertoy.com/view/Mdf3Dn

#ifdef GL_ES
precision mediump float;
#endif

#define DOTSIZE 1.48
#define D2R(d) radians(d)
#define MIN_S 07.5
#define MAX_S 15.0
#define SPEED 0.3

#define SST 0.888
#define SSQ 0.288

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 ORIGIN = 0.5*u_resolution.xy;
float S = MIN_S+(MAX_S-MIN_S)*(0.5-0.5*cos(SPEED*u_time));
float R = SPEED*0.333*u_time;

vec4 rgb2cmyki (in vec4 c) {
    float k = max(max(c.r,c.g),c.b);
    return min(vec4(c.rgb/k,k),1.0);
}

vec4 cmyki2rgb (in vec4 c) {
    return vec4(c.rgb*c.a,1.0);
}

vec2 px2uv (in vec2 px) {
    return vec2(px/(u_resolution.xy*vec2(1.0,2.0))-vec2(1.0,0.0) );
}

vec2 grid (in vec2 px) {
    return px-mod(px,S);
}

vec4 ss(in vec4 v) {
    return smoothstep(SST-SSQ,SST+SSQ,v);
}

vec4 halftone (in vec2 fc,in mat2 m) {
    vec2 smp = (grid(m*fc)+0.5*S)*m;
    float s = min(length(fc-smp)/(DOTSIZE*0.5*S),1.0);
    vec4 c = rgb2cmyki(texture2D(u_tex0,px2uv(smp+ORIGIN)));
    return c+s;
}

mat2 rotm (in float r) {
    float cr = cos(r);
    float sr = sin(r);
    return mat2(
        cr,-sr,
        sr,cr
    );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    if (st.x > 0.5) {
        R = 3.14-(u_mouse.y/u_resolution.y)*(3.14/180.);
        S = 12.0-(u_mouse.x/u_resolution.x)*7.0;

        vec2 fc = gl_FragCoord.xy*2.0-ORIGIN;
        mat2 mc = rotm(R+D2R(15.0));
        mat2 mm = rotm(R+D2R(75.0));
        mat2 my = rotm(R);
        mat2 mk = rotm(R+D2R(45.0));

        float k = halftone(fc,mk).a;
        vec4 c = cmyki2rgb(ss(vec4(
            halftone(fc,mc).r,
            halftone(fc,mm).g,
            halftone(fc,my).b,
            halftone(fc,mk).a
        )));

        gl_FragColor = c;
    } else {
        st = vec2(st.x,st.y*0.5)*2.0;
        gl_FragColor = texture2D(u_tex0,st);
    }


}
