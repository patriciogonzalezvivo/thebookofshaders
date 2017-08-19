// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float random(vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }

vec2 tileFractal(vec2 st, int scale, int levels) {
    for (int i = 0; i < levels; i++){
        st *= float(scale);
        vec2 i_st = floor(st);
        st = fract(st*pow(2., floor(2.*random(i_st))) );
    }
    return st;
}

// vec2 tileFractal(vec2 st) {
//     st *= 4.;
//     vec2 i_st = floor(st);
//     st = fract(st*pow(2., floor(4.*random(i_st))) );
//     return st;
// }

float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 0.75;
    return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*3.14);
}

float box(vec2 st, vec2 size){
    size = vec2(0.5)-size*0.5;
    vec2 uv = smoothstep(size,size+vec2(1e-4),st);
    uv *= smoothstep(size,size+vec2(1e-4),vec2(1.0)-st);
    return uv.x*uv.y;
}

float shapeDF(vec2 st, int N){
    st = st *2.-1.;
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(N);
    return cos(floor(.5+a/r)*r-a)*length(st);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st = tileFractal(st,3,2);

   	float pct = 0.;
    pct = circle(st,.999);
   	// pct = box(st,vec2(.95));
    // pct = step(.15,1.-shapeDF(st.yx,6))-step(.3,1.-shapeDF(st.yx,6));

    // color.rg = st;
    color.rgb += vec3(1.)*pct;

    gl_FragColor = vec4(color,1.);
}
