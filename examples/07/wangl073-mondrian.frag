// By Luobin Wang ( @peterobbin ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265
float sinT = sin(u_time) * 0.1;
float cosT = cos(u_time) * 0.1;

vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

vec3 tunnel(float x, float y, float w, float h, float r, float g, float b){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float horizonal = step(x ,st.x) - step(x + w, st.x); 
    float vertical = step( y ,st.y) - step(y + h , st.y);
    vec3 color = rgbNormalizer(vec3(r,g,b)) * horizonal * vertical;

    return color; 
}

vec3 rectMask(float x, float y, float w, float h, float a){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float horizonal = step(x ,st.x) - step(x + w, st.x); 
    float vertical = step( y ,st.y) - step(y + h , st.y);
    vec3 color = vec3(a) * horizonal * vertical;

    return color; 
}

void main(){

    float sinT2 = sin(u_time+ PI) * 0.1 ;
    float cosT2 = cos(u_time+ PI) * 0.1 ;
    vec3 color = vec3(0.0);

    //bg
    color = mix(color, vec3(1.0), rectMask(0.0, 0.0, 1.0, 1.0, 1.0));

    //color
    color = mix(color, vec3(0.8 , sinT * 10.0, cosT * 10.0), rectMask(0.2 + sinT, 0.2 + sinT, 0.8 - sinT, 0.8 - sinT, 1.0));//red
    color = mix(color, vec3(sinT * 10.0 , cosT * 10.0, 0.8), rectMask(0.0, 0.0, 0.2 + sinT, 0.2 + sinT, 1.0));//blue
    color = mix(color, vec3(0.9, 0.9 , sinT * 10.0 ), rectMask(0.9, 0.0, 0.1, 0.1 + sinT * 0.5, 1.0));//yellow

    //frames
    color = mix(color, vec3(0.0), rectMask(0.0, 0.2 + sinT, 1.0, 0.02, 1.0)); // x structure
    color = mix(color, vec3(0.0), rectMask(0.2 + sinT, 0.0, 0.02, 1.0, 1.0));// y structure

    color = mix(color, vec3(0.0), rectMask(0.9, 0.0, 0.02, 0.2 + sinT, 1.0));
    color = mix(color, vec3(0.0), rectMask(0.9, 0.1 + sinT * 0.5, 0.1, 0.02, 1.0));
    color = mix(color, vec3(0.0), rectMask(0.0, 0.7, 0.2 + sinT, 0.02, 1.0));


    gl_FragColor = vec4(color,1.0);
}