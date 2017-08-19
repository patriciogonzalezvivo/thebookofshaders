// Author @patriciogv - 2015
// Title: Wave

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123); }

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);

    vec2 grid = vec2(100.0,2.0);

    float t = u_time*max(grid.x,grid.y);

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    float value = random(floor(ipos.x+t));

    if (mod(ipos.y,2.) == 0.) {
        fpos = 1.0-fpos;
    }
    color += step(fpos.y*1.5,value);

    gl_FragColor = vec4(color,1.0);
}
