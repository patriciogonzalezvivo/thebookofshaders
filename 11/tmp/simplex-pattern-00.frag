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
        // xyz.yz = 1.0-vec2(p.x-p.y,p.y);
        // xyz.x = p.x;
        xyz.zx = 1.-vec2(p.x-p.y,p.y);
        xyz.y = p.x;
    }

    return fract(xyz);
}

vec3 starS (vec3 S) {
    S += max(dot(S.xxx,S.zzz),max(dot(S.yyy,S.xxx),dot(S.yyy,S.zzz)));
    return S;
}

vec3 sakuraS (vec3 S) {
    return S + min(dot(S.xxx,S.zzz),min(dot(S.yyy,S.xxx),dot(S.yyy,S.zzz)));
}

float warpDF (vec3 S) {
    return dot(S.xy,S.yx);
}

float circleDF (vec3 S) {
    return dot(S,S);
}

float triangleDF (vec3 S) {
    S -= 1.04;
    return abs(min(dot(S.zz,S.yy),min(dot(S.zz,S.xx),dot(S.xx,S.yy))));
}

float lotusDF (vec3 S, float petals_size, float roundness) {
    S = 1.-(S)*petals_size; // above 1.
    S = pow(S,vec3(roundness));
    S = max(starS(S),sakuraS(S));
    return 1.0-fract(triangleDF(S));
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
    float t = smoothstep(0.,1.,abs(sin(u_time*0.4)));

    // Scale the space to see the grid
    st *= 1.733;
    st *= 2.;
    vec3 S = simplexGrid(st);

    // Triangles
    // ------------
    // color += aastep(t,triangleDF(S));
    // color += aastep(0.5,triangleDF(smoothstep(vec3(.3,.3,.7),vec3(1.),S)));
    // color += aastep(0.99,triangleDF(pow(S,vec3(3.,3.,1.))));
    // color += aastep(1.,triangleDF(S*20.));
    // color += aastep(0.1,triangleDF(S*5.+dot(S,S)));
    // color += aastep(t*.5,triangleDF(sakuraS(S)));
    // color += aastep(-.1t*.2,triangleDF(starS(S)) );
    // color += aastep(t,triangleDF(sakuraS(starS(S))));
    color += aastep(t,triangleDF(starS(sakuraS(S))));

    // Warp
    // color += aastep(t,warpDF(sakuraS(S)));
    // color += aastep(t,warpDF(starS(S)));

    // Lotus
    // -------------
    // color += aastep(.5,lotusDF(S,2.12,0.001+t*0.6));
    // color += aastep(.5,lotusDF(S,3.,.1+t*.1));
    // color += aastep(.5,lotusDF(S,3.,.3+t*.2));
    // color += aastep(.5,lotusDF(S,5.,.1+t*.1));
    // color += aastep(.5,lotusDF(S,12.,.0001+t*.04));



    gl_FragColor = vec4(color,1.0);
}
