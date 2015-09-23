// Author @patriciogv - 2015 - patricio.io

#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535897932384626433832795;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float stripes(vec2 st){
    return step(.2,abs(sin(st.x*PI)));
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st.x *= u_resolution.x/u_resolution.y;

	vec2 pos = vec2(0.5)-st;
	float a = atan(pos.y,pos.x);
	float r = length(pos);

	vec3 color = vec3(stripes(vec2(a,r)*50.));
	gl_FragColor = vec4(color, 1.0);
}