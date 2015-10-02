// By Nima Behravan ( nimabeh.wordpress.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

// Inspired by http://glslsandbox.com/e#27880.0

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 mouse;
uniform vec2 u_resolution;

float w = u_resolution.x;
float h = u_resolution.y;

void main( void ) 
{
    float move = (w / 10.0) * (cos(u_time));
	vec2 pos  = vec2(w * 0.5, h * 0.5);

	
	float dist  = length(gl_FragCoord.xy - pos) + 60.0*cos(u_time);
	
	float size = 300.0;
	
	float color = 0.0;

	color += pow(size / dist, 2.0);
	float color3 = mix(color, color+0.5, 0.5);
	gl_FragColor = vec4(vec3(color3 / 2.0+cos(u_time), color3 / 4.0+cos(u_time), color3 / 1.5+cos(u_time)), 1.0);
}
