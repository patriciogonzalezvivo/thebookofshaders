// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Antialiazed Step function
// from http://webstaff.itn.liu.se/~stegu/webglshadertutorial/shadertutorial.html
float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
  float afwidth = 0.7 * length(vec2(dFdx(value), dFdy(value)));
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
  return step(threshold, value);
  #endif
}

// get distance field of a polygon in the center
// where N is the number of sides of it
// ================================
float shapeDF (vec2 st, int N) {
    st = st *2.-1.;
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(N);
    return cos(floor(.5+a/r)*r-a)*length(st);
}

// draw a polygon in the center
// where N is the number of sides of it
// ================================
float shape (vec2 st, int N, float width) {
    return 1.0-aastep(width,shapeDF(st,N));
}

// draw the border of a polygon in the center
// where N is the number of sides of it
// ================================
float shapeBorder (vec2 st, int N, float size, float width) {
    return shape(st,N,size)-shape(st,N,size-width);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  color.r += shapeBorder(st, 3, .1, .06);

  vec2 offset = vec2(.0,-.1);
  color += shapeBorder(st+offset+vec2(.045,.125), 3, .05, .03);
  color += shapeBorder(st+offset+vec2(-.045,.125), 3, .05, .03);
  color += shapeBorder(st+offset+vec2(0.,0.05), 3, .05, .03);

  gl_FragColor = vec4(color,1.0);
}
