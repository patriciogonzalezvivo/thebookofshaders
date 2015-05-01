// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float angle, float b){
    float scale = 10.0;
    pos *= scale;
    pos = rotate2d( angle ) * pos;
    return smoothstep(0.0,
                    0.5+b*0.5,
                    abs((sin(pos.x*3.1415)+b*2.0))*0.5);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(st*5.0);

    float pattern = pos.x;

    // Stripes
    // pattern = lines(pos*0.1, 0.0, 0.5 ); 

    // Add noise
    // pattern = lines(pos, noise(pos), 0.5 );

    // Strech the noise pattern 
    //pattern = lines(pos, noise(pos*vec2(2.,0.5)),0.5);

    color = mix(vec3(0.275,0.145,0.059),
                vec3(0.761,0.529,0.239),
                pattern*1.7);

    gl_FragColor = vec4(color,1.0);
}