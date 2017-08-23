// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

float circle(vec2 _st, float _radius){
  vec2 pos = vec2(0.5)-_st;
  _radius *= 0.75;
  return 1.-smoothstep(_radius-(_radius*0.05),_radius+(_radius*0.05),dot(pos,pos)*3.14);
}

void main(){

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  float pct = 0.0;
  vec2 st_i = floor(st*10.);
  pct += abs(mod(st_i.x,2.)-mod(st_i.y,2.));

  gl_FragColor = vec4(vec3(pct),1.0);
}
