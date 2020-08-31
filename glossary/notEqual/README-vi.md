## NotEqual
Thực hiện phép so sánh không-bằng giữa các cặp giá trị của 2 vector.

### Các phiên bản
```glsl
bvec2 notEqual(vec2 x, vec2 y)  
bvec3 notEqual(vec3 x, vec3 y)  
bvec4 notEqual(vec4 x, vec4 y)  

bvec2 notEqual(ivec2 x, ivec2 y)  
bvec3 notEqual(ivec3 x, ivec3 y)  
bvec4 notEqual(ivec4 x, ivec4 y)
```

### Các tham số
```x``` Vector thứ nhất.

```y``` Vector thứ hai.

### Mô tả
```notEqual()``` trả về một vector boolean mà thành phần thứ ```i``` là kết quả của phép so sánh ```x[i] != y[i]```.

### Tham khảo thêm
[lessThanEqual()](/glossary/?lan=vi&search=lessThanEqual), [lessThan()](/glossary/?lan=vi&search=lessThan), [greaterThanEqual()](/glossary/?lan=vi&search=greaterThanEqual), [greaterThan()](/glossary/?lan=vi&search=greaterThan), [equal()](/glossary/?lan=vi&search=equal), [any()](/glossary/?lan=vi&search=any), [all()](/glossary/?lan=vi&search=all), [not()](/glossary/?lan=vi&search=not)
