// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Based on https://www.shadertoy.com/view/4sSSzG
float triangle (vec2 _st, 
                vec2 _p0, vec2 _p1, vec2 _p2, 
                float _smoothness){
  vec3 e0, e1, e2;

  e0.xy = normalize(_p1 - _p0).yx * vec2(+1.0, -1.0);
  e1.xy = normalize(_p2 - _p1).yx * vec2(+1.0, -1.0);
  e2.xy = normalize(_p0 - _p2).yx * vec2(+1.0, -1.0);

  e0.z = dot(e0.xy, _p0) - _smoothness;
  e1.z = dot(e1.xy, _p1) - _smoothness;
  e2.z = dot(e2.xy, _p2) - _smoothness;

  float a = max(0.0, dot(e0.xy, _st) - e0.z);
  float b = max(0.0, dot(e1.xy, _st) - e1.z);
  float c = max(0.0, dot(e2.xy, _st) - e2.z);

  return smoothstep(_smoothness * 2.0, 
                    1e-7, 
                    length(vec3(a, b, c)));
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec3 color = vec3( triangle(st, 
                              vec2(0.0,0.15), 
                              vec2(1.0,0.15), 
                              vec2(0.5,0.88), 
                              0.001) );

  gl_FragColor = vec4(color,1.0);
}