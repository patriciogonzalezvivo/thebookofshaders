// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

// My own port of this processing code by @beesandbombs
// https://dribbble.com/shots/1696376-Circle-wave

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float circleWave(vec2 st, float radius) {
	st = vec2(0.5)-st;
    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float m = abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;
    float f = (cos(a*10.)*.1*pow(m,2.))+radius;
    return 1.-smoothstep(f,f+0.007,r);
}

float circleWaveLine(vec2 st, float radius, float width) {
    return circleWave(st,radius)-circleWave(st,radius-width);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(1.0) * circleWaveLine(st,0.8,0.02);
    st -= vec2(0.5);
    st = rotate2d(.314)*st;
    st += vec2(0.5);
    color = mix(color,vec3(1.0),circleWaveLine(st,0.8,0.02));

	gl_FragColor = vec4( color, 1.0 );
}
