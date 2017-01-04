#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(float x, float y){
  return  smoothstep( x-0.02, x, y) - 
          smoothstep( x, x+0.02, y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 color = vec3(st.x);
    
    // Plot a line
    float pct = plot(st.x, st.y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    
	gl_FragColor = vec4(color,1.0);
}
