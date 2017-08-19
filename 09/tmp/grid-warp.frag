// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

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
    st.y *= u_resolution.y/u_resolution.x;

    vec2 xy = st-vec2(.5);
    float grid = 1.0-X(tile(xy,10.+20.0*dot(xy,xy)),0.05);

    gl_FragColor = vec4(vec3(grid),1.0);
}
