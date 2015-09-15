// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float box(vec2 st, vec2 size){
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

vec2 direction(float t) {
    return vec2(0.25)-floor(1.0+vec2(cos(t*3.1415),sin(t*3.1415)))*.5;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;

    float t = u_time;

    vec2 now = direction(fract(t*.25));
    vec2 next = direction(fract(t*.25)+.125);
    vec2 offset = mix(now,next,fract(t));

    vec3 color = vec3(0.0);
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    color = vec3(box(f_st+offset,vec2(.5)));

    if (mod(i_st.x,2.) == mod(i_st.y,2.)) {
        color = 1.0-color;
    }

    gl_FragColor = vec4(color,1.0);
}