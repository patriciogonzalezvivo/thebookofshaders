#ifdef GL_ES
precision mediump float;
#endif


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

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
  vec3 color = vec3(0.0);
  float d = 1.0;

  // Remap the space to -1. to 1.
  st = (st *2.-1. );

  // Remap the coordinates with rotation using transformation matrix
  st = st * rotationMatrix(u_time/1.5);
  // Create secondary set of coordinates rotated in opposing direction
  vec2 st2 =  st * rotationMatrix(u_time * -2.);

  // Make the distance field - composite the different formulars together
  d =  length( abs(st2)- sin(u_time+ 0.5) +0.9 );
  d *= 1. - length( 1. - max(abs(st)-sin(u_time/1.),0.) ) ;
  d *= length( min(abs(st2)- sin((u_time/ 4.)), sin(u_time / 10. + 0.1)) );

  // Visualize the distance field
  gl_FragColor = vec4( clamp (fract(d* abs(sin(u_time/ 4.)) ), 0.6, 0.1)  , clamp(fract(d* abs(log(u_time/10.)) ), 0.9, 1.), clamp ( 1. -abs(cos(u_time)), 0.5, 1. ),  fract(d* abs(sin(u_time/ 4.)) ));

}