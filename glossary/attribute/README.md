## Attribute
Vertex attribute data.

### Example
```glsl
attribute vec4 v_color;
```

### Description
```attribute``` read-only variables containing data shared from WebGL/OpenGL environment to the vertex shader.

Because the vertex shader is executed one time for each vertex, attributes are specify per vertex data typically with information such as: space position, color, normal direction and texture coordinates of a vertex.

### See Also
[const](/glossary/?search=const), [uniform](/glossary/?search=uniform), [varying](/glossary/?search=varying), [Chapter 03: Uniforms](/03/)
