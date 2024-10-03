
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

float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy / u_resolution;

    const float iterations_max = 8.0;
    float iterations = mod(u_time, iterations_max);
    
    float width = 0.005;
    for (float i = 0.0; i < iterations_max; i++) {
        if (i >= iterations)
            break;

        vec2 st_i = floor(st);
        st = fract(st);

        //  Give each cell an index number
        //  according to its position
        float index = 0.0;
        index += step(1., mod(st_i.x,2.0));
        index += step(1., mod(st_i.y,2.0))*2.0;

        // Rotate each cell according to the index
        vec2 uv = st; 

        if (index == 3.0) {
            color = vec3(stroke(length(uv), 1.0 - width, width, 0.01));
            break;
        }

        st *= 2.0;
        st = rotate2D(st, PI * -0.5);
        width *= 2.0;
    }

    gl_FragColor = vec4(color, 1.0);
}
