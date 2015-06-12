## Ivec2
2 dimentional integer vector

### Declaration
```glsl
bvec2 aIvec2 = ivec2(1, 1);
bvec2 bIvec2 = ivec2(1);

bvec2 cIvec2 = ivec2(aIvec3);
bvec2 dIvec2 = ivec2(aIvec3.x, aIvec3.y);
```

### Description
```ivec2``` is a integer vectors with two components. Can be initialize by:

- Providing a scalar value for each component.
- Providing one scalar value. This value is used for all components.
- Providing a vector of higher dimension. The respective values are used to initialize the components.

### See Also
[bool](index.html#bool.md), [int](index.html#int.md), [float](index.html#float.md), [bvec2](index.html#bvec2.md), [bvec3](index.html#bvec3.md), [bvec4](index.html#bvec4.md), [ivec2](index.html#ivec2.md), [ivec3](index.html#ivec3.md), [ivec4](index.html#ivec4.md), [vec2](index.html#vec2.md), [vec3](index.html#vec3.md), [vec4](index.html#vec4.md), [mat2](index.html#mat2.md), [mat3](index.html#mat3.md), [mat4](index.html#mat4.md)