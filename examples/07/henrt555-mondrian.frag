// By Tyler Henry ( http://tylerhenry.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 beige = vec3(0.953,0.941,0.914);
vec3 red = vec3(0.973,0.259,0.173);
vec3 blue = vec3(0.220,0.243,0.506);
vec3 yellow = vec3(0.992,0.745,0.275);
vec3 black = vec3(0.027,0.039,0.071); 

float rect(vec2 st, vec2 center, vec2 size, float smoothing){

	vec4 edges = vec4(center.x - size.x*0.5, center.y - size.y*0.5, center.x + size.x*0.5, center.y + size.y*0.5);
	
	float left = smoothstep(edges.x-smoothing,edges.x, st.x);
	float bottom = smoothstep(edges.y-smoothing,edges.y, st.y);
	float right = 1.0 - smoothstep(edges.z,edges.z+smoothing, st.x); //invert result
	float top = 1.0 - smoothstep(edges.w,edges.w+smoothing, st.y); //invert result

	return left * bottom * right * top;
}


float rectOutline(vec2 st, vec2 center, vec2 size, float smoothing, float lineWidth){

	float rectOutside = rect(st, center, size + lineWidth, smoothing);
	float rectInside = 1.0 - rect(st, center, size - lineWidth, smoothing); //invert colors

	return rectOutside * rectInside;

}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution.xy; //normalize coords
	vec3 color = vec3(0.0);

	float rect1 = rect(st, vec2(0.245,0.755), vec2(0.49, 0.49), 0.0); //st, center.xy, size.xy, smoothing
	vec3 rect1Color = red * rect1;

	float rect2 = rect(st, vec2(0.755,0.755), vec2(0.49, 0.49), 0.0); //st, center.xy, size.xy, smoothing
	vec3 rect2Color = beige * rect2;

	float rect3 = rect(st, vec2(0.245,0.245), vec2(0.49, 0.49), 0.0);
	vec3 rect3Color = beige * rect3;

	float rect4 = rect(st, vec2(0.667,0.333), vec2(0.313, 0.313), 0.0);
	vec3 rect4Color = beige * rect4;
	
	float rect5 = rect(st, vec2(0.667,0.075), vec2(0.31, 0.165), 0.0);
	vec3 rect5Color = yellow * rect5;

	float rect6 = rect(st, vec2(1.0,0.15), vec2(0.313, 0.313), 0.0);
	vec3 rect6Color = blue * rect6;

	color = vec3(rect1Color + rect2Color + rect3Color + rect4Color + rect5Color + rect6Color);

	gl_FragColor = vec4(color,1.0);
}