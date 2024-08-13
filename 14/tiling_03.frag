
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#define PI 3.14159265358979323846

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy / u_resolution;

    const float iterations_max = 8.0;
    float iterations = mod(u_time, iterations_max);
    
    for (float i = 0.0; i < iterations_max; i++) {
        if (i >= iterations)
            break;

        st *= 2.0;
        vec2 st_i = floor(st);
        st = fract(st);

        //  Give each cell an index number
        //  according to its position
        float index = 0.0;
        index += step(1., mod(st_i.x,2.0));
        index += step(1., mod(st_i.y,2.0))*2.0;

        //      |
        //  2   |   3
        //      |
        //--------------
        //      |
        //  0   |   1
        //      |

        // Rotate each cell according to the index
        if (index == 0.0)
            st = rotate2D(st, PI*-0.5);
        else if (index == 1.0)
            st = st.yx;
        else if (index == 2.0)
            st = st;
        else if (index == 3.0)
            st = rotate2D(st, PI*0.5);

        if (index < 2.0) {
            color = vec3(step(st.x,st.y));
            break;
        }
    }

    gl_FragColor = vec4(color, 1.0);
}
