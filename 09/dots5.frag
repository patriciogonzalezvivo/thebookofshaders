// Author @patriciogv ( patricio.io ) - 2015
// Title: Nina Warmerdam ( www.behance.net/ninawarmerdam )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st, float zoom){
    st *= zoom;
    return fract(st);
}

float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 0.75;
    return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*3.14);
}

float circlePattern(vec2 st, float radius) {
    return  circle(st+vec2(0.,-.5), radius)+
            circle(st+vec2(0.,.5), radius)+
            circle(st+vec2(-.5,0.), radius)+
            circle(st+vec2(.5,0.), radius);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 grid1 = tile(st,7.);
    grid1 = tile(st + vec2(cos(u_time),sin(u_time))*0.01,7.);
    color += mix(vec3(0.075,0.114,0.329),vec3(0.973,0.843,0.675),circlePattern(grid1,0.23)-circlePattern(grid1,0.01));

    vec2 grid2 = tile(st,3.);
    grid2 = tile(st + vec2(cos(u_time),sin(u_time))*0.02 ,3.);
    color = mix(color, vec3(0.761,0.247,0.102), circlePattern(grid2,0.2)) - circlePattern(grid2,0.05),

    gl_FragColor = vec4(color,1.0);
}
