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


float circle(vec2 st, vec2 center, float radius, float smoothing){

    float dist = distance(st,center); //generate distance field cone

    float circle = smoothstep(radius, radius+smoothing, dist); //slice that cone

    return clamp(1.0 - circle, 0.0, 1.0); //invert + clamp (is clamp needed?)

}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    float radius = sin(u_time*6.) * 0.01 + 0.2;
    float smoothing = 800000. * pow(radius, 10.);

    float circle1 = circle(st, vec2(0.5), radius, smoothing); //st, center.xy, radius, smoothing
    vec3 color1 = red * circle1;

    vec2 pos2 = vec2(cos(u_time) * 0.2 + 0.5, sin(u_time) * 0.2 + 0.5);

    float circle2 = circle(st, pos2, 0.2, 0.05); //st, center.xy, radius, smoothing
    vec3 color2 = yellow * circle2;

    vec2 pos3 = vec2(cos(u_time) * 0.3 + 0.6, sin(u_time) * 0.4 + 0.4);

    float circle3 = circle(st, pos3, 0.2, 0.05); //st, center.xy, radius, smoothing
    vec3 color3 = blue * circle3;


    vec3 color = color1 + color2 + color3;

	gl_FragColor = vec4(color, 1.0);
}