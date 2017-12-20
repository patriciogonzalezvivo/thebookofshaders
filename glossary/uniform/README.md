## Uniform
Uniform variable qualifier.

### Example
```glsl
uniform vec4 direction;
```

### Description
```uniform``` variables contain read-only data shared from WebGL/OpenGL environment to a vertex or fragment shader.

The value is per primitive, so is useful for variables which remain constant along a primitive, frame or scene.

### See Also
[attribute](/glossary/?search=attribute), [const](/glossary/?search=const), [varying](/glossary/?search=varying), [Chapter 03: Uniforms](/03/)
