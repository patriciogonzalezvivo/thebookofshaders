## Dot
Tính tích vô hướng của hai vector

### Các phiên bản
```glsl
float dot(float x, float y)  
float dot(vec2 x, vec2 y)  
float dot(vec3 x, vec3 y)  
float dot(vec4 x, vec4 y)
```

### Các tham số
```x``` Vector thứ nhất

```y``` Vector thứ hai

### Mô tả
```dot()``` trả về tích vô hướng của hai vector ```x``` và ```y``` theo công thức ```x[0]⋅y[0]+x[1]⋅y[1]+...```
Nếu ```x``` và ```y``` giống nhau thì căn bậc hai của tích vô hướng sẽ bằng đúng chiều dài của vector. 


are the same the square root of the dot product is equivalent to the length of the vector. The input parameters can be floating scalars or float vectors. In case of floating scalars the dot function is trivial and returns the product of x and y.

<div class="codeAndCanvas" data="../07/circle.frag"></div>

### Tham khảo thêm

[cross()](/glossary/?lan=vi&search=cross), [Chapter 07: Shapes](/07/)
