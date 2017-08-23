// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 colorA = texture2D(u_tex0,st).rgb;
    vec3 colorB = texture2D(u_tex1,st).rgb;

    vec3 color = abs(colorA-colorB);

    gl_FragColor = vec4(color,1.0);
}
