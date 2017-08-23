// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rows = 10.0;

vec2 brickTile(vec2 _st, float _zoom){
  _st *= _zoom;
  if (fract(_st.y * 0.5) > 0.5){
      _st.x += 0.5;
  }
  return fract(_st);
}

float circle(vec2 _st, float _radius){
  vec2 pos = vec2(0.5)-_st;
  _radius *= 0.75;
  return 1.-smoothstep(_radius-(_radius*0.01),_radius+(_radius*0.01),dot(pos,pos)*3.14);
}

void main(){

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  st = brickTile(st,5.);
  vec3 color = vec3(1.0-circle(st, 0.11));

  gl_FragColor = vec4(color,1.0);
}
