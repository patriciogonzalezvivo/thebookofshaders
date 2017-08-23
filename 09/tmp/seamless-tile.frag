// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 tile (vec2 st, float _zoom) {
    st *= _zoom;
    return fract(st);
}

vec2 seamlessTile(vec2 st){
    st *= 2.0;
    float index = 0.0;
    index += step(1., mod(st.x,2.0));
    index += step(1., mod(st.y,2.0))*2.0;
    st = fract(st);
    if(index == 1.0){
        st.x = 1.0-st.x;
    } else if(index == 2.0){
        st.y = 1.0-st.y;
    } else if(index == 3.0){
        st = 1.0-st;
    }
    return st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st = tile(st,1.0);
    st = seamlessTile(st);


    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    gl_FragColor = vec4(vec3(step(st.x,st.y)),1.0);
}
