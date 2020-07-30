## LessThanEqual
Thực hiện phép so sánh nhỏ-hơn-hoặc-bằng giữa các cặp giá trị của 2 vector.

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
```x``` Vector thứ nhất.

```y``` Vector thứ hai.

### Mô tả
```lessThanEqual()``` trả về một vector boolean mà thành phần thứ ```i``` là kết quả của phép so sánh ```x[i] ≤ y[i]```.

### Tham khảo thêm
[lessThan()](/glossary/?lan=vi&search=lessThan), [greaterThan()](/glossary/?lan=vi&search=greaterThan), [greaterThanEqual()](/glossary/?lan=vi&search=greaterThanEqual), [equal()](/glossary/?lan=vi&search=equal), [notEqual()](/glossary/?lan=vi&search=notEqual), [any()](/glossary/?lan=vi&search=any), [all()](/glossary/?lan=vi&search=all), [not()](/glossary/?lan=vi&search=not)
