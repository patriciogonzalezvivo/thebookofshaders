## Ivec3
3 dimentional integer vector

### Declaration
```glsl
vec3 aIvec3 = ivec3(1, 1, 1);
vec3 bIvec3 = ivec3(1);

vec3 cIvec3 = ivec3(aIvec4);
vec3 dIvec3 = ivec3(aIvec4.x, aIvec4.y, aIvec4.z);

vec3 eIvec3 = ivec3(aIvec2, aInt);
vec3 fIvec3 = ivec3(aIvec2.x, aIvec2.y, aInt);
```

### Description
```ivec3``` is a integer vectors with three components. Can be initialize by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a vector of higher dimension. The respective values are used to initialize the components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### See Also
[bool](index.html#bool.md), [int](index.html#int.md), [float](index.html#float.md), [bvec2](index.html#bvec2.md), [bvec3](index.html#bvec3.md), [bvec4](index.html#bvec4.md), [ivec2](index.html#ivec2.md), [ivec3](index.html#ivec3.md), [ivec4](index.html#ivec4.md), [vec2](index.html#vec2.md), [vec3](index.html#vec3.md), [vec4](index.html#vec4.md), [mat2](index.html#mat2.md), [mat3](index.html#mat3.md), [mat4](index.html#mat4.md)