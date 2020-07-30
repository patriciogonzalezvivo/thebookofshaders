## DFdx
Tính đạo hàm riêng của x

### Các phiên bản
```glsl
genType dFdx(	genType p);
```

### Các tham số
```p``` biểu thức cần tính đạo hàm riêng

### Mô tả

Chỉ được dùng trong fragment shader, hàm  ```dFdx``` sẽ trả về đạo hàm riêng của biểu thức ```p``` ứng với giá trị```x```. Đạo hàm được tính bằng phương pháp sai phân hữu hạn. Không tính được kết quả của đạo hàm bậc cao như ```dFdx(dFdx(n))```. Giả thiết là biểu thức ```p``` là một hàm liên tục.

### Tham khảo thêm
[dFdy()](/glossary/?lan=vi&search=dFdy)
