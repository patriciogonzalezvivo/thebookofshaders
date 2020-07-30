## LessThan
Thực hiện phép so sánh nhỏ-hơn giữa các cặp giá trị của 2 vector.

### Các phiên bản
```glsl
bvec2 lessThan(vec2 x, vec2 y)  
bvec3 lessThan(vec3 x, vec3 y)    
bvec4 lessThan(vec4 x, vec4 y)  

bvec2 lessThan(ivec2 x, ivec2 y)  
bvec3 lessThan(ivec3 x, ivec3 y)  
bvec4 lessThan(ivec4 x, ivec4 y)
```

### Các tham số
```x``` Vector thứ nhất.

```y``` Vector thứ hai.

### Mô tả
```lessThan()``` trả về một vector boolean mà thành phần thứ ```i``` là kết quả của phép so sánh ```x[i] < y[i]```.

### Tham khảo thêm
[lessThanEqual()](/glossary/?lan=vi&search=lessThanEqual), [greaterThan()](/glossary/?lan=vi&search=greaterThan), [greaterThanEqual()](/glossary/?lan=vi&search=greaterThanEqual), [equal()](/glossary/?lan=vi&search=equal), [notEqual()](/glossary/?lan=vi&search=notEqual), [any()](/glossary/?lan=vi&search=any), [all()](/glossary/?lan=vi&search=all), [not()](/glossary/?lan=vi&search=not)
