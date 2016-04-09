## Equal
Perform a component-wise equal-to comparison of two vectors

### Declaration
```glsl
bvec2 equal(vec2 x, vec2 y)  
bvec3 equal(vec3 x, vec3 y)  
bvec4 equal(vec4 x, vec4 y)  

bvec2 equal(ivec2 x, ivec2 y)  
bvec3 equal(ivec3 x, ivec3 y)  
bvec4 equal(ivec4 x, ivec4 y)
```

### Parameters
```x``` Specifies the first vector to be used in the comparison operation.

```y``` Specifies the second vector to be used in the comparison operation.

### Description
```equal()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] == y[i]```.

### See Also
[lessThanEqual()](/glossary/?search=lessThanEqual), [lessThan()](/glossary/?search=lessThan), [greaterThanEqual()](/glossary/?search=greaterThanEqual), [greaterThan()](/glossary/?search=greaterThan), [notEqual()](/glossary/?search=notEqual), [any()](/glossary/?search=any), [all()](/glossary/?search=all), [not()](/glossary/?search=not)
