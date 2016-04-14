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
[lessThanEqual()](/glossary/?search=lessThanEqual), [greaterThan()](/glossary/?search=greaterThan), [greaterThanEqual()](/glossary/?search=greaterThanEqual), [equal()](/glossary/?search=equal), [notEqual()](/glossary/?search=notEqual), [any()](/glossary/?search=any), [all()](/glossary/?search=all), [not()](/glossary/?search=not)
