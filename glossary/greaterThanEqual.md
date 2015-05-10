## GreaterThanEqual
Perform a component-wise greater-than-or-equal comparison of two vectors

### Declaration
```glsl
bvec2 greaterThanEqual(vec2 x, vec2 y)  
bvec3 greaterThanEqual(vec3 x, vec3 y)  
bvec4 greaterThanEqual(vec4 x, vec4 y)  

bvec2 greaterThanEqual(ivec2 x, ivec2 y)  
bvec3 greaterThanEqual(ivec3 x, ivec3 y)  
bvec4 greaterThanEqual(ivec4 x, ivec4 y)
```

### Parameters
```x``` specifies the first vector to be used in the comparison operation.

```y``` specifies the second vector to be used in the comparison operation.

### Description
```greaterThanEqual()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] ≥ y[i]```.

### See Also
[lessThanEqual()](index.html#lessThanEqual.md), [lessThan()](index.html#lessThan.md), [greaterThan()](index.html#greaterThan.md), [equal()](index.html#equal.md), [notEqual()](index.html#notEqual.md), [any()](index.html#any.md), [all()](index.html#all.md), [not()](index.html#not.md)
