## LessThan
Perform a component-wise less-than comparison of two vectors

### Declaration
```glsl
bvec2 lessThan(vec2 x, vec2 y)  
bvec3 lessThan(vec3 x, vec3 y)    
bvec4 lessThan(vec4 x, vec4 y)  

bvec2 lessThan(ivec2 x, ivec2 y)  
bvec3 lessThan(ivec3 x, ivec3 y)  
bvec4 lessThan(ivec4 x, ivec4 y)
```

### Parameters
```x``` specifies the first vector to be used in the comparison operation.

```y``` specifies the second vector to be used in the comparison operation.

### Description
```lessThan()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] < y[i]```.

### See Also
[lessThanEqual()](index.html#lessThanEqual.md), [greaterThan()](index.html#greaterThan.md), [greaterThanEqual()](index.html#greaterThanEqual.md), [equal()](index.html#equal.md), [notEqual()](index.html#notEqual.md), [any()](index.html#any.md), [all()](index.html#all.md), [not()](index.html#not.md)
