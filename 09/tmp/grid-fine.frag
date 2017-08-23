// Author @patriciogv - 2015 - patricio.io

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

bool grid(vec2 _pos, float _res){
    vec2 grid = fract(_pos*_res*250.);
    return grid.x < _res || grid.y < _res;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy-vec2(.5);
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);

    if(grid(st,0.01)) color += vec3(0.25);
    if(grid(st,0.1)) color += vec3(0.15);

    gl_FragColor = vec4(color,1.0);
}
