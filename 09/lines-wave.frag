// Author @patriciogv - 2015 - patricio.io

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 wave(vec2 st, float freq) {
	st.y += cos(st.x*freq);
	return st;
}

vec2 zigzag(vec2 st, float freq) {
	st.y += mix(abs(floor(sin(st.x*3.1415))),abs(floor(sin((st.x+1.)*3.1415))),fract(st.x*freq));
	return st;
}

float line(vec2 st, float width) {
    return step(width,1.0-smoothstep(.0,1.,abs(sin(st.y*PI))));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

   	st *= 10.;
   	st = wave(st, 3.);
    vec3 color = vec3(line(st,.5));
    gl_FragColor = vec4(color, 1.0);
}
