#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897932384626433832795
#define PI_2 1.57079632679489661923
#define PI_4 0.785398163397448309616
#define PI180 .017453293

float PHI = (1.0+sqrt(5.0))/2.0;
float sind(float a){return sin(a * PI180);}
float cosd(float a){return cos(a * PI180);}

uniform vec2 u_resolution;
uniform float u_time;

mat2 rotate2D(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

mat3 rotateX3D(float phi){
    return mat3(
        vec3(1.,0.,0.),
        vec3(0.,cos(phi),-sin(phi)),
        vec3(0.,sin(phi),cos(phi)));
}

mat4 rotateX4D(float phi){
    return mat4(
        vec4(1.,0.,0.,0),
        vec4(0.,cos(phi),-sin(phi),0.),
        vec4(0.,sin(phi),cos(phi),0.),
        vec4(0.,0.,0.,1.));
}

mat3 rotateY3D(float theta){
    return mat3(
        vec3(cos(theta),0.,-sin(theta)),
        vec3(0.,1.,0.),
        vec3(sin(theta),0.,cos(theta)));
}

mat4 rotateY4D(float theta){
    return mat4(
        vec4(cos(theta),0.,-sin(theta),0),
        vec4(0.,1.,0.,0.),
        vec4(sin(theta),0.,cos(theta),0.),
        vec4(0.,0.,0.,1.));
}

mat3 rotateZ3D(float psi){
    return mat3(
        vec3(cos(psi),-sin(psi),0.),
        vec3(sin(psi),cos(psi),0.),
        vec3(0.,0.,1.));
}

mat4 rotateZ4D(float psi){
    return mat4(
        vec4(cos(psi),-sin(psi),0.,0),
        vec4(sin(psi),cos(psi),0.,0.),
        vec4(0.,0.,1.,0.),
        vec4(0.,0.,0.,1.));
}

mat4 scale4D(float x, float y, float z){
    return mat4(
        vec4(x,   0.0, 0.0, 0.0),
        vec4(0.0, y,   0.0, 0.0),
        vec4(0.0, 0.0, z,   0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}

mat4 translate4D(float x, float y, float z){
    return mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(x,   y,   z,   1.0)
    );
}
