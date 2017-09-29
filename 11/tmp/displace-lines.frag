// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    // Other corners
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec3 nNoise(vec2 st) {
    vec2 offset = vec2(1.)/u_resolution.xy;
    float center     = snoise(vec2(st.x, st.y));
    float topLeft    = snoise(vec2(st.x - offset.x, st.y - offset.y));
    float left       = snoise(vec2(st.x - offset.x, st.y));
    float bottomLeft = snoise(vec2(st.x - offset.x, st.y + offset.y));
    float top        = snoise(vec2(st.x, st.y - offset.y));
    float bottom     = snoise(vec2(st.x, st.y + offset.y));
    float topRight   = snoise(vec2(st.x + offset.x, st.y - offset.y));
    float right      = snoise(vec2(st.x + offset.x, st.y));
    float bottomRight= snoise(vec2(st.x + offset.x, st.y + offset.y));

    float dX = topRight + 2.0 * right + bottomRight - topLeft - 2.0 * left - bottomLeft;
    float dY = bottomLeft + 2.0 * bottom + bottomRight - topLeft - 2.0 * top - topRight;

    return normalize(vec3( dX, dY, 0.01))*.5+.5;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    float scale = 10.0;
    st *= scale;

    st += nNoise(st).xy*.1*sin(u_time);
    float df = sin(fract(st.y)*10.);

    gl_FragColor= vec4(vec3(1.0-smoothstep(.9,.99,df)),1.);
}
