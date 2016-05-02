// Author: 
// Title: 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(.0);

    vec2 cell[4];
    cell[0] = vec2(0.830,0.720);
    cell[1] = vec2(.6,.1);
    cell[2] = vec2(.2,.5);
    cell[3] = u_mouse/u_resolution;
    
    float md = 1.;
    vec2 mr;
    for (int i = 0; i < 4; i++) {
        // cell[i] = random2(cell[i]+floor(u_time));
        float d = distance(st, cell[i]);
        if ( d < md ) {
            md = d;
            mr = cell[i];
        }
    }
    
    color += vec3(md, mr);
    // feature points
    color += 1.-step(.02,md);
    // isolines
    // color += md*(0.5 + 0.5*sin(64.0*md));
    
    gl_FragColor = vec4(color,1.0);
}