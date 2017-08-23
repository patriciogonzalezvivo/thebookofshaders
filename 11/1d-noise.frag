// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

float random (in float x) {
    return fract(sin(x)*1e4);
}

float noise (in float x) {
    float i = floor(x);
    float f = fract(x);

    // Cubic Hermine Curve
    float u = f * f * (3.0 - 2.0 * f);

    return mix(random(i), random(i + 1.0), u);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    float y = 0.0;
    // y = random(st.x*0.001+u_time);
    y = noise(st.x*3.+u_time);

    // color = vec3(y);
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}
