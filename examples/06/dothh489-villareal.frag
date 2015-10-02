// By  Hang Do Thi Duc ( http://22-8miles.com)
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

// Inspired on this work https://vimeo.com/119302847 by Leo Villareal 

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;




void main() {
    vec3 magenta = vec3(0.909, 0.061, 0.982);
    vec3 blue = vec3(0.050, 0.000, 0.600);
    vec3 white = vec3(1.0);
    vec3 interference = vec3(1.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = magenta;
    vec3 pct = vec3(st.y);
    float sinU = abs(sin(u_time * 0.3));
    float cosU = abs(cos(u_time * 0.1));

    float fff = pow(sin(st.y * 9. * smoothstep(0.8, 0.4, st.y) + sinU + cosU), 5.);
    // added 1. for no black
    interference = vec3(fff, fff, 1.);

    color = mix(interference, blue, sinU);
    color = mix(color, magenta, pow(sin(st.y), 5.) + 0.5);
    // add more blue
    color = mix(color, blue, clamp(sinU + .2, .5, 1.));


    float vert = pow(sin(st.x * PI - PI * 0.53), 10.);
    float hor = pow(sin(st.y * PI - PI * 0.5), 30.);
    color = mix(color, white, vert);
    color = mix(color, white, hor);

    gl_FragColor = vec4(color,1.0);
}