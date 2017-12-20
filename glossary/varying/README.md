## Varying
Varying variable qualifier.

### Example
```glsl
varying vec3 position;
```

### Description
```varying``` variables contain data shared from a vertex shader to a fragment shader.

The variable must be written in the vertex shader and the read-only value in the fragment shader is then interpolated from the vertices which make up the fragment.

### See Also
[attribute](/glossary/?search=attribute), [const](/glossary/?search=const), [uniform](/glossary/?search=uniform), [Chapter 03: Uniforms](/03/)
