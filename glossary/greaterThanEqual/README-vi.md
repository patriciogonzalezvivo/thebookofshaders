## GreaterThanEqual
Perform a component-wise greater-than-or-equal comparison of two vectors

### Các phiên bản
```glsl
bvec2 greaterThanEqual(vec2 x, vec2 y)  
bvec3 greaterThanEqual(vec3 x, vec3 y)  
bvec4 greaterThanEqual(vec4 x, vec4 y)  

bvec2 greaterThanEqual(ivec2 x, ivec2 y)  
bvec3 greaterThanEqual(ivec3 x, ivec3 y)  
bvec4 greaterThanEqual(ivec4 x, ivec4 y)
```

### Các tham số
```x``` specifies the first vector to be used in the comparison operation.

```y``` specifies the second vector to be used in the comparison operation.

### Mô tả
```greaterThanEqual()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] ≥ y[i]```.

### Tham khảo thêm
[lessThanEqual()](/glossary/?lan=vi&search=lessThanEqual), [lessThan()](/glossary/?lan=vi&search=lessThan), [greaterThan()](/glossary/?lan=vi&search=greaterThan), [equal()](/glossary/?lan=vi&search=equal), [notEqual()](/glossary/?lan=vi&search=notEqual), [any()](/glossary/?lan=vi&search=any), [all()](/glossary/?lan=vi&search=all), [not()](/glossary/?lan=vi&search=not)
