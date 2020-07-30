## LessThanEqual
Perform a component-wise less-than-or-equal comparison of two vectors

### Các phiên bản
```glsl
bvec2 lessThanEqual(vec2 x, vec2 y)  
bvec3 lessThanEqual(vec3 x, vec3 y)  
bvec4 lessThanEqual(vec4 x, vec4 y)  

bvec2 lessThanEqual(ivec2 x, ivec2 y)  
bvec3 lessThanEqual(ivec3 x, ivec3 y)  
bvec4 lessThanEqual(ivec4 x, ivec4 y)
```

### Các tham số
```x``` specifies the first vector to be used in the comparison operation.

```y``` specifies the second vector to be used in the comparison operation.

### Mô tả
```lessThanEqual()``` returns a boolean vector in which each element ```i``` is computed as ```x[i] ≤ y[i]```.

### Tham khảo thêm
[lessThan()](/glossary/?lan=vi&search=lessThan), [greaterThan()](/glossary/?lan=vi&search=greaterThan), [greaterThanEqual()](/glossary/?lan=vi&search=greaterThanEqual), [equal()](/glossary/?lan=vi&search=equal), [notEqual()](/glossary/?lan=vi&search=notEqual), [any()](/glossary/?lan=vi&search=any), [all()](/glossary/?lan=vi&search=all), [not()](/glossary/?lan=vi&search=not)
