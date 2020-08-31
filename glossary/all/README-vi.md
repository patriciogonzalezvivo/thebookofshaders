## All
Kiểm tra xem toàn bộ các thành phần trong 1 vector boolean có cùng bằng true không

### Các phiên bản
```glsl
bool any(bvec2 x)  
bool any(bvec3 x)  
bool any(bvec4 x)
```

### Các tham số
```x``` vector boolean cần kiểm tra

### Mô tả
```all()``` trả về ```true``` nếu tất cả các thành phần trong vector ```x``` đều bằng ```true``` và trả về ```false``` nếu ngược lại. Tương đương với:

```glsl
bool all(bvec x){       // bvec có thể thay bằng bvec2, bvec3 or bvec4
    bool result = true;
    int i;
    for (i = 0; i < x.length(); ++i)
    {
        result &= x[i];
    }
    return result;
}
```
### Tham khảo thêm
[any()](/glossary/?lan=vi&search=any), [not()](/glossary/?lan=vi&search=not)
