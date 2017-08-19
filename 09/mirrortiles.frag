// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

float fillX(vec2 _st, float _pct,float _antia){
  return  smoothstep( _pct-_antia, _pct, _st.x);
}

float fillY(vec2 _st, float _pct,float _antia){
  return  smoothstep( _pct-_antia, _pct, _st.y);
}

vec2 mirrorTile(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.y = 1.0-_st.y;
    }
    return fract(_st);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);

  st = mirrorTile(st,5.0);
  color = vec3(fillY(st,0.5+sin(st.x*PI*2.0)*0.45,0.02));

  gl_FragColor = vec4( color, 1.0 );
}
