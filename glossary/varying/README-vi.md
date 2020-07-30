## Varying
Varying variable qualifier.

### Ví dụ
```glsl
varying vec3 position;
```

### Mô tả
```varying``` variables contain data shared from a vertex shader to a fragment shader.

The variable must be written in the vertex shader and the read-only value in the fragment shader is then interpolated from the vertices which make up the fragment.

### Tham khảo thêm
[attribute](/glossary/?lan=vi&search=attribute), [const](/glossary/?lan=vi&search=const), [uniform](/glossary/?lan=vi&search=uniform), [Chương 03: Uniform](/03/?lan=vi)
