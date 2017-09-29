#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

vec3 random3(vec3 c) {
    float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
    vec3 r;
    r.z = fract(512.0*j);
    j *= .125;
    r.x = fract(512.0*j);
    j *= .125;
    r.y = fract(512.0*j);
    return r-0.5;
}

const float F3 =  0.3333333;
const float G3 =  0.1666667;
float snoise(vec3 p) {
    vec3 s = floor(p + dot(p, vec3(F3)));
    vec3 x = p - s + dot(s, vec3(G3));
    vec3 e = step(vec3(0.0), x - x.yzx);
    vec3 i1 = e*(1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy*(1.0 - e);
    vec3 x1 = x - i1 + G3;
    vec3 x2 = x - i2 + 2.0*G3;
    vec3 x3 = x - 1.0 + 3.0*G3;
    vec4 w, d;
    w.x = dot(x, x);
    w.y = dot(x1, x1);
    w.z = dot(x2, x2);
    w.w = dot(x3, x3);
    w = max(0.6 - w, 0.0);
    d.x = dot(random3(s), x);
    d.y = dot(random3(s + i1), x1);
    d.z = dot(random3(s + i2), x2);
    d.w = dot(random3(s + 1.0), x3);
    w *= w;
    w *= w;
    d *= w;
    return dot(d, vec4(52.0));
}

//  Author: Matt DesLauriers
//  https://github.com/mattdesl/glsl-film-grain/blob/master/index.glsl
//
float grain(vec2 texCoord, vec2 resolution, float frame, float multiplier) {
    vec2 mult = texCoord * resolution;
    float offset = snoise(vec3(mult / multiplier, frame));
    float n1 = snoise(vec3(mult, offset));
    return n1 / 2.0 + 0.5;
}

float grain(vec2 texCoord, vec2 resolution, float frame) {
    return grain(texCoord, resolution, frame, 2.5);
}

float grain(vec2 texCoord, vec2 resolution) {
    return grain(texCoord, resolution, 0.0);
}

//  Author: Hugh Kennedy
//  https://github.com/hughsk/glsl-luma/blob/master/index.glsl
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}

//  Author: Matt DesLauriers
//  https://github.com/mattdesl/glsl-blend-soft-light/blob/master/index.glsl
vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
        sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend),
        2.0 * base * blend + base * base * (1.0 - 2.0 * blend),
        step(base, vec3(0.5))
    );
}

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = texture2D(u_tex0,st).rgb;
    vec3 grain = vec3( grain(st,u_resolution/7.) );

    color = blendSoftLight(color,grain);

    float luminance = luma(color);
    color = vec3(luminance);

    gl_FragColor = vec4(color,1.0);
}
