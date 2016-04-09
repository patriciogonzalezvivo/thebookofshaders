## NotEqual
Perform a component-wise not-equal-to comparison of two vectors

### Declaration
```glsl
bvec2 notEqual(vec2 x, vec2 y)  
bvec3 notEqual(vec3 x, vec3 y)  
bvec4 notEqual(vec4 x, vec4 y)  

bvec2 notEqual(ivec2 x, ivec2 y)  
bvec3 notEqual(ivec3 x, ivec3 y)  
bvec4 notEqual(ivec4 x, ivec4 y)
```

### Parameters
```x``` specifies the first vector to be used in the comparison operation.

```y``` specifies the second vector to be used in the comparison operation.

### Description
```notEqual()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] != y[i]```.

### See Also
[lessThanEqual()](/glossary/?search=lessThanEqual), [lessThan()](/glossary/?search=lessThan), [greaterThanEqual()](/glossary/?search=greaterThanEqual), [greaterThan()](/glossary/?search=greaterThan), [equal()](/glossary/?search=equal), [any()](/glossary/?search=any), [all()](/glossary/?search=all), [not()](/glossary/?search=not)
