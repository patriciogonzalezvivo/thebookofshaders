// Author: @patriciogv
// Title: Simple Voronoi

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
    st *= 5.;
    
    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 10.;  // minimun distance
    vec2 m_pos;         // minimum position
    
    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 cell = vec2(float(i),float(j));
            vec2 offset = random2(i_st + cell);

            offset = 0.5 + 0.5*sin(u_time + 6.2831*offset);
            
            vec2 pos = cell + offset - f_st;
            float dist = length(pos);

            if( dist < m_dist ) {
                m_dist = dist;
                m_pos = offset;
            }
            
        }
    }

    // Assign a color using the closest cell position
    color += dot(m_pos,vec2(.3,.6));
    
    // Add distance field to closest cell center 
    // color.g = m_dist;

    // Show isolines
    // color *= abs(sin(40.0*m_dist));
    
    // Draw cell center
    color += 1.-step(.05, m_dist);
    
    // Draw grid
    color.r += step(.98, f_st.x) + step(.98, f_st.y);
    
    gl_FragColor = vec4(color,1.0);
}