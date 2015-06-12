## Ivec4
4 dimentional integer vector

### Declaration
```glsl
vec4 aIvec4 = ivec4(1, 1, 1, 1);
vec4 bIvec4 = ivec4(1);

vec4 cIvec4 = ivec4(aIvec2, aInteger, aIvec3);
vec4 dIvec4 = ivec4(aIvec2.x, aIvec2.y, aInt, aIvec3.x);
```

### Description
```ivec4``` is a integer vectors with four components. Can be initialize by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### See Also
[bool](index.html#bool.md), [int](index.html#int.md), [float](index.html#float.md), [bvec2](index.html#bvec2.md), [bvec3](index.html#bvec3.md), [bvec4](index.html#bvec4.md), [ivec2](index.html#ivec2.md), [ivec3](index.html#ivec3.md), [ivec4](index.html#ivec4.md), [vec2](index.html#vec2.md), [vec3](index.html#vec3.md), [vec4](index.html#vec4.md), [mat2](index.html#mat2.md), [mat3](index.html#mat3.md), [mat4](index.html#mat4.md)