// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex;
uniform vec2 u_resolution;
uniform float u_time;

float random(in float x){ return fract(sin(x)*43758.5453); }
float random(in vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }

float noise(in vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm( in vec2 p ){
    float s = 0.0;
    float m = 0.0;
    float a = 0.5;
    for(int i=0; i<2; i++ ){
        s += a * noise(p);
        m += a;
        a *= 0.5;
        p *= 2.0;
    }
    return s/m;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    float aspect = u_resolution.x/u_resolution.y;

    vec2 grain_st = st-.5;
    float grain = 0.0;
    grain = mix(1., 0.9, dot(grain_st,grain_st) + (fbm(gl_FragCoord.xy*0.6)*0.1) );

    // Random blocks
    vec2 blocks_st = floor(st*vec2(5.*random(floor(u_time*10.)),10.*(1.+random(floor(u_time*3.))) ));
    float t = u_time*2.+random(blocks_st);
    float time_i = floor(t);
    float time_f = fract(t);
    float block = step(0.9,random(blocks_st+time_i))*(1.0-time_f);
    vec2 offset = vec2(block*0.01,block*0.005)+(1.0-grain)*.08;

    vec4 color = vec4(1.);
    color.r = texture2D(u_tex,st+offset).r;
    color.g = texture2D(u_tex,st).r;
    color.b = texture2D(u_tex,st-offset).r;

    color.a = max(texture2D(u_tex,st+offset).a,max(texture2D(u_tex,st).a, texture2D(u_tex,st-offset).a));

    if (block > .5) {
        color.rgb = abs(block*grain-color.rgb);
    }

    color.rgb *= 0.4+sin((st.y*3.1415+u_time)*500.);

    gl_FragColor = color;
}
