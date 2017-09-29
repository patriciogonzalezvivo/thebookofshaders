// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float noise (in float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(random(i), random(i + 1.0), u);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);

    vec2 grid = vec2(20.0,2.0);

    float t = u_time*max(grid.x,grid.y)*.5;

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    float offset = ipos.x+floor(t);
    float value = pow(noise(offset*0.2),2.)+noise(offset*0.9)*.5;

    if (mod(ipos.y,2.) == 0.) {
        fpos.y = 1.0-fpos.y;
    }
    color += step(fpos.y*1.5,value)*step(.5,fpos.x);

    gl_FragColor = vec4(color,1.0);
}
