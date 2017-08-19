#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Robert Penner's easing functions in GLSL
// https://github.com/stackgl/glsl-easings
float linear(float t) {
    return t;
}

float exponentialIn(float t) {
    return t == 0.0 ? t : pow(2.0, 10.0 * (t - 1.0));
}

float exponentialOut(float t) {
    return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);
}

float exponentialInOut(float t) {
    return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
        ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

float sineIn(float t) {
    return sin((t - 1.0) * HALF_PI) + 1.0;
}

float sineOut(float t) {
    return sin(t * HALF_PI);
}

float sineInOut(float t) {
    return -0.5 * (cos(PI * t) - 1.0);
}

float qinticIn(float t) {
    return pow(t, 5.0);
}

float qinticOut(float t) {
    return 1.0 - (pow(t - 1.0, 5.0));
}

float qinticInOut(float t) {
    return t < 0.5
        ? +16.0 * pow(t, 5.0)
        : -0.5 * pow(2.0 * t - 2.0, 5.0) + 1.0;
}

float quarticIn(float t) {
    return pow(t, 4.0);
}

float quarticOut(float t) {
    return pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

float quarticInOut(float t) {
    return t < 0.5
        ? +8.0 * pow(t, 4.0)
        : -8.0 * pow(t - 1.0, 4.0) + 1.0;
}

float quadraticInOut(float t) {
    float p = 2.0 * t * t;
    return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
}

float quadraticIn(float t) {
    return t * t;
}

float quadraticOut(float t) {
    return -t * (t - 2.0);
}

float cubicIn(float t) {
    return t * t * t;
}

float cubicOut(float t) {
    float f = t - 1.0;
    return f * f * f + 1.0;
}

float cubicInOut(float t) {
    return t < 0.5
        ? 4.0 * t * t * t
        : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}

float elasticIn(float t) {
    return sin(13.0 * t * HALF_PI) * pow(2.0, 10.0 * (t - 1.0));
}

float elasticOut(float t) {
    return sin(-13.0 * (t + 1.0) * HALF_PI) * pow(2.0, -10.0 * t) + 1.0;
}

float elasticInOut(float t) {
    return t < 0.5
        ? 0.5 * sin(+13.0 * HALF_PI * 2.0 * t) * pow(2.0, 10.0 * (2.0 * t - 1.0))
        : 0.5 * sin(-13.0 * HALF_PI * ((2.0 * t - 1.0) + 1.0)) * pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}

float circularIn(float t) {
    return 1.0 - sqrt(1.0 - t * t);
}

float circularOut(float t) {
    return sqrt((2.0 - t) * t);
}

float circularInOut(float t) {
    return t < 0.5
        ? 0.5 * (1.0 - sqrt(1.0 - 4.0 * t * t))
        : 0.5 * (sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
}

float bounceOut(float t) {
    const float a = 4.0 / 11.0;
    const float b = 8.0 / 11.0;
    const float c = 9.0 / 10.0;

    const float ca = 4356.0 / 361.0;
    const float cb = 35442.0 / 1805.0;
    const float cc = 16061.0 / 1805.0;

    float t2 = t * t;

    return t < a
    ? 7.5625 * t2
    : t < b
        ? 9.075 * t2 - 9.9 * t + 3.4
        : t < c
            ? ca * t2 - cb * t + cc
            : 10.8 * t * t - 20.52 * t + 10.72;
}

float bounceIn(float t) {
    return 1.0 - bounceOut(1.0 - t);
}

float bounceInOut(float t) {
    return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}

float backIn(float t) {
    return pow(t, 3.0) - t * sin(t * PI);
}

float backOut(float t) {
    float f = 1.0 - t;
    return 1.0 - (pow(f, 3.0) - f * sin(f * PI));
}

float backInOut(float t) {
    float f = t < 0.5
    ? 2.0 * t
    : 1.0 - (2.0 * t - 1.0);

    float g = pow(f, 3.0) - f * sin(f * PI);

    return t < 0.5
    ? 0.5 * g
    : 0.5 * (1.0 - g) + 0.5;
}

float plot(vec2 st, float pct){
    return  smoothstep( pct-0.02, pct, st.y) -
            smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = st.x;

    y = linear(st.x);

    // y = exponentialIn(st.x);
    // y = exponentialOut(st.x);
    // y = exponentialInOut(st.x);

    // y = sineIn(st.x);
    // y = sineOut(st.x);
    // y = sineInOut(st.x);

    // y = qinticIn(st.x);
    // y = qinticOut(st.x);
    // y = qinticInOut(st.x);

    // y = quarticIn(st.x);
    // y = quarticOut(st.x);
    // y = quarticInOut(st.x);

    // y = cubicIn(st.x);
    // y = cubicOut(st.x);
    // y = cubicInOut(st.x);

    // y = elasticIn(st.x);
    // y = elasticOut(st.x);
    // y = elasticInOut(st.x);

    // y = circularIn(st.x);
    // y = circularOut(st.x);
    // y = circularInOut(st.x);

    // y = bounceIn(st.x);
    // y = bounceOut(st.x);
    // y = bounceInOut(st.x);

    // y = backIn(st.x);
    // y = backOut(st.x);
    // y = backInOut(st.x);

    vec3 color = vec3(y);
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    gl_FragColor = vec4(color,1.0);
}
