// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;
                
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float randomChar(in vec2 outer,in vec2 inner){
    float grid = 5.;
    vec2 margin = vec2(.2,.05);
    float seed = 23.;
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    return step(.5,random(outer*seed+floor(inner*grid))) * borders.x * borders.y;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;
    vec3 color = vec3(0.0);

    float rows = 24.0;
    vec2 ipos = floor(st*rows);
    ipos += vec2(.0,floor(u_time*20.*random(ipos.x+1.)));

    vec2 fpos = fract(st*rows);
    vec2 center = (.5-fpos);

    float pct = random(ipos);
    float glow = (1.-dot(center,center)*3.)*2.0;

    color = vec3(0.643,0.851,0.690) * ( randomChar(ipos,fpos) * pct );
    color +=  vec3(0.027,0.180,0.063) * pct * glow;

    gl_FragColor = vec4( color , 1.0);
}