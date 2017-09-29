// Author @patriciogv - 2015 - patricio.io

#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535897932384626433832795;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float stripes(vec2 st){
    st = rotate2d( PI*-0.25 ) * st*10.;
    return step(.5,1.0-smoothstep(.3,1.,abs(sin(st.x*PI))));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(stripes(st));
    gl_FragColor = vec4(color, 1.0);
}
