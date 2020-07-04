// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0.0);

    // Fix the proportions by finding the aspect ratio
    float aspect = u_tex0Resolution.x/u_tex0Resolution.y;
    // st.y *= aspect;  // and then applying to it

    color = texture2D(u_tex0,st);

    gl_FragColor = color;
}
