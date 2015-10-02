// By Jaskirat Randhawa ( http://jaskirat.me/ ) 
// For Shader Studio Course https://github.com/patriciogonzalezvivo/ss2015

// Inspiration https://www.shadertoy.com/view/Xtj3DD

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;  

float F(float x, float peak, float width){
    float y = 0.0;
    width=width * 0.5;
    y = smoothstep(peak-width,peak,x) - smoothstep(peak,peak+width,x);
    return y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float timeA = (sin(u_time/5.));
    float x1 = sin(timeA)/2.+.5;
    float y1 = cos(timeA);

    // x1 = u_mouse.x/u_resolution.x;
    // y1 = u_mouse.y/u_resolution.y;

    vec2 center_sun = vec2(0.5);
    center_sun = vec2 (x1,y1-(.2));
    vec3 sun = vec3(1.0,1.0,1.0) *(length(gl_FragCoord.xy - (center_sun * u_resolution.xy)) < (u_resolution.x/20.0) ? 1.0 : 0.0);
    float halo = (length(gl_FragCoord.xy - center_sun * u_resolution.xy)-(u_resolution.x/40.0))/length(u_resolution.xy);

    float sunHaloExp = 2.*exp(-pow(halo,2.0)/(pow(1.25-y1,15.2)));
    sunHaloExp += 2.*exp(-pow(halo,2.0)/(pow(0.004,1.2)));

    vec3 haloRed = vec3 (.4,0.2,0.1) * sunHaloExp*3.*(2.-y1);
    
    vec3 horizon_blue = pow((st.y-1.5),15.)*vec3(0.2,0.5,1.0);
    vec3 horizon_orange = pow((st.y-1.5),35.)*vec3(1.,0.4,0.1);

    vec3 horizon = mix(horizon_blue,horizon_orange,pow(1.5-y1,3.));
    // horizon = pow(abs(st.y*cos(u_time)/2.-1.),20.)*vec3(0.5,0.7,1.0);
    vec3 color = vec3(0.);

    float pct = F(st.y,y1-.20,0.1); // Lens Flare

    color = vec3(step(.1,sun)+sun);
    gl_FragColor = vec4(horizon*pct+horizon+sun/3.+haloRed,1.0);
}
