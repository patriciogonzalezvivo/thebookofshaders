// Author: @patriciogv
// Title: CellularNoise

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(.0);
    
    // Scale 
    st *= 3.;
    
    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.;  // minimun distance
    
    for (int j= -1; j <= 1; j++) {
        for (int i= -1; i <= 1; i++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(i),float(j));
            
            // Random position from current + neighbor place in the grid
            vec2 offset = random2(i_st + neighbor);

			// Animate the offset
            offset = 0.5 + 0.5*sin(u_time + 6.2831*offset);
            
			// Position of the cell             
            vec2 pos = neighbor + offset - f_st;
            
            // Cell distance
            float dist = length(pos);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }

    // Draw the min distance (distance field)
    color += m_dist;

    // Draw cell center
    color += 1.-step(.02, m_dist);
    
    // Draw grid
    color.r += step(.98, f_st.x) + step(.98, f_st.y);
    
    // Show isolines
    // color -= step(.7,abs(sin(27.0*m_dist)))*.5;
    
    gl_FragColor = vec4(color,1.0);
}