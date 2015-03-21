// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    // Right & Bottom 
    vec2 rgBt = step(vec2(0.1),st); 
    float pct = rgBt.x * rgBt.y;

    // Left & top 
//     vec2 lfTp = step(vec2(0.1),1.0-st);
//     pct *= lfTp.x * lfTp.y;
    
    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}