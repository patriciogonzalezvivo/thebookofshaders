// By Nitcha Tothong ( nitchafa.me ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.5,0.5,0.5); 
vec3 colorB = vec3(1.0,0.7,0.4); 
vec3 colorC = vec3(0.0,0.15,0.2); 

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

// cosine based palette, 4 vec3 params by Iñigo Quílez
// http://www.iquilezles.org/www/articles/palettes/palettes.html
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
 
    // Move to + 
    st.x -= 0.40*u_time*0.6;
    
    vec3 color = palette(st.x,colorA, colorC, colorB, colorC)* 1.5;
    float f = fract(st.x*7.0);
    gl_FragColor = vec4(color,1.0);
}