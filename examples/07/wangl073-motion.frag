// By Luobin Wang ( @peterobbin ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265


float scope(float x, float y, float x2, float y2, float scale, float blurriness){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = 1.0 - distance(st,vec2(x, y)) * 2.0 * scale;
    pct = min(distance(st,vec2(x, y)),distance(st,vec2(x, y))) * scale;
    pct *= pow(1.0 - distance(st,vec2(x2, y2)), 4.0 * distance(st,vec2(x2, y2 ))) ;

    pct = smoothstep(0.2, 0.2 + blurriness , pct);
    return pct;
}

vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float sinT = sin(u_time * PI) * 0.5 + 0.5;
    float cosT = cos(u_time * PI) * 0.5 + 0.5;
    float sinC = sin(u_time * PI) * 0.2 + 0.2;
    float cosC = cos(u_time * PI) * 0.2 + 0.2;
    float sinC2 = sin(u_time * PI + 2.0) * 0.2 + 0.2;
    float cosC2 = cos(u_time * PI + 2.0) * 0.2 + 0.2;
    float sinC3 = sin(u_time * PI + 4.0) * 0.2 + 0.2;
    float cosC3 = cos(u_time * PI + 4.0) * 0.2 + 0.2;
    float sinBeat = smoothstep(0.7, 0.9, sin(u_time * PI) * 0.5 + 0.5);
    float cosBeat = smoothstep(0.7, 0.9, cos(u_time * PI) * 0.5 + 0.5);
    vec3 color = vec3(0.0);

    // a. The DISTANCE from the pixel to the center
    
    // b. The LENGTH of the vector 
    //    from the pixel to the center 
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector 
    //    from the pixel to the center 
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    
    vec3 circleMask = vec3(scope(sinC + 0.3 , cosC + 0.3 , cosC + 0.3 , sinC + 0.3 ,1.0 / sinT , 0.2 ));
    color = mix(color, vec3(0.5 + 0.5 , 0.0, 0.0), circleMask);

    vec3 circle2Mask = vec3(scope(sinC2 + 0.3 , cosC2 + 0.3 , cosC2 + 0.3 , sinC2 + 0.3 ,1.0 / sinT, 0.2 ));
    vec3 colorC2 = mix(color, vec3(0.0 , 1.0, 0.0), circle2Mask);
    color += colorC2;

    vec3 circle3Mask = vec3(scope(sinC3 + 0.3 , cosC3 + 0.3 , cosC3 + 0.3 , sinC3 + 0.3 ,1.0 / sinT, 0.2 ));
    vec3 colorC3 = mix(color, vec3(0.0 , 0.0, 1.0), circle3Mask);
    color += colorC3;


    gl_FragColor = vec4( color, 1.0 );
}