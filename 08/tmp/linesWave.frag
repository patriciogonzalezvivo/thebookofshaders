// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float stripes(vec2 st, float angle){
    st = rotate2d(angle) * st*10.;
    return 1.0-abs(sin(st.x*3.1415));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(.0);

	vec2 pos = vec2(0.5)-st;
	float t = u_time*.5;
    float r = dot(pos,pos)*4.;

    st *= 2.;
	float pattern = sin(fract(r+t)*3.1415);
	pattern = mix(stripes(st,-0.786375),stripes(st,0.786375),pattern);

	gl_FragColor = vec4( vec3(smoothstep(.4,.5,pattern)), 1.0 );
}
