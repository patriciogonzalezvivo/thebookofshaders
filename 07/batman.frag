// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (float y, float pct){
  return  smoothstep( pct-0.01, pct, y) -
          smoothstep( pct, pct+0.01, y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.y *= u_resolution.y/u_resolution.x;
    vec3 color = vec3(.0);
    float pct = .0;

    float shape = 1.0-distance(st*vec2(1.,2.)-vec2(0.,.5),vec2(.5));

    pct = shape;
    pct = min(pct, distance(st,vec2(0.5,0.76))*10.);
    pct = min(pct, distance(st,vec2(0.36,0.71))*5.);
    pct = min(pct, distance(st,vec2(0.64,0.71))*5.);
    pct = min(pct, distance(st,vec2(0.36,0.20))*4.*pow(1.-st.y,shape*1.1));
    pct = min(pct, distance(st,vec2(0.64,0.20))*4.*pow(1.-st.y,shape*1.1));

    color = vec3(pct);

    color += vec3(1.,1.,.0)*plot(pct,0.5+smoothstep(-1.,2.,sin(u_time))*.1);


    gl_FragColor = vec4( color, 1.0 );
}
