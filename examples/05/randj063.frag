// By Jaskirat Randhawa ( http://jaskirat.me/ ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359 

uniform vec2 u_resolution;
uniform float u_time;

void main (void)
{
	// float fade_out = 1.-abs(sin(u_time)-cos(u_time));
	float fade_out = 1.-mod(u_time, 2.);	// SAW TOOTH FUNCTION

	float border = abs(sin(fade_out/3.)); // 0.01
	float circle_radius= 1.-(fade_out); // 0.5
	
	vec4 circle_color= vec4(1.0, 1.0, 1.0, fade_out);
	vec2 circle_center= vec2(0.5, 0.5);

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
	vec4 bkg_color = vec4(0.);
 
	// Offset st with the center of the circle.
	st = st - circle_center;
  
	// float dist =  sqrt(dot(st/.2, circle_center*2.)); //????
	// float dist =  sqrt(st.x*st.x+st.y*st.y); //r^2 = x^2 + y^2 // Equation of circle
	float dist =  sqrt(dot(st/.2, st/.2)); //Equation of circle using dot product
 
	float t = 1.0 + smoothstep(circle_radius, circle_radius+border, dist) 
                - smoothstep(circle_radius-border, circle_radius, dist);
 
	gl_FragColor = mix(circle_color, bkg_color,t);
}
