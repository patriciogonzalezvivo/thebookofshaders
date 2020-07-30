## Equal
Perform a component-wise equal-to comparison of two vectors

### Các phiên bản
```glsl
bvec2 equal(vec2 x, vec2 y)  
bvec3 equal(vec3 x, vec3 y)  
bvec4 equal(vec4 x, vec4 y)  

bvec2 equal(ivec2 x, ivec2 y)  
bvec3 equal(ivec3 x, ivec3 y)  
bvec4 equal(ivec4 x, ivec4 y)
```

### Các tham số
```x``` Specifies the first vector to be used in the comparison operation.

```y``` Specifies the second vector to be used in the comparison operation.

### Mô tả
```equal()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] == y[i]```.

### Tham khảo thêm
[lessThanEqual()](/glossary/?lan=vi&search=lessThanEqual), [lessThan()](/glossary/?lan=vi&search=lessThan), [greaterThanEqual()](/glossary/?lan=vi&search=greaterThanEqual), [greaterThan()](/glossary/?lan=vi&search=greaterThan), [notEqual()](/glossary/?lan=vi&search=notEqual), [any()](/glossary/?lan=vi&search=any), [all()](/glossary/?lan=vi&search=all), [not()](/glossary/?lan=vi&search=not)
