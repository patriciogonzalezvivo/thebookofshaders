#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float PI = 3.1415926535897932384626433832795;
float PI180 = float(PI / 180.0);

float sind (float a) {
    return sin(a * PI180);
}

float cosd (float a) {
    return cos(a * PI180);
}

float added (vec2 sh, float sa, float ca, vec2 c, float d) {
    return 0.5 + 0.25 * cos((sh.x * sa + sh.y * ca + c.x) * d) + 0.25 * cos((sh.x * ca - sh.y * sa + c.y) * d);
}

void main () {

    float threshold = clamp(0.5, 0.0, 1.0);

    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    if (st.x > 0.5) {
        // Halftone dot matrix shader
        // @author Tomek Augustyn 2010

        // Ported from my old PixelBender experiment
        // https://github.com/og2t/HiSlope/blob/master/src/hislope/pbk/fx/halftone/Halftone.pbk
        float ratio = u_resolution.y / u_resolution.x;

        vec2 dstCoord = vec2(st.x-0.5, st.y*0.5)*2.0;
        vec2 srcCoord = vec2(st.x-0.5, st.y*0.5)*2.0;
        vec2 rotationCenter = vec2(0.5);
        vec2 shift = dstCoord - rotationCenter;

        float dotSize = 5.0;
        float angle = 45.0;

        float rasterPattern = added(shift, sind(angle), cosd(angle), rotationCenter, PI / dotSize * 680.0);
        vec4 srcPixel = texture2D(u_tex0, srcCoord);

        float avg = 0.2125 * srcPixel.r + 0.7154 * srcPixel.g + 0.0721 * srcPixel.b;
        float gray = (rasterPattern * threshold + avg - threshold) / (1.0 - threshold);

        // uncomment to see how the raster pattern looks
        // gray = rasterPattern;

        gl_FragColor = vec4(gray, gray, gray, 1.0);
    } else {
        st = vec2(st.x,st.y*0.5)*2.0;
        gl_FragColor = texture2D(u_tex0, st);
    }



}
