// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

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

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Based on Asalga shader
// https://www.shadertoy.com/view/4ss3WX
void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float time = u_time*0.1;

    // move to the center
    st = st - 0.5;

    // cartesian to polar coordinates
    float r = length(st);
    float a = atan(st.y, st.x);

    // Repeat side according to angle
    float sides = 10.;
    float ma = mod(a, TWO_PI/sides);
    ma = abs(ma - PI/sides);

    // polar to cartesian coordinates
    st = r * vec2(cos(ma), sin(ma));
    st = fract(st+time);

    vec4 color = vec4(st.x,st.y,0.0,1.0);
    color = texture2D(u_tex0,st);

    gl_FragColor = color;
}
