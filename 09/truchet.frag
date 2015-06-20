// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D (vec2 _st, float _angle) {
  _st -= 0.5;
  _st =  mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

vec2 tile (vec2 _st, float _zoom) {
  _st *= _zoom;
  return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){
    _st *= 2.0;

    float index = 0.0;    
    if (fract(_st.x * 0.5) > 0.5){
        index += 1.0;
    }
    if (fract(_st.y * 0.5) > 0.5){
        index += 2.0;
    }

    _st = fract(_st);

    if(index == 1.0){
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        _st = rotate2D(_st,PI);
    }

    return _st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,3.0);
    st = rotateTilePattern(st);
    // st = tile(st,3.0);
    // st = rotate2D(st,-PI*u_time*0.25);

    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);  
    // step(st.x,st.y) just makes a b&w triangles
    // but you can use what ever design you want.  
}