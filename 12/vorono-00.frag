// Author: @patriciogv
// Title: 4 cells voronoi

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(.0);

    // Cell positions
    vec2 cell[5];
    cell[0] = vec2(0.83,0.75);
    cell[1] = vec2(0.60,0.07);
    cell[2] = vec2(0.28,0.64);
    cell[3] =  vec2(0.31,0.26);
    cell[4] = u_mouse/u_resolution;
    
    float m_dist = 1.;  // minimun distance
    vec2 m_pos;        // minimum position

    // Iterate through the cells positions
    for (int i = 0; i < 5; i++) {
        float dist = distance(st, cell[i]);
        if ( dist < m_dist ) {
            // Keep the closer distance
            m_dist = dist;

            // Kepp the position of the closer cell
            m_pos = cell[i];
        }
    }

    // Add distance field to closest cell center 
    color += m_dist;

    // tint acording the closest cell position
    color.rg = m_pos;
    
    // Show isolines
    color *= abs(sin(90.0*m_dist));
    
    // Draw cell center
    color += 1.-step(.02, m_dist);
    
    gl_FragColor = vec4(color,1.0);
}