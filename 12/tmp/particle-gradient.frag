// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex;

vec4 permute(vec4 x) {
  return mod((34.0 * x + 1.0) * x, 289.0);
}

vec2 cellular2x2(vec2 P) {
#define K 0.142857142857 // 1/7
#define K2 0.0714285714285 // K/2
#define jitter 0.8 // jitter 1.0 makes F1 wrong more often
	vec2 Pi = mod(floor(P), 289.0);
 	vec2 Pf = fract(P);
	vec4 Pfx = Pf.x + vec4(-0.5, -1.5, -0.5, -1.5);
	vec4 Pfy = Pf.y + vec4(-0.5, -0.5, -1.5, -1.5);
	vec4 p = permute(Pi.x + vec4(0.0, 1.0, 0.0, 1.0));
	p = permute(p + Pi.y + vec4(0.0, 0.0, 1.0, 1.0));
	vec4 ox = mod(p, 7.0)*K+K2;
	vec4 oy = mod(floor(p*K),7.0)*K+K2;
	vec4 dx = Pfx + jitter*ox;
	vec4 dy = Pfy + jitter*oy;
	vec4 d = dx * dx + dy * dy; // d11, d12, d21 and d22, squared
	// Sort out the two smallest distances
#if 0
	// Cheat and pick only F1
	d.xy = min(d.xy, d.zw);
	d.x = min(d.x, d.y);
	return d.xx; // F1 duplicated, F2 not computed
#else
	// Do it right and find both F1 and F2
	d.xy = (d.x < d.y) ? d.xy : d.yx; // Swap if smaller
	d.xz = (d.x < d.z) ? d.xz : d.zx;
	d.xw = (d.x < d.w) ? d.xw : d.wx;
	d.y = min(d.y, d.z);
	d.y = min(d.y, d.w);
	return sqrt(d.xy);
#endif
}

float getIntensity(vec2 u){
	vec3 a = texture2D(u_tex,u).xyz;
	return (a.x+a.y+a.z)/3.0;
}

void main(void) {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float n = 1.0;

	vec2 F = cellular2x2(st*100.);
	float pct = 1.0-texture2D(u_tex,st).r;
	n = step(pct,F.x*2.);

	vec2 p = vec2(2./u_resolution.xy);

	float avg = 0.0;
	avg += getIntensity(st+vec2(p.x,0.0));
	avg += getIntensity(st+vec2(-p.x,0.0));
	avg += getIntensity(st+vec2(0.0,p.y));
	avg += getIntensity(st+vec2(0.0,-p.y));
	avg += getIntensity(st+vec2(p.x,p.y));
	avg += getIntensity(st+vec2(-p.x,-p.y));
	avg += getIntensity(st+vec2(p.x,-p.y));
	avg += getIntensity(st+vec2(-p.x,p.y));
	avg /= 8.0;
	float edge = (1.0-getIntensity(st)) + avg;
	edge = (1.0 - edge)*10.0;
	n -= edge;

	gl_FragColor = vec4(n, n, n, 1.0);
}
