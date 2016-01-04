// By Hang Do Thi Duc ( http://22-8miles.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);


    float f = abs(cos(a*12. + sin(u_time * 0.2))*sin(a*3. + cos(u_time * 0.3)))*.8+.1;
    float b = 1.-smoothstep( f, f+0.2, sin(r * 2.));

    color = vec3( b );

    gl_FragColor = vec4(color, 1.0);
}