// By Si Ping Lim ( http://www.handson.sg )
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// rotation transformation matrix
mat2 rotationMatrix( float angle)
{
    return mat2( cos( angle ), -sin( angle ),
               sin( angle ),  cos( angle ));
}
float plot1 (float x){
    float t = abs( sin( x / (0.5 ) ) * 0.27 / 0.89 ) * 0.78; 
    return t;
}
float drawPolyOutline (vec2 _pixel, vec2 _center, float _size, int _sides, float _thickness, float _rotation) {
  _pixel /= u_resolution.xy;
  _center /= u_resolution.xy;
  _pixel -= _center;  
  _pixel.x *= u_resolution.x/u_resolution.y;
  _size /= u_resolution.y;
  _thickness /= u_resolution.y;
    // Angle and radius from the current pixel
  vec2 pos = _pixel ;
  float a = atan(pos.x,pos.y)+PI + _rotation;
  float r = TWO_PI/float( _sides) ;
  
  // Shaping function that modulate the distance
  float d = cos(floor(.5 +  a/r) * r - a ) * length(_pixel );
  return (smoothstep(_size- _thickness -.005, _size-_thickness, d) - smoothstep(_size, _size +.005, d)  )  ;
}

void main(  )
{
    // default background colour
    gl_FragColor = vec4(0.0,0.0,0.,1.0);

    float mouseModifier = 1. - length( u_mouse.xy - u_resolution.xy/2.  )/u_resolution.x;
    
    // start with a circle in the middle of the screen
    float noOfCircles = 40.0 + sin(u_time/4.)* 20.;
    float angleToRotate = 360. / (noOfCircles ) * PI / 180. ;


    vec2 circleCentre = vec2(u_resolution.xy) * 0.5;
    float angle = u_time * 1.0;   
    float radius = u_resolution.y * 0.5;
    float angleSign = 1.0; // which way round the circle is going
    float width = .1; // how thick the lines are

     
    vec3 c = vec3(0);
    float baseSize = ( u_resolution.x*.3 - (u_resolution.x*.03 * noOfCircles/10.) );
    for(float i = 0.0; i < noOfCircles; ++i)
    {
        // set the start x of this object, added mouse modifier to apply effects, and shaping function to animate the position,
        // technically y position can be set to 0, cause the final xy is calculated by using the transformation matrix with the angle of rotation. Since the angle increase with each step, the positions will differ item to item
        float goX =  baseSize  * mouseModifier + plot1(abs ((u_time/2. ) -0.1* i))* 400. ;

        //Generate a random value to use;
        float w = fract((sin(goX*7.0+31.0*goX + 0.01*u_time))*13.545317);
        //define the Angle that will be used to translate frag.xy to position required to create a ring of objects
        float goA = (5.* mouseModifier) * angleToRotate * i + sin(u_time )- u_time/2. ;
        // define the virtual xy of the object by transforming it by using the rotationMatrix, add back mid point of screen cause rotation matrix origin is always 0,0
        vec2 newPos = vec2( goX ,00.) * rotationMatrix(goA) +  u_resolution.xy * .5;
        //apply some shaping function to the size, limit transformation from 1 to 0.5 so it doesn't totally disapper
        float size = smoothstep (1., .5, abs( cos(u_time/2. + i/6.) ));
        float polyDist = drawPolyOutline(gl_FragCoord.xy, newPos , baseSize*size, 7, width , u_time );
        vec3 dotC = vec3(cos(goA), sin(angle+TWO_PI), sin(radius*TWO_PI ))*0.5+0.5 + w * .4;
        c += vec3(polyDist * dotC);
    

    }
    gl_FragColor += vec4 (c, 1.);
}