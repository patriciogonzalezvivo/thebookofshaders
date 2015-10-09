// By Hang Do Thi Duc ( http://22-8miles.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    st *= 4.;
    st -= 2.;
    float pct = 0.0;
    // pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    // pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
    // pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    // pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));

    vec2 a = vec2(0.4);
    a.x = sin(u_time * 4.);
    a.y = cos(u_time * 2.);
    vec2 b = vec2(0.6);
    pct = min(distance(st, a),distance(st, b)) + distance(st, a);
    pct = 1.-pct;

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}