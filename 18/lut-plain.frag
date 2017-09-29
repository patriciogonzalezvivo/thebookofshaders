#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float size = 8.0;

void main(){
   vec2 st = gl_FragCoord.st/u_resolution.xy;
   vec3 color = vec3(.0);

   float red = fract(st.x*size);
   float green = fract((1.-st.y)*size);
   float blue = floor((1.-st.y)*size)/size;

   color = vec3(red,green,blue);

   gl_FragColor = vec4( color , 1.0);
}
