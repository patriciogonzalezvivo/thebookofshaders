// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 10.0;

    vec2 ivec = floor(st);  // integer
    vec2 fvec = fract(st);  // fraction

    // Assign a random value base on the integer coord
    vec3 color = vec3(random( ivec )); 

    // Un comment to see the subdivided grid
    // color = vec3(fvec,0.0);

    gl_FragColor = vec4(color,1.0);
}