// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float rect(in vec2 _st, in vec2 _size){
	_size = vec2(0.5) - _size*0.5;
	vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
	return uv.x*uv.y;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec3 color = vec3( rect(st, vec2(0.9)) );

	gl_FragColor = vec4(color,1.0);
}