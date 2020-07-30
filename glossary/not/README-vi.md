## Not
Logically invert a boolean vector

### Các phiên bản
```glsl
bvec2 not(bvec2 x)  
bvec3 not(bvec3 x)  
bvec4 not(bvec4 x)
```

### Các tham số
```x``` specifies the vector to be inverted.

### Mô tả
```not()``` logically inverts the boolean vector ```x```. It returns a new boolean vector for which each element ```i``` is computed as ```!x[i]```.

### Tham khảo thêm
[any()](/glossary/?lan=vi&search=any), [all()](/glossary/?lan=vi&search=all)
