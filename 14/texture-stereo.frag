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
    vec3 color = vec3(1.0);

    st *= vec2(.5,1.);

    // st.x *= u_resolution.x/u_resolution.y;
    float t = u_time*24.;
    float pct = step(.75,abs(sin((st.x+t)*3.1415*10.)));

    vec3 A = texture2D(u_tex0,st).rgb;
    vec3 B = texture2D(u_tex0,st+vec2(.5,.0)).rgb;

    color = abs(A-B);
    // color = mix(A, B, abs(sin(pct)));
    
    gl_FragColor = vec4(color,1.);
}