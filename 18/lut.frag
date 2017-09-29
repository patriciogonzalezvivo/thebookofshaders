#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Author: Matt DesLauriers
// https://github.com/mattdesl/glsl-lut/blob/master/index.glsl
//
#define LUT_NO_CLAMP
#define LUT_FLIP_Y

vec4 lookup(in vec4 textureColor, in sampler2D lookupTable) {
    #ifndef LUT_NO_CLAMP
        textureColor = clamp(textureColor, 0.0, 1.0);
    #endif

    float blueColor = textureColor.b * 63.0;

    vec2 quad1 = vec2(0.0);
    quad1.y = floor(floor(blueColor) / 8.0);
    quad1.x = floor(blueColor) - (quad1.y * 8.0);

    vec2 quad2 = vec2(0.0);
    quad2.y = floor(ceil(blueColor) / 8.0);
    quad2.x = ceil(blueColor) - (quad2.y * 8.0);

    vec2 texPos1 = vec2(0.0);
    texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);
    texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);

    #ifdef LUT_FLIP_Y
        texPos1.y = 1.0-texPos1.y;
    #endif

    vec2 texPos2 = vec2(0.0);
    texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);
    texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);

    #ifdef LUT_FLIP_Y
        texPos2.y = 1.0-texPos2.y;
    #endif

    vec4 newColor1 = texture2D(lookupTable, texPos1);
    vec4 newColor2 = texture2D(lookupTable, texPos2);

    vec4 newColor = mix(newColor1, newColor2, fract(blueColor));
    return newColor;
}

void main(){
   vec2 st = gl_FragCoord.st/u_resolution.xy;
   vec4 srcColor = texture2D(u_tex0, st);
   vec3 dstcolor = lookup(srcColor,u_tex1).rgb;

   gl_FragColor = vec4( dstcolor , 1.0);
}
