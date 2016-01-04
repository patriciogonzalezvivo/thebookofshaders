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

// Reference to
// http://thndl.com/square-shaped-shaders.html

float drawRectAbs (vec2 pixel, vec2 center, vec2 size) {
  //vec2 t = vec2 (size.x , size.y);
  vec2 r = abs( pixel.xy - center.xy - size.xy / 2. );
  float sX = step(size.x/2., r.x );
  float sY = step(size.y/2., r.y );
  float s =  max( sX, sY ) ;
  return s;
}
float drawRectOutlineAbs (vec2 pixel, vec2 center, vec2 size, float thickness) {
  float s = drawRectAbs(pixel, center, size);
  s += (1. - drawRectAbs(pixel , center + thickness, size - (thickness * 2.) ));
  // s = step(.4, s) * step( s, .3);
  return s;
}

float drawPoly (vec2 pixel, vec2 center, float size, int sides) {

  pixel /= u_resolution.xy;
  center /= u_resolution.xy;
  pixel -= center;  
  pixel.x *= u_resolution.x/u_resolution.y;
  size /= u_resolution.y;
    // Angle and radius from the current pixel
  vec2 pos = pixel ;
  float a = atan(pos.x,pos.y)+PI ;
  float r = TWO_PI/float( sides) ;
  
  // Shaping function that modulate the distance
  float d = cos(floor(.5 +  a/r) * r - a ) * length(pixel );

  return 1.0 - smoothstep(size, size +.005, d)   ;
}
float drawPolyOutline (vec2 pixel, vec2 center, float size, int sides, float thickness) {
  pixel /= u_resolution.xy;
  center /= u_resolution.xy;
  pixel -= center;  
  pixel.x *= u_resolution.x/u_resolution.y;
  size /= u_resolution.y;
  thickness /= u_resolution.y;
    // Angle and radius from the current pixel
  vec2 pos = pixel ;
  float a = atan(pos.x,pos.y)+PI ;
  float r = TWO_PI/float( sides) ;
  
  // Shaping function that modulate the distance
  float d = cos(floor(.5 +  a/r) * r - a ) * length(pixel );
  return (smoothstep(size- thickness -.005, size-thickness, d) - smoothstep(size, size +.005, d)  )  ;
}
float drawCirclePixelOutline (vec2 pixel, vec2 center, float radius, float thickness) {
    float dist = length(center - pixel)  ;
    thickness /= radius;
    float antiAlias = 2./radius;
    dist = smoothstep (1. -thickness - antiAlias, 1.- thickness , dist / (radius)) - smoothstep ( 1.,1. + antiAlias, dist / (radius)) ;
    return dist;
}

float drawCircleRings (vec2 pixel, vec2 center, float radius, int count) {
  float spacing = 0.02;
  float dist = length(center - pixel)  ;
  float antiAlias = 2./radius;
  float thickness = 1./float(count) -spacing;
  float t = 0.;
  for(int i=0;i<count;++i)
  {
    //result += uLightsPos[i];
    float myThickness = thickness *  fract (abs ( sin(u_time*2. + float(i)/6. ) *  (cos(u_time/4.)) ) );
    float sI = max (thickness * float(i) , 0. ) + (spacing* float(i) );

    t += smoothstep ( sI - antiAlias, sI , dist / (radius)) - smoothstep ( sI+myThickness, sI+ myThickness + antiAlias, dist / (radius)) ;
  }
    return t;
}

void main(){
  
  vec3 color1 = vec3(1., 0.3, 0.5);
  vec3 color = vec3 (0.);
  
  float pct3 =  drawCircleRings(gl_FragCoord.xy, u_resolution.xy/2., 250. , 20);
  color = vec3 ( color1*pct3);

  gl_FragColor = vec4(color,1.0);
}