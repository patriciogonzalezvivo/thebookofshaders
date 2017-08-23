// Author @patriciogv - 2015
// Title: DeFrag

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    st *= vec2(100.0,50.);

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 vel = floor(vec2(u_time*10.)); // time
    vel *= vec2(-1.,0.); // direction

    vel *= (step(1., mod(ipos.y,2.0))-0.5)*2.; // Oposite directions
    vel *= random(ipos.y); // random speed

    // Move
    ipos += floor(vel);
    // Assign a random value base on the integer coord

    float pct = 1.0;
    pct *= random(ipos);
    pct *= step(.1,fpos.x)*step(.1,fpos.y); // margin
    pct = step(0.001+u_mouse.x/u_resolution.x,pct); // threshold

    gl_FragColor = vec4(vec3(pct),1.0);
}
