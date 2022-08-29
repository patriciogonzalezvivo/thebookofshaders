// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work.
//
// You cannot host, display, distribute or share this Work in any form,
// including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it.
// I share this Work for educational purposes, and you can link to it,
// through an URL, proper attribution and unmodified screenshot, as part
// of your educational material. If these conditions are too restrictive
// please contact me and we'll definitely work it out.

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

float rows = 10.0;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.x += 0.5;
    }
    return fract(_st);
}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
	_st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
	_st += 0.5;
    return _st;
}

void main(){

	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st = brickTile(st,rows);

	float angle = PI*0.25*cos(u_time*0.5);

	if (fract( (gl_FragCoord.y/u_resolution.y) * 0.5 * rows) > 0.5){
        angle *= -1.0;
    }

	st = rotate2D(st,angle);

	st *= 2.0;
	float pct = (1.0+cos(PI*st.x))*0.5;

	vec3 color = vec3( 1.0-smoothstep( 0.5,0.6, pow(pct,st.y) ) * 1.0-smoothstep( 0.79,0.81, pow(pct,2.0-st.y )  ) );

	gl_FragColor = vec4(color,1.0);
}
