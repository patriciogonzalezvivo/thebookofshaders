// By Camila Gernhardt Nakamura ( camilanakamura.com  )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// gestalt!! star and flower :)
// unintentionally it goes with the beat of this song https://www.youtube.com/watch?v=ggiyRLrH4AA

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(0.0);

    vec2 pos = (vec2(0.5)-st);

    float r = length(pos)*3.0;
    float a = atan(pos.y,pos.x);

    float f = smoothstep(-.5,1., (cos(a*10.))*0.2*10.)+0.5 * (0.5- sin(a*5.)) * fract(u_time);

    color = vec3( 1.-smoothstep(f,f+0.02,r) );

    gl_FragColor = vec4(color, 1.0);
}