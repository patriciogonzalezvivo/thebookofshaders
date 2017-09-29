// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float shape(vec2 st, float N){
    st = st *2.-1.;
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/floor(N);
    return cos(floor(.5+a/r)*r-a)*length(st);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);

  float sides = u_time*.5;
  float minSides = 3.;
  float maxSides = 6.;

  float d = mix(shape(st,minSides+mod(sides,maxSides)),
                shape(st,minSides+mod(sides+1.,maxSides)),
                pow(fract(sides),20.));

  // Size
  d = step(.4,d);

  gl_FragColor = vec4(vec3(1.0-d),1.0);
}
