// Author @kynd - 2016
// http://www.kynd.info

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float smoothedge(float v) {
    return smoothstep(0.0, 1.0 / u_resolution.x, v);
}

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float rect(vec2 p, vec2 size) {  
  vec2 d = abs(p) - size;
  return min(max(d.x, d.y), 0.0) + length(max(d,0.0));
}

float roundRect(vec2 p, vec2 size, float radius) {
  vec2 d = abs(p) - size;
  return min(max(d.x, d.y), 0.0) + length(max(d,0.0))- radius;
}

float ring(vec2 p, float radius, float width) {
  return abs(length(p) - radius * 0.5) - width;
}

float hexagon(vec2 p, float radius) {
    vec2 q = abs(p);
    return max(abs(q.y), q.x * 0.866025 + q.y * 0.5) - radius;
}

float triangle(vec2 p, float size) {
    vec2 q = abs(p);
    return max(q.x * 0.866025 + p.y * 0.5, -p.y * 0.5) - size * 0.5;
}

float ellipse(vec2 p, vec2 r, float s) {
    return (length(p / r) - s);
}

float capsule(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h ) - r;
}

//http://thndl.com/square-shaped-shaders.html
float polygon(vec2 p, int vertices, float size) {
    float a = atan(p.x, p.y) + 0.2;
    float b = 6.28319 / float(vertices);
    return cos(floor(0.5 + a / b) * b - a) * length(p) - size;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float d = circle(st - vec2(0.2), 0.1);
    d = min(d, rect(st - vec2(0.5, 0.2), vec2(0.1, 0.08)));
    d = min(d, roundRect(st - vec2(0.8, 0.2), vec2(0.08, 0.06), 0.02));
    d = min(d, ring(st - vec2(0.2, 0.5), 0.18, 0.02));
    d = min(d, hexagon(st - vec2(0.5, 0.5), 0.1));
    d = min(d, triangle(st - vec2(0.8, 0.5), 0.1));
    d = min(d, ellipse(st - vec2(0.2, 0.8), vec2(0.9, 1.2), 0.1));
    d = min(d, capsule(st - vec2(0.5, 0.8), vec2(-0.05, -0.05), vec2(0.05, 0.05), 0.05));
    d = min(d, polygon(st - vec2(0.8, 0.8), 5, 0.1));
    vec3 color = vec3(smoothedge(d));
    gl_FragColor = vec4(color, 1.0);
}