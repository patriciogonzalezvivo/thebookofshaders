Add some references and ideas from this IQ article: http://iquilezles.org/www/articles/palettes/palettes.htm

 ### nicolas
 * struct exist in GLSL : this is valid
 ```precision mediump float;
    struct my_struct {
      vec4 color;
    };
    uniform my_struct u_colors[2];
    void main(void) {
        gl_FragColor = u_colors[0].color;
    }
 ```
[source](https://github.com/KhronosGroup/WebGL/blob/master/sdk/tests/conformance/glsl/misc/shader-with-array-of-structs-uniform.html)