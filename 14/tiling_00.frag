
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
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

        float v = random(st_i * 1.4);

        if (v > 0.5) {
            color = vec3(v);
            break;
        }
    }

    gl_FragColor = vec4(color, 1.0);
}
