// By Regina Flores Mir ( http://www.reginafloresmir.com )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

//NOTE FUNCTION ONLY WORKS FOR N < 20
//THEN IT TURNS INTO A CIRCLE
float geomFun(int n, vec2 st){
    
    // Number of sides of your shape
    int N = n;
    
    // Angle and radius from the current pixel
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(N);
    
    // Shaping function that modulate the distance
    //Uncomment these to try different ones
    
    //   float d = cos(floor(.5+a/r)*r-a)*length(st);
    //   float d = cos(floor(.5+a/r)*r-a)* length( abs(st)-.3 );
    //   float d = cos(floor(.5+a/r)*r-a)*length( max(abs(st)-.3,0.) );
    float d = cos(floor(.5+a/r)*r-a)*length( min(abs(st)-.4,0.) );
    
    
    return d;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    float d = 0.0;
    
    // Remap the space to -1. to 1.
    st = st *2.-1.;
    
    float myfun = geomFun(5, st);
    color = vec3(1.0-smoothstep(.4,.41, myfun));
    // color = vec3(d);
    
    gl_FragColor = vec4(color,1.0);
}