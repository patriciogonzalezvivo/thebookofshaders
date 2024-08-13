
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy / u_resolution;

    st = st * 2.0 - 1.0;
    st.x -= 0.5;

    const float iterations_max = 15.0;
    float iterations = mod(u_time, iterations_max);
    vec2 uv = st;

    for (float i = 0.0; i < iterations_max; i++) {
        if (i >= iterations)
            break;

        if (length(uv) > 2.0) 
            break;

	    uv = vec2(  uv.x*uv.x - uv.y*uv.y, 
                    2.0 * uv.x*uv.y) + st;

        // uv = mat2(uv.x, uv.y, -uv.y, uv.x) * uv + st;

        color++;
    }

    color /= iterations_max;
    
    gl_FragColor = vec4(color, 1.0);
}
