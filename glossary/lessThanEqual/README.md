## LessThanEqual
Perform a component-wise less-than-or-equal comparison of two vectors

### Declaration
```glsl
bvec2 lessThanEqual(vec2 x, vec2 y)  
bvec3 lessThanEqual(vec3 x, vec3 y)  
bvec4 lessThanEqual(vec4 x, vec4 y)  

bvec2 lessThanEqual(ivec2 x, ivec2 y)  
bvec3 lessThanEqual(ivec3 x, ivec3 y)  
bvec4 lessThanEqual(ivec4 x, ivec4 y)
```

### Parameters
```x``` specifies the first vector to be used in the comparison operation.

```y``` specifies the second vector to be used in the comparison operation.

### Description
```lessThanEqual()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] ≤ y[i]```.

### See Also
[lessThan()](/glossary/?search=lessThan), [greaterThan()](/glossary/?search=greaterThan), [greaterThanEqual()](/glossary/?search=greaterThanEqual), [equal()](/glossary/?search=equal), [notEqual()](/glossary/?search=notEqual), [any()](/glossary/?search=any), [all()](/glossary/?search=all), [not()](/glossary/?search=not)
