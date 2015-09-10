#ifdef GL_ES
precision mediump float;
#endif
                
uniform vec2 u_resolution;
uniform float u_time;

float random(in vec2 st){ return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453); }

vec2 tileFractal(vec2 st) {
	vec2 f = fract(st);
    vec2 i = floor(st);
    
    return fract(st*pow(2.,floor(random(i)*5.)));
}

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

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

	st *= 3.;
    st = tileFractal(st);
    
   	float pct = 0.;
    pct = circle(st,.999);
   	// pct = box(st,vec2(.95));

    color.rg = st;
    color.rgb = vec3(1.)*pct;

    gl_FragColor = vec4(color,1.);
}