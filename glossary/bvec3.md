## Bvec3
3 dimentional boolean vector

### Declaration
```glsl
vec3 aBvec3 = bvec3(true, true, true);
vec3 bBvec3 = bvec3(true);

vec3 cBvec3 = bvec3(aBvec4);
vec3 dBvec3 = bvec3(aBvec4.x, aBvec4.y, aBvec4.z);

vec3 eBvec3 = bvec3(aBvec2, aBool);
vec3 fBvec3 = bvec3(aBvec2.x, aBvec2.y, aBool);
```

### Description
```bvec3``` is a boolean vectors with three components. Can be initialize by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a vector of higher dimension. The respective values are used to initialize the components.
- Providing a combination of vectors and/or scalars. The respective values are used to initialize the vector. The arguments of the constructor must have at least as many components as the vector that is initialized.

### See Also
[bool](index.html#bool.md), [int](index.html#int.md), [float](index.html#float.md), [bvec2](index.html#bvec2.md), [bvec3](index.html#bvec3.md), [bvec4](index.html#bvec4.md), [ivec2](index.html#ivec2.md), [ivec3](index.html#ivec3.md), [ivec4](index.html#ivec4.md), [vec2](index.html#vec2.md), [vec3](index.html#vec3.md), [vec4](index.html#vec4.md), [mat2](index.html#mat2.md), [mat3](index.html#mat3.md), [mat4](index.html#mat4.md)
