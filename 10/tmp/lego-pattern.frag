// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

float circle(vec2 _st, float _radius){
  vec2 pos = vec2(0.5)-_st;
  _radius *= 0.75;
  return 1.-smoothstep(_radius-(_radius*0.01),_radius+(_radius*0.01),dot(pos,pos)*3.14);
}

float box(vec2 _st, vec2 _size){
  _size = vec2(0.5)-_size*0.5;
  vec2 uv = smoothstep(_size-vec2(0.0001),_size,_st);
  uv *= smoothstep(_size-vec2(0.0001),_size,vec2(1.0)-_st);
  return uv.x*uv.y;
}

vec3 pattern(inout vec2 st){
    st *= 5.0;
    st.x += u_time*0.5;
    vec3 normal = vec3(0.0);

    vec2 ivec = floor(st);  // integer
    vec2 fvec = fract(st);  // fraction

    vec2 pos = fvec;
    float index = random(ivec);

    if(index > 0.5){
      normal.x = step(0.5,pos.y)*2.-1.;
      normal *= (1.0-vec3(box(fvec,vec2(1.0,0.95))));
    } else {
      normal.y = step(0.5,pos.x)*2.-1.;
      normal *= (1.0-vec3(box(fvec,vec2(0.95,1.))));
    }

    st = fvec;
    return normal;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 normal = pattern(st);

    st = tile(st,2.);

    vec2 pos = st-0.5;
    float a = atan(pos.y,pos.x);
    
    normal += vec3(cos(a),sin(a),0.)*circle(st,0.4);
    normal *= 1.0-circle(st,0.26);
    normal.b = 1.0;

    gl_FragColor = vec4(normal*0.5+0.5,1.0);
}