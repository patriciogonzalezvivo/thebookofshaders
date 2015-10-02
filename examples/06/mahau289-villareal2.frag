// By Udit Mahajan ( uditmahajan.com / @mahajan_udit ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

// Inspired on Leo Villareal work

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorTopBot = vec3(0.91,0.5,0.24); //91%  5% 24%
vec3 colorOne = vec3(1.);//44% 41% 99%
vec3 colorTwo = vec3(.55, .18, .36);//55% 18% 26%
vec3 colorThree = vec3(.06, .15, .55); //46% 15% 15%
vec3 colorFour = vec3(.03, .2, .59);// 39% 20% 19%

//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

float plot1(vec2 st, float pct){
  return  step( pct-0.02, st.x) - 
          step( pct+0.02, st.x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = pcurve(st.x, 1., 1.);
    
     float lines = step(0.25,sin(st.x*(3.14)*23.0));
    
    float y1 = pcurve(st.x, abs(sin(u_time/2.)), 1.);
    float y2 = pcurve(st.x, abs(cos(u_time/5.))*10., 1.);
    float y3= pcurve(st.x, abs(sin(u_time/7.))*5., 1.);
    float y4= pcurve(st.x, abs(mod(u_time/17., 10.))*5., 1.);

    vec3 color = vec3(1.);
    
    float pct = plot1(st,y);
    
    color = mix(color, colorTopBot, y);
    color = mix(color, colorTwo, y1);
    color = mix(color, colorThree, y2);
    color = mix(color, colorFour, y3);
    
    color = mix(color, colorOne, lines);
    
    gl_FragColor = vec4(color,1.0);
}