// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) {
    return fract(sin(x)*1e4);
}

float random (in vec2 st) { 
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 color = vec3(0.0);

    float t = u_time*24.*2.;

    vec2 grid = vec2(2.0,50.0);
    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    float value = random(floor(ipos.y+t));// * pow(smoothstep(0.,.2,(1.0-ipos.y/grid.y)),.9)*mix((0.5+ipos.y/grid.y),1.0,1.0-ipos.y/grid.y) ;

    if (ipos.x == 0.) {
        fpos = 1.0-fpos;
    }
    color += step(fpos.x*1.5,value);

    gl_FragColor = vec4(color,1.0);
}