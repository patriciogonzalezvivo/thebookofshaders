// By Si Ping Lim ( http://www.handson.sg )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//shaping function from wk 2 assignment
float plot2( float pct){
     float t = (abs( sin( (pct +0.666) / 0.125 ) * 0.449 / 1.144 ) * 0.647 * 0.921 + ((fract( pct ) * 0.845)));
    return t;
}

float drawCirclePixel (vec2 pixel, vec2 center, float radius) {
    float dist = length(center - pixel)  ;
    dist = smoothstep (1.,0.97, dist / (radius));
    return dist;
}

vec3 drawComp1 (vec2 pixel) {
    vec3 color1 = vec3(1., 0.3, 0.5);
    vec3 color2 = vec3(0., 0.3, 1.);

    float pulse = sin(u_time);
    float pulse2 = plot2(u_time/ 10.);
    
    float circ1 = drawCirclePixel(pixel.xy , vec2 (80.,60.) , 60. - (30.*pulse) );

    float circ2 = drawCirclePixel(pixel.xy , vec2 (u_mouse.xy) , 40. + (80.* pulse2));
    vec3 color = vec3(circ1)*color1 + vec3(circ2)* color2;
    return color;
}
vec3 drawComp2 (vec2 pixel) {
    vec3 color1 = vec3(1., 0.3, 0.5);
    vec3 color2 = vec3(0., 0.3, 1.);

    float pulse = sin(u_time);
    
    float circ1 = drawCirclePixel(pixel.xy , vec2 (250.,250.) , 60. + (30.*pulse) );
    float circ1Mask = drawCirclePixel(pixel.xy , vec2 (250.,250.) , 48. +(30.*pulse));

    float circ2 = drawCirclePixel(pixel.xy , vec2 (u_mouse.xy) , 80. );
    float circ2Mask = drawCirclePixel(pixel.xy , vec2 (u_mouse.xy) , 68. );

    float circ3 = drawCirclePixel(pixel.xy , vec2 (160.,270.) , 80. );
    float circ3Mask = drawCirclePixel(pixel.xy , vec2 (160.,270.) , 68. );

    vec3 color = vec3 (clamp( circ1 + circ2 + circ3, 0., 1. )  -  clamp ( circ1Mask + circ2Mask + circ3Mask, 0.,1.) );
    return color * color1;
}
void main(){
   

    vec3 color = drawComp2(gl_FragCoord.xy);

    gl_FragColor = vec4( color, 1.0 );
}