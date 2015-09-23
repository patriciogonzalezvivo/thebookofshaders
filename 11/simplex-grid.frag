// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Squew the grid
vec2 simplex (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

// Colorize the three corners acroding to witch one of the triangles is
vec3 simplex3DGrid(vec2 p){
    vec3 pos = vec3(0.0);
    p = fract(simplex(p));
    if (p.x>p.y) { // Lower or...
        pos.xy = 1.0-vec2(p.x,p.y-p.x);
        pos.z = p.y;
    } else { // upper triangle
        pos.yz = 1.0-vec2(p.x-p.y,p.y);
        pos.x = p.x;
    }
    return fract(pos);
}

// cubic curve to animate
float pulse(float x, float p, float w) {
    x = abs(x - p);
    if( x>w ) return 0.0;
    x /= w;
    return 1.0 - x*x*(3.0-2.0*x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // Scale the space to see the grid
    st *= 4.;   

    // Diferent grids
    vec3 regularGrid = vec3(fract(st),0.);
    vec3 skewGrid = vec3(fract(simplex(st)),0.);
    vec3 simplexGrid = simplex3DGrid(st);

    // Animate the transition
    vec3 color = vec3(1.0);
    float t = (1.0+sin(u_time*3.1415*.05))*.5;
    color = mix(color, regularGrid, pulse(t,.0,.5));
    color = mix(color, skewGrid, pulse(t,.5,.5));
    color = mix(color, simplexGrid, pulse(t,1.,.5));

    gl_FragColor = vec4(color,1.0);
}