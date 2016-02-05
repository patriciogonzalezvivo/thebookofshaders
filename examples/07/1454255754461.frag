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
  return abs(length(p) - radius) - width;
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

float getShape(vec2 st, int i) {
    if (i == 0) {
        return circle(st, 0.4);
    } else if (i == 1) {
        return ring(st, 0.36, 0.08);
    } else if (i == 2) {
        return roundRect(st, vec2(0.32, 0.24), 0.08);
    } else if (i == 3) {
        return rect(st, vec2(0.4, 0.32));
    } else if (i == 4) {
        return capsule(st, vec2(-0.25, -0.25), vec2(0.25, 0.25), 0.2);
    } else if (i == 5) {
        return ellipse(st, vec2(0.9, 1.2), 0.4);
    } else if (i == 6) {
        return triangle(st, 0.4);
    } else if (i == 7) {
        return polygon(st, 5, 0.4);
    } else {
        return hexagon(st, 0.4);
    }
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	
    float t0 = mod(u_time * 2.0, 9.0);
    float t1 = mod(u_time * 2.0 + 1.0, 9.0);
    int i0 = int(floor(t0));
    int i1 = int(floor(t1));
    float f = fract(t0);
    
    st -= vec2(0.5, 0.5);
    vec3 color = vec3(smoothedge(mix(getShape(st, i0), getShape(st, i1), f)));
    
    gl_FragColor = vec4(color, 1.0);
}