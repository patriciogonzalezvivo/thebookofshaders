// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float boxDF(vec2 st, float size) {
    st = st*2.-1.;
    return length(max(abs(st)-size,.0));
}

float box(vec2 st, float size, float radio) {
    radio = max(radio,.000001);
    return 1.-step(radio,boxDF(st,size-radio));
}

float cross(vec2 st, float radio) {
    float size = .25;
    size *= (1.0-radio*2.);
    return  box(st,size,radio) +
            box(st+vec2(.0,size*(1.0-radio*2.)),size,min(radio,size)) +
            box(st+vec2(.0,-size*(1.0-radio*2.)),size,min(radio,size)) +
            box(st+vec2(size*(1.0-radio*2.),.0),size,min(radio,size)) +
            box(st+vec2(-size*(1.0-radio*2.),.0),size,min(radio,size));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    st -= vec2(0.5);
    st = rotate2d( sin(u_time)*PI ) * st;
    st += vec2(0.5);

    // Add the shape on the foreground
    color += cross(st,(1.0-abs(sin(u_time)))*.5);

    gl_FragColor = vec4(color,1.0);
}
