#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float hatch ( sampler2D hatchmap, vec2 st,float brighness ){
    float col = floor((1.0-brighness)*9.0)/3.;
    float row = floor(brighness*3.0)/3.;
    return texture2D(hatchmap,vec2(col,row)+st/3.).a;
}

void main(){
   vec2 st = gl_FragCoord.st/u_resolution.xy;
   float b = st.x;
   vec3 color = vec3(1.0);
   color -= hatch(u_tex0,st,b).a;
   gl_FragColor = vec4(color,1.);
}
