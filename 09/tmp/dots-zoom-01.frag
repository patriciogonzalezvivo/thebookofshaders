// Author @patriciogv ( patricio.io ) - 2015
// Inspired by the Patterns of Nina Warmerdam ( www.behance.net/ninawarmerdam )
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

#ifdef GL_ES
precision mediump float;
#endif

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
vec2 brickTile(vec2 st, float zoom){
  st *= zoom;
  if (fract(st.y * 0.5) > 0.5){
      st.x += 0.5;
  }
  return fract(st);
}

float circleDF(vec2 st){
  return dot(st,st);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 IN = st;
    vec2 OUT = st*2.;

    float pct = 1.0-fract(u_mouse.y/u_resolution.y);

    float A = circleDF(vec2(0.5)-st);
    float B = circleDF(vec2(0.25)-st)*5.;
    B = min(B, circleDF(vec2(0.75,0.25)-st)*5.);
    B = min(B, circleDF(vec2(0.5,0.75)-st)*5.);
    B = min(B, circleDF(vec2(0.,0.75)-st)*5.);
    B = min(B, circleDF(vec2(1.,0.75)-st)*5.);

    float d = 0.0;
    d = mix(A,B,pct);
    d = aastep(.21,d);
    color = vec3(d);

    gl_FragColor = vec4(color,1.0);
}
