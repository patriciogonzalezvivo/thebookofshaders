#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference
// http://thndl.com/category/shaders.html

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Rectangular
  vec2 r = abs(st);
  color = vec3(r,0.);

  // d = max(r.x,r.y);
  // color = vec3(d);
  // color = vec3( step(.4,d) );
  // color = vec3( step(.4,d) * step(d,.5) );
  // color = vec3(smoothstep(.3,.4,d)* smoothstep(.6,.5,d));

  // Rectangular round corners
  // d = length( max( abs(st)-.3, 0.) );
  // color = vec3(d);
  // color = vec3( step(.4,d) );
  // color = vec3( step(.4,d) * step(d,.5) );
  // color = vec3(smoothstep(.3,.4,d)* smoothstep(.6,.5,d));

  gl_FragColor = vec4(color,1.0);
}