#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float line( vec2 _st,
            vec2 _p1, vec2 _p2,
            float _width, float _spread){

    _width = 1.0 / _width;
    vec2 p2p1 = _p1 - _p2;
    vec2 p1p2 = -(p2p1);
    vec2 p2p = _st - _p2;
    vec2 p1p = _st - _p1;
    vec2 pp1 = -(p1p);
    vec2 pd = normalize(vec2(p2p1.y, -p2p1.x));
    float proj = dot(pd, pp1);
    float pr1 = dot(p2p1, p2p);
    float pr2 = dot(p1p2, p1p);

    if(pr1 > 0.0 && pr2 > 0.0) {
        return pow(1.0 / abs(proj * _width), _spread);
    } else {
        return 0.0;
    }
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3( line(st,
                            vec2(0.1),
                            vec2(0.9),
                            0.005, 3.0) );

    gl_FragColor = vec4(color,1.0);
}
