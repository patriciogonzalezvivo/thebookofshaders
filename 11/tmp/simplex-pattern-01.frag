// Author @patriciogv - 2015 - patriciogonzalezvivo.com

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 skew (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

vec3 simplexGrid (vec2 st) {
    vec3 xyz = vec3(0.0);

    vec2 p = fract(skew(st));
    if (p.x > p.y) {
        xyz.xy = 1.0-vec2(p.x,p.y-p.x);
        xyz.z = p.y;
    } else {
        xyz.zx = 1.-vec2(p.x-p.y,p.y);
        xyz.y = p.x;
    }

    return fract(xyz);
}

// Antialiazed Step function
// from http://webstaff.itn.liu.se/~stegu/webglshadertutorial/shadertutorial.html
float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
  float afwidth = 0.7 * length(vec2(dFdx(value), dFdy(value)));
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
  return step(threshold, value);
  #endif
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    float t = u_time*2.;

    // Scale the space to see the grid
    st *= 1.733;
    st *= 2.;
    vec3 S = simplexGrid(st*3.);
    S.z += (S.x*S.y)*(0.5);

    // color = S;
    color += step(.5,abs(sin(.5-S.b*3.1415*5.-t)));

    gl_FragColor = vec4(color,1.0);
}
