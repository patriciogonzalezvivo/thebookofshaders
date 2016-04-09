## GreaterThan
Perform a component-wise greater-than comparison of two vectors

### Declaration
```glsl
bvec2 greaterThan(vec2 x, vec2 y)  
bvec3 greaterThan(vec3 x, vec3 y)  
bvec4 greaterThan(vec4 x, vec4 y)  

bvec2 greaterThan(ivec2 x, ivec2 y)  
bvec3 greaterThan(ivec3 x, ivec3 y)  
bvec4 greaterThan(ivec4 x, ivec4 y)
```

### Parameters
```x``` specifies the first vector to be used in the comparison operation.

```y``` specifies the second vector to be used in the comparison operation.

### Description
```greaterThan()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] > y[i]```.

### See Also
[lessThanEqual()](/glossary/?search=lessThanEqual), [lessThan()](/glossary/?search=lessThan), [greaterThanEqual()](/glossary/?search=greaterThanEqual), [equal()](/glossary/?search=equal), [notEqual()](/glossary/?search=notEqual), [any()](/glossary/?search=any), [all()](/glossary/?search=all), [not()](/glossary/?search=not)
