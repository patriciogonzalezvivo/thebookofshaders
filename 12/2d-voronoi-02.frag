#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

#define ANIMATE
vec3 voronoi( in vec2 x, float rnd ) {

    vec2 n = floor(x);
    vec2 f = fract(x);

    // first pass: regular voronoi
    vec2 mg = vec2(0.0);
    vec2 mr = vec2(0.0);
    float md = 8.0;
    for (int j=-1; j<=1; j++ ) {
        for (int i=-1; i<=1; i++ ) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = random2( n + g )*rnd;
            #ifdef ANIMATE
            o = 0.5 + 0.5*sin( u_time + 6.2831*o );
            #endif  
            vec2 r = g + o - f;
            float d = dot(r,r);

            if( d<md ) {
                md = d;
                mr = r;
                mg = g;
            }
        }
    }
    return vec3( md, mr );
    // // second pass: distance to borders
    // md = 8.0;
    // for (int j=-2; j<=2; j++ ) {
    //     for (int i=-2; i<=2; i++ ) {
    //         vec2 g = mg + vec2(float(i),float(j));
    //         vec2 o = random2(n + g)*rnd;
    //         #ifdef ANIMATE
    //         o = 0.5 + 0.5*sin( u_time + 6.2831*o );
    //         #endif  
    //         vec2 r = g + o - f;

    //         if( dot(mr-r,mr-r)>0.00001 )
    //         md = min( md, dot( 0.5*(mr+r), normalize(r-mr) ) );
    //     }
    // }
    // return vec3( md, mr );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    float d = dot(st-.5,st-.5);
    vec3 c = voronoi( 10.*st, 1.);//pow(d,.4) );

    // isolines
    color = c.x*(0.5 + 0.5*sin(64.0*c.x))*vec3(1.0);
    // borders  
    color = mix( vec3(1.0), color, smoothstep( 0.01, 0.02, c.x ) );
    // feature points
    // float dd = length( c.yz );
    // color += vec3(1.)*(1.0-smoothstep( 0.0, 0.1, dd));

    gl_FragColor = vec4(color,1.0);
}