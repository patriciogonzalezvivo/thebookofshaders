// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4);}
float random (in vec2 st) { return fract(1e4 * sin(17.0 * st.x + st.y * 0.1) * (0.1 + abs(sin(st.y * 13.0 + st.x)))); }

float binChar (vec2 ipos, float n) {
    float remain = mod(n,33554432.);
    for (float i = 0.0; i < 15.0; i++) {
        if ( floor(i/3.) == ipos.y && mod(i,3.) == ipos.x ) {
            return step(1.0,mod(remain,2.));
        }
        remain = ceil(remain/2.);
    }
    return 0.0;
}

float char (vec2 st, float n) {
    st.x = st.x*2.-0.5;
    st.y = st.y*1.2-0.1;

    vec2 grid = vec2(3.,5.);

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    n = floor(mod(n,10.));
    float digit = 0.0;
    if (n < 1. ) { digit = 31600.; }
    else if (n < 2. ) { digit = 9363.0; }
    else if (n < 3. ) { digit = 31184.0; }
    else if (n < 4. ) { digit = 31208.0; }
    else if (n < 5. ) { digit = 23525.0; }
    else if (n < 6. ) { digit = 29672.0; }
    else if (n < 7. ) { digit = 29680.0; }
    else if (n < 8. ) { digit = 31013.0; }
    else if (n < 9. ) { digit = 31728.0; }
    else if (n < 10. ) { digit = 31717.0; }
    float pct = binChar(ipos, digit);

    vec2 borders = vec2(1.);
    // borders *= step(0.01,fpos.x) * step(0.01,fpos.y);   // inner
    borders *= step(0.0,st)*step(0.0,1.-st);            // outer

    return step(.5,1.0-pct) * borders.x * borders.y;
}

float binBar (vec2 ipos, float n) {
    float remain = mod(n,128.);
    for(float i = 0.0; i < 8.0; i++){
        if ( mod(i,10.) == ipos.x ) {
            return step(1.0,mod(remain,2.));
        }
        remain = ceil(remain/2.);
    }
    return 0.0;
}

// Standard UPC-E Barcode reference from
// https://en.wikipedia.org/wiki/Universal_Product_Code
float bar (vec2 st, float n, bool L) {
    vec2 grid = vec2(7.,1.);

    if (L) { st = 1.0-st; }

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);
    n = floor(mod(n,10.));
    float digit = 0.0;
    if (n < 1. ) { digit = 114.; }
    else if (n < 2. ) { digit = 102.0; }
    else if (n < 3. ) { digit = 108.0; }
    else if (n < 4. ) { digit = 66.0; }
    else if (n < 5. ) { digit = 92.0; }
    else if (n < 6. ) { digit = 78.0; }
    else if (n < 7. ) { digit = 80.0; }
    else if (n < 8. ) { digit = 68.0; }
    else if (n < 9. ) { digit = 72.0; }
    else if (n < 10. ) { digit = 116.0; }
    float pct = binBar(ipos, digit+1.);

    if (L) { pct = 1.-pct; }

    return step(.5,pct);
}

float bar (vec2 st, float n) {
    return bar(st,n,true);
}

float barStart (vec2 st) {
    vec2 grid = vec2(7.,1.);
    vec2 ipos = floor((1.0-st)*grid);
    float digit = 122.0;
    float pct = binBar(ipos, digit+1.);
    return step(.5,1.0-pct);
}

float barEnd(vec2 st) {
    vec2 grid = vec2(7.,1.);
    vec2 ipos = floor((1.0-st)*grid);
    float digit = 85.0;
    float pct = binBar(ipos, digit+1.);
    return step(.5,1.0-pct);
}

float barCode(vec2 st, float rows, float value) {
    rows = ceil(rows);
    vec2 ipos = floor(st*rows);
    vec2 fpos = fract(st*rows);

    value = value*pow(10.,ipos.x)*0.0000000001+0.1;

    if (ipos.x == 0.0 ) {
        return barStart(fpos);
    } else if (ipos.x == rows-1.) {
        return barEnd(fpos);
    } else {
        if (ipos.y == 0.0) {
            return 1.0-char(fpos,value);
        } else {
            return bar(fpos,value);
        }
    }
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;

    st *= 3.;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    fpos.y *= u_resolution.y/u_resolution.x;

    vec3 color = vec3(0.0);

    if (ipos.x == 1. && ipos.y == 1.) {
        float value = 0.0;
        // value = 123456789.0;
        value += floor(u_time);
        value = random(floor(u_time*10.))*1000000000.;

        color += barCode(fpos,12.,value);
    } else {
        color += 1.;
    }

    gl_FragColor = vec4( color , 1.0);
}
