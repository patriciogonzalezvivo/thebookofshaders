// Yosuke SAKAI(@flush_11, http://yosuke-sakai.com/)
// Drawing multiple shaping functions on gradient background
// A sample for the book of the shaders.
// http://thebookofshaders.com/05/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    
    //backgoud gradient
    vec3 bkcolor = vec3(st.x);
    
    // Plot a lines
    float pct1 = plot(st,st.x);
    float pct2 = plot(st,pow(st.x, 0.5));
    float pct3 = plot(st, pow(st.x, 2.0));
    
    vec3 color = (1.0-pct1)*(1.0-pct2)*(1.0-pct3)*bkcolor+pct1*vec3(1.0,0.0,0.0)+pct2*vec3(0.0,1.0,0.0) + pct3*vec3(0.0, 1.0, 1.0);
    
	gl_FragColor = vec4(color,1.0);
}
