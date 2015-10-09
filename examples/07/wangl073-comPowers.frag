// By Luobin Wang ( @peterobbin ) 
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

float triShapeDistance(vec2 st, int sides){
    // Remap the space to -1. to 1.
  st = st *2.-1.;
  float sinT = sin(u_time ) * 0.5 + 0.5;
  float cosT = cos(u_time ) * 0.5 + 0.5;


  // Number of sides of your shape
  int N = sides;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);

  // Shaping function that modulate the distance
  float d = max(cos(floor(1.5+a/r)*r-a - sinT)*length(st), sin(floor(1.5+a/r)*r-a + cosT)*length(st));

  return d;

}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  
  
  
  d = triShapeDistance(st, 5);
  color = vec3(1.0-smoothstep(.0,0.8,d));
  // color = vec3(d);

  gl_FragColor = vec4(color,1.0);
}