
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;


#define PI 3.14159265358979323846

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

    const float iterations_max = 9.0;
    float iterations = mod(u_time, iterations_max);

    st -= 0.5;
    st /= iterations * 0.25;
    st += 0.5;

    for (float i = 0.0; i < iterations_max; i++) {
        if (i >= iterations)
            break;

        st = rotate2D(st, PI * 0.5);
        st *= 2.0;
        vec2 st_i = floor(st);
        st = fract(st);

        float index = 0.0;
        index += mod(st_i.x, 2.0);
        index += mod(st_i.y, 2.0)*2.0;

        if (index == 2.) {
            color = vec3(step(length(1.0-st), 1.0) * (1.0-i/iterations));
            break;
        }

    }

    gl_FragColor = vec4(color, 1.0);
}
