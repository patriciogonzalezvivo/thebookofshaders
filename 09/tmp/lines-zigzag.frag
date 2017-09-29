// Author @patriciogv - 2015 - patricio.io
#extension GL_OES_standard_derivatives : enable
#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535897932384626433832795;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
    return step(threshold, value);
  #endif
}

float stripes(vec2 st, float width){
    return aastep(width,abs(sin(st.y*3.14159265358)));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec2 pos = fract(st*30.);
    pos.y += mix(fract(pos.x),fract(1.0-pos.x),step(.5,pos.x))*3.;
    vec3 color = vec3(stripes(pos,.3));

    gl_FragColor = vec4(color, 1.0);
}
