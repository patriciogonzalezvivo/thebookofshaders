// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647693
#define PHI 1.618033988749894848204586834

uniform vec2 u_resolution;
uniform float u_time;

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float X(vec2 _st, float _width){
    float pct0 = smoothstep(_st.x-_width,_st.x,_st.y);
    pct0 *= 1.-smoothstep(_st.x,_st.x+_width,_st.y);

    float pct1 = smoothstep(_st.x-_width,_st.x,1.0-_st.y);
    pct1 *= 1.-smoothstep(_st.x,_st.x+_width,1.0-_st.y);

    return pct0+pct1;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = tile(st,10.0);

    vec3 color = vec3(X(st,0.03));

    gl_FragColor = vec4(color,1.0);
}
