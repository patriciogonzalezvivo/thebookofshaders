// By Tyler Henry ( http://tylerhenry.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

float customDistField(vec2 st, float sides){

  float dist = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI/2.;
  float r = TWO_PI/float(sides);

  // Shaping function that modulate the distance
  dist = cos(floor(.5+a/r)*r-a)*length(st);

  return dist;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);

  
  float d1 = customDistField(st, 6.);
  float d2 = customDistField(vec2(st.x,st.y+0.29), 6.);

  vec3 color1 = vec3(1.0-smoothstep(.5,.51,d1));
  vec3 color2 = vec3(1.0-smoothstep(.2,.21,d1));
  vec3 color3 = vec3(1.0-smoothstep(.5,.51,d2));
  vec3 nodeN = clamp(color1 - color2 - color3, 0.0, 1.0);

  vec3 hex = 1. - vec3(smoothstep(.8,.81,d1));
  hex *= vec3(0.506,0.737,0.290); //make it green

  color = hex - nodeN;

  gl_FragColor = vec4(color,1.0);
}