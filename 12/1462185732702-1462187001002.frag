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

    vec2 cell[3];
    cell[0] = vec2(.3,.9);
    cell[1] = vec2(.6,.1);
    cell[2] = vec2(.2,.5);
    
    float df = 1.;
    vec2 mr;
    for (int i = 0; i < 3; i++) {
        cell[i] = random2(cell[i]+floor(u_time));
        
        float d = distance(st, cell[i]);
        if ( d < df ) {
            df = d;
            mr = cell[i];
        }
    }
    color = vec3(mr,0.5);
    color += 1.-step(.02,df);
    
    gl_FragColor = vec4(color,1.0);
}