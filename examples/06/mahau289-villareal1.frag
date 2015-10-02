// By Udit Mahajan ( uditmahajan.com / @mahajan_udit ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

// Inspired on Leo Villareal work

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorYellow = vec3(.98,0.87,0.30); // 98% 87% 30%
vec3 colorPink = vec3(0.95, .41, .87);// 95% 41% 87%
vec3 colorTopBot = vec3(0.91,0.05,0.24); //91%  5% 24%
vec3 colorWhite = vec3(1., .94, 1.);//100% 94% 100%

//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float x = pcurve(st.x-0.5,5.,1.0);
    float x2 = pcurve(.5-st.x,5.,1.0);
    float y = pcurve(st.y,1.,1.0);
    float y2 = pcurve(.4-st.y,0.2+abs(sin(u_time/20.))*5.,1.0);
    float y3 = pcurve(.4-st.y,0.7+abs(sin(u_time/10.))*4.,1.0);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = mix(colorTopBot, colorYellow, y);
    
    color = mix(color, colorPink, y2);
    
    color = mix(color, colorWhite, y3);
    
    color = mix(color, colorTopBot, x);
    
    color = mix(color, colorTopBot, x2);
//     color = (1.-pct)*color;

    gl_FragColor = vec4(color,1.0);
}