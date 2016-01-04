// By Peiying Feng
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	float pct = 0.0;
	float m = abs(sin(u_time*0.5));
	float n = abs(cos(u_time*0.5))*2.0;

	// 01
	// st = st * 2.0 - 0.8;
	// pct = ceil(distance(st,vec2(0.2))*m) - step(0.2, distance(st, vec2(0.1*m)));
	// gl_FragColor = vec4(vec3(1.0, 1.0*pct, 0.3*pct), 1.0);

	//02
	// st = st * 2.0 - 0.5;
	// pct = exp(distance(st,vec2(0.2)))*m - distance(st, vec2(0.8)) * distance(st, vec2(0.1*m));
 	// gl_FragColor = vec4(vec3(0.0, 0.5*pct, pct), 1.0);

    //03
	st.x = st.x * 10.0 - 10.0 * m;
	st.y = st.y * 10.0 - 10.0 * abs(sin(u_time*0.1));
	pct = m*distance(st, vec2(0.5*n))*0.2 / distance(st, vec2(0.2))*2.0;
    gl_FragColor = vec4(vec3(0.0, 0.5*pct, pct), 1.0); 
    
    // How to travel in a circular motion?

}