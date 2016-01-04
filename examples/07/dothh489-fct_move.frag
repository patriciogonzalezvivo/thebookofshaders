// By Hang Do Thi Duc ( http://22-8miles.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle (float sc, float r, float sm, float posX, float posY, vec2 st){

    vec2 toCenter;
    toCenter.x = posX-st.x;
    toCenter.y = posY-st.y;
    float pct = length(toCenter) * sc;
    pct = smoothstep(r-sm, r+sm, pct);
    return pct;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    float si = abs(sin(u_time * 3.14));
    float co = abs(sin(u_time * 3.14));
    pct = circle(8., 0.2, 0.1, mod(u_time * 0.8, 1.5) - 0.2, si, st);
    pct *= circle(5., 0.2, 0.1, sin(u_time), cos(u_time), st);
    pct *= circle(2., 0.1, 0.1, si, mod(u_time * 0.2, 1.5) - 0.5, st);

    vec3 color = vec3(0.0);
    vec3 colorA = vec3(co, 0.3, si);
    vec3 colorB = vec3(si, co, 0.5);
    color = mix(colorA, color, pct);

	gl_FragColor = vec4( color, 1.0 );
}