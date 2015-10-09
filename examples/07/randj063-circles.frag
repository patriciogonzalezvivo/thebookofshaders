// By Jaskirat Randhawa ( http://jaskirat.me/ ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle ( float posX, float posY, float rad){
    vec2 st = gl_FragCoord.xy/u_resolution;
    // st -=.5;
    st.x -=posX;
    st.y -=posY;
    float pct = 1. - length(st)*2.;
    rad = 1./rad;
    pct = fract(pct*3.);
    pct = step(.988,pct);
    
    return pct;
}

void main(){
    
    vec3 color = vec3(0.0);   
    float c1 = circle( .5,.5,1.1);
    c1 += circle( sin(u_time)/2.+.5, cos(u_time)/2.+.5,1.1);
    c1 += circle( sin(u_time+5.)/2.+.5, cos(u_time+5.)/2.+.5,1.1);
    

    color = vec3(c1);
    gl_FragColor = vec4(color,1.0);
}