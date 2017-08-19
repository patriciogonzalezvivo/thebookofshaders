// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rows = 10.0;

float circle(vec2 st, float radius){
  vec2 pos = vec2(0.5)-st;
  radius *= 0.75;
  return 1.-smoothstep(radius-(radius*0.01),radius+(radius*0.01),dot(pos,pos)*3.14);
}

float random(in vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  st *= 10.0;
  // Offset every other row
  st.x -= step(1., mod(st.y,2.0)) * 0.5;

  vec2 ipos = floor(st);  // integer position
  vec2 fpos = fract(st);  // float position

  // Move Right
  ipos += vec2(floor(u_time*-8.),0.);

  float pct = random(ipos);
  pct *= circle(fpos, 0.5);
  // pct = step(0.1+u_mouse.x/u_resolution.x,pct);
  // pct = 1.-pct;

  gl_FragColor = vec4(vec3(pct),1.0);
}
