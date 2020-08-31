## Any
Kiểm tra xem có giá trị nào trong 1 vector kiểu boolean bằng true không

### Các phiên bản
```glsl
bool all(bvec2 x)  
bool all(bvec3 x)  
bool all(bvec4 x)
```

### Các tham số
```x``` vector cần kiểm tra

### Mô tả
```any()``` trả về ```true``` nếu có bất kỳ một giá trị nào trong vector ```x``` bằng ```true```, ngược lại trả về ```false```. Hàm này tương đương với:

```glsl
bool any(bvec x) {     // bvec can be bvec2, bvec3 or bvec4
    bool result = false;
    int i;
    for (i = 0; i < x.length(); ++i) {
        result |= x[i];
    }
    return result;
}
```

### Tham khảo thêm
[any()](/glossary/?lan=vi&search=any), [not()](/glossary/?lan=vi&search=not)
