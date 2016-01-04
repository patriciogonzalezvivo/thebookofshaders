// By Udit Mahajan ( uditmahajan.com / @mahajan_udit ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

// Clockwork Orange

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.3, 0.5)-st;
    vec2 pos2 = vec2(0.3, 0.5)-st;

    float r = length(pos)*2.0*(2.);
    float a = atan(pos.y,pos.x)+u_time;
    
    float r2 = length(pos2)*4.0;
    float a2 = atan(pos2.y,pos2.x);

    float f = cos(a*8.);
//     float f2 = cos(a2);
//     f = abs(cos(a*3.));
//     f = abs(cos(a*2.5))*.5+.3;
//     f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    f = smoothstep(-.5,1., cos(a*15.))*0.2+0.5;
    
    
    
    color = vec3( (1.-smoothstep(f,f+0.02,r))/1.,(1.-smoothstep(f,f+0.02,r))/1.,(1.-smoothstep(f,f+0.02,r) )/1.);
    color += vec3(.01, 0.5, 0.9);
//     color += vec3(step(.2,r2)/1.,step(.2,r2)/3.,step(.2,r2)/3.);
    color -= vec3(2.*(smoothstep(.2,.22,r2)/1.-smoothstep(.3,.32,r2)/1.));
//     color *= (vec3(step(.2,r2)/1.));

    gl_FragColor = vec4(1.-color, 1.0);
}