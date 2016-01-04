// By Hang Do Thi Duc ( http://22-8miles.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 rect (float w, float h, float s, float x, float y){
    float sth = s * 0.5;
    float l = 0.5 - w*0.5;
    float hor = smoothstep(l, l + sth, x);
    float r = 0.5 + w*0.5;
    hor -= smoothstep(r - sth, r, x);
    float b = 0.5 - h*0.5;
    float ver = smoothstep(b, b + sth, y);
    float t = 0.5 + h*0.5;
    ver -= smoothstep(t - sth, t, y);
    return vec3(hor * ver);
}

vec3 rectOutl (float w, float h, float border, float x, float y){
    //border relative to width and height
    // border = w * h * 0.5 * border;
    float hor = step(0.5 - w*0.5, x);
    hor -= step(0.5 - w*0.5 + border, x);
    hor += step(0.5 + w*0.5 - border, x);
    hor -= step( 0.5 + w*0.5, x);
    hor *= step(0.5 - h*0.5, y) - step(0.5 + h*0.5, y);
    float ver = step(0.5 - h*0.5, y);
    ver -= step(0.5 - h*0.5 + border, y);
    ver += step( 0.5 + h*0.5 - border, y);
    ver -= step( 0.5 + h*0.5, y);
    ver *= step(0.5 - w*0.5, x) - step(0.5 + w*0.5, x);
    return vec3(hor + ver);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(1.);

    vec3 colorA = rect(0.1, 0.6, 0., st.x - 0.5, st.y - 0.45);
    colorA = mix(vec3(0.), vec3(0.,.3,.9), colorA);
    colorA += rectOutl(0.1, 0.6, 0.02, st.x - 0.5, st.y - 0.45);

    vec3 colorB = rect(0.4, 0.8, 0., st.x - 0.5, st.y + 0.8);
    colorB = mix(vec3(0.), vec3(.9,.7,.2), colorB);
    colorB += rectOutl(0.4, 0.8, 0.02, st.x - 0.5, st.y + 0.8);

    vec3 colorC = rect(0.6, 0.6, 0., st.x + 0.5, st.y - 0.45);
    colorC = mix(vec3(0.), vec3(.3,.9,.9), colorC);
    colorC += rectOutl(0.6, 0.6, 0.02, st.x + 0.5, st.y - 0.45);

    vec3 rects = rectOutl(0.75, 1.6, 0.02, st.x - 0.02, st.y);
    rects += rectOutl(1.2, 0.7, 0.02, st.x, st.y + 0.07);
    rects += rectOutl(0.4, .94, 0.02, st.x + 0.02, st.y - 0.05);
    rects += rectOutl(0.34, 0.77, 0.02, st.x - 0.33, st.y + 0.22);

    color = rects + colorA + colorB + colorC;

    color = 1. - color;
    gl_FragColor = vec4(color, 1.0);
}