// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

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
  vec3 color = vec3(circle(st+vec2(0.,0.1), 0.007)+
                    circle(st+vec2(0.00,-0.1), 0.007)+
                    circle(st+vec2(-0.1,0.), 0.007)+
                    circle(st+vec2(0.1,0), 0.007));

  gl_FragColor = vec4(color,1.0);
}
