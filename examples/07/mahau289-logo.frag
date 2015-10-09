// By Udit Mahajan ( uditmahajan.com / @mahajan_udit ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

//Choose a geometric logo to replicate using distance fields.

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
float field(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
  	float r = TWO_PI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st));
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d,d2,d3,d4 = 0.0;
  float a = 0.0;
  float r = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Number of sides of your shape
  int N = 9;
  
  // Shaping function that modulate the distance
  d = field(3.,0.5,0.5,st); // Number of sides, x position, y position, st

  d2 = field(3.,0.68,0.65,st);
  d3 = field(3.,0.32,0.65,st);
  d4 = field(3.,0.5,0.33,st);
    
  color = vec3(smoothstep(.4,.41,d2*2.));
  color *= vec3(smoothstep(.4,.41,d3*2.));
  color *= vec3(smoothstep(.4,.41,d4*2.));
  color *= vec3(0.2,1.,1.);
  color -= vec3(smoothstep(.4,.41,d));
  // color = vec3(d);

  gl_FragColor = vec4(1.-color,1.0);
}