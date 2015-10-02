// By Luobin Wang ( @peterobbin ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

// Inspired on Leo Villareal work

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359


float easeInOutQuint(float t, float b, float c, float d) {
    t /= d/2.0;
    if (t < 1.0) return c/2.0*t*t*t*t*t + b;
    t -= 2.0;
    return c/2.0*(t*t*t*t*t + 2.0) + b;
}

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}
        
vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.y);
    vec3 colorWhite = rgbNormalizer(vec3(141.0, 122.0, 79.0));
    vec3 colorBlue = rgbNormalizer(vec3(200.0, 100.0, 100.0));
    float cosT = cos(u_time * 0.05 ) * 2.0 ;
    float sinT = sin(u_time * 0.05 ) * 2.0 ;

    vec2 toCenter = vec2(0.5) - st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter) * 2.0;


   
	color = mix(color,rgbNormalizer(vec3(2.0,6.0,89.0)), 1.0);

	float frameBlack = sin(radius*PI*9.0)* 0.2 + 0.8;
	color = mix(color,rgbNormalizer(vec3(4.0,13.0,191.0)), frameBlack);

	float frameV = smoothstep(0.6, 0.0, abs(sin(radius*PI* 0.2 - sinT * 2.0)));
	vec3 colorV = mix(color,rgbNormalizer(vec3(108.0,41.0,41.0)), frameV);
    color += colorV;

	float frameV2 = smoothstep(0.6, 0.0, abs(sin(radius*PI* 0.1 - 2.0 - sinT * 2.0))) ;
	vec3 colorV2 = mix(color,rgbNormalizer(vec3(178.0,156.0,233.0)), frameV2);
    color += colorV2;

    
  



    gl_FragColor = vec4(color,1.0);
}