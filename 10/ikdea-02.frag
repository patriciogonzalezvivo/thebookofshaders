// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) { 
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= vec2(10.0,100.);

    vec2 ivec = floor(st);  // integer
    vec2 fvec = fract(st);  // fraction
    
    vec2 vel = floor(vec2(u_time*10.)); // time
    vel *= vec2(-1.,0.); // direction
    vel *= (step(1., mod(ivec.y,2.0))-0.5)*2.; 
    
    ivec += vel;

    // Assign a random value base on the integer coord
    vec3 color = vec3( step(.8,random( ivec ))); 

    // Un comment to see the subdivided grid
//     color = vec3(fvec,0.0);

    gl_FragColor = vec4(color,1.0);
}