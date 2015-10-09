// By Si Ping Lim ( http://www.handson.sg )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
mat2 rotationMatrix( float angle)
{
    return mat2( cos( angle ), -sin( angle ),
               sin( angle ),  cos( angle ));
}
float drawGear (vec2 pixel, vec2 center, float radius , float teethHeight ) {
    vec2 pos = (center-pixel)  ;
    float r = length( pos ) * 1.;
    float a = atan(pos.y , pos.x)  ;
    float noOfPoints = 9. ;

    float f = smoothstep(-.5, 1., cos(a * noOfPoints ))* teethHeight + radius - teethHeight;

    float color =  1.-smoothstep(f, f+2., r) ;
    return color;
}

float drawGearOutline (vec2 pixel, vec2 center, float radius , float teethHeight) {
    vec2 pos = (center-pixel)  ;
    float r = length( pos ) * 1.;
    float a = atan(pos.y , pos.x) + u_time ;
    float noOfPoints = 9. ;

    float f = smoothstep(-.5, 1., cos(a * noOfPoints ))* (teethHeight) + radius-teethHeight;

    float color =  smoothstep(f+2., f, r) - smoothstep(f, f-2., r) ;
    return color;
}
float drawCirclePixelDot(vec2 pixel, vec2 center, float radius){
    vec2 l = pixel-center;
    return smoothstep(1., 0.95, dot(l/radius,l/radius) );
}
float drawHollowGear (vec2 pixel, vec2 center, float radius , float teethHeight, float hollowWidth) {
    float t = drawGear ( pixel,  center,  radius ,  teethHeight);
    float c = drawCirclePixelDot ( pixel,  center,  hollowWidth);
    return t-c;
}
//included rect function to draw a rext to make sure size of gear is correct
vec3 drawRect (vec2 pixel, float x, float y, float width, float height) {
    vec4 thickness = vec4(x,y, u_resolution.x - x - width,  u_resolution.y - y - height);
    vec4 coors = vec4( pixel.x, pixel.y, u_resolution.x-pixel.x, u_resolution.y-pixel.y);
    vec4 returnV = step ( thickness, coors ) ;
    returnV = clamp(returnV, 0., 1.);
    return vec3( returnV.x * returnV.y * returnV.z * returnV.w);
}

void main(){
    vec3 color1 = vec3(1., 0.3, 0.5);
    vec3 color2 = vec3(0., 0.3, 1.);
    vec3 color3 = vec3(0.8, 0.3, 1.);

    vec3 color = vec3(0.0);

    vec2 gear1Position = vec2(350., 200.);
     vec2 rotatedPoint = (gl_FragCoord.xy - gear1Position)  * rotationMatrix(u_time*-1.);
    rotatedPoint += gear1Position;
    float gear = drawGear(rotatedPoint, gear1Position , 100., 20. );

    vec2 gear2Position = vec2(170., 135.);
    vec2 rotatedPoint2 = (gl_FragCoord.xy - gear2Position)  * rotationMatrix(u_time);
    rotatedPoint2 += gear2Position;
    float hollowGear = drawHollowGear(rotatedPoint2, gear2Position , 100., 20., 70. );

    float gearOutline = drawGearOutline(gl_FragCoord.xy, vec2(150., 400.) , 50., 20.);

    vec3 rect = drawRect (gl_FragCoord.xy, 150., 400., 50., 50.);
    color = color1*vec3(gear) + color2* vec3(gearOutline) ;
    color += color3 * hollowGear;

    // debug rect to make sure gear's size matches
    // color += color3 * rect;

    gl_FragColor = vec4(color, 1.0);
}