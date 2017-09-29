// Author @patriciogv - 2015
// Title: Matrix

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){ return fract(sin(x)*43758.5453); }
float random(in vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }

float randomChar(vec2 outer,vec2 inner){
    float grid = 5.;
    vec2 margin = vec2(.2,.05);
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    vec2 ipos = floor(inner*grid);
    vec2 fpos = fract(inner*grid);
    return step(.5,random(outer*64.+ipos)) * borders.x * borders.y * step(0.01,fpos.x) * step(0.01,fpos.y);
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;
    vec3 color = vec3(0.0);

    float rows = 1.0;
    // rows = 3.0;
    // rows = 12.0;
    // rows = 24.0;
    vec2 ipos = floor(st*rows);
    vec2 fpos = fract(st*rows);

    ipos += vec2(0.,floor(u_time*20.*random(ipos.x+1.)));

    float pct = 1.0;
    pct *= randomChar(ipos,fpos);
    // pct *= random(ipos);

    color = vec3(pct);

    gl_FragColor = vec4( color , 1.0);
}
