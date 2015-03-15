#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random (in float _x) {
    return fract(sin(_x)*1e4);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec3 _p) {
    const vec3 step = vec3(110.0, 241.0, 171.0);

    vec3 i = floor(_p);
    vec3 f = fract(_p);
 
    // For performance, compute the base input to a 
    // 1D random from the integer part of the 
    // argument and the incremental change to the 
    // 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix( mix(mix(random(n + dot(step, vec3(0,0,0))),
                        random(n + dot(step, vec3(1,0,0))),
                        u.x),
                    mix(random(n + dot(step, vec3(0,1,0))),
                        random(n + dot(step, vec3(1,1,0))),
                        u.x), 
                u.y),
                mix(mix(random(n + dot(step, vec3(0,0,1))),
                        random(n + dot(step, vec3(1,0,1))),
                        u.x),
                    mix(random(n + dot(step, vec3(0,1,1))),
                        random(n + dot(step, vec3(1,1,1))),
                        u.x),
                u.y),
            u.z);
}

#define NUM_OCTAVES 5

float fbm ( in vec3 _p) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_p);
        _p = _p * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pos = vec3(st*5.0,u_time*0.1);

    float noise = noise(pos);
    float fbm = fbm(pos);

    color = vec3( mix(noise, fbm, abs(sin(u_time))));

    gl_FragColor = vec4(color,1.0);
}