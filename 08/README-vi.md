## Ma trận 2 chiều

<canvas id="custom" class="canvas" data-fragment-url="matrix.frag"  width="700px" height="200px"></canvas>

### Chuyển động thẳng / tịnh tiến (Translate)

Ở chương trước ta đã học cách vẽ nhiều hình khác nhau. Để di chuyển tịnh tiến các hình đó, thay vì di chuyển chính hình vẽ, ta có thể di chuyển trục toạ độ. Rất đơn giản, chỉ cần cộng thêm 1 vector vào biến ```st``` lưu vị trí của mỗi fragment, sẽ khiến cho cả trục toạ độ di chuyển.

![](translate.jpg)

Nhìn trực tiếp thì sẽ dễ hơn giải thích, nên bạn hãy thử:

* Uncomment dòng 35 của đoạn code bên dưới

<div class="codeAndCanvas" data="cross-translate.frag"></div>

Thử sửa code tiếp nhé:

* Kết hợp biến ```u_time``` với các hàm số đã biết để di chuyển hình chữ thập. Hãy tìm một chuyển động nào đó mà bạn thích, sau đó hãy mô phỏng chuyển động đó cho hình chữ thập này. Thực tế có rất nhiều chuyển động thú vị ở quanh bạn: những con sóng liên tiếp vỗ bờ này, chuyển động của con lắc này, quả bóng nảy trên mặt đất này, ô tô tăng tốc này rồi thì cái xe đạp dừng lại nữa.

### Chuyển động quay

Để quay một vật thể ta cũng sẽ quay hệ trục toạ độ. Để làm việc đó, ta sẽ dùng tới [ma trận](http://en.wikipedia.org/wiki/Matrix_%28mathematics%29). Ma trận gồm các số được xếp thành nhiều hàng và cột. Phép nhân một vector với một ma trận phải tuân thủ quy tắc một cách chính xác về thứ tự phép tính.

[![Ma trận trên Wikipedia](matrixes.png)](https://en.wikipedia.org/wiki/Matrix)

GLSL có sẵn một vài ma trận có kích thước khác nhau: [```mat2```](../glossary/?lan=vi&search=mat2) (2x2), [```mat3```](../glossary/?lan=vi&search=mat3) (3x3) và [```mat4```](../glossary/?lan=vi&search=mat4) (4x4). GLSL cũng có sẵn phép nhân ma trận thông thường (toán tử ```*```) và cả phép nhân 2 ma trận theo từng cặp phần tử nữa ([```matrixCompMult()```](../glossary/?lan=vi&search=matrixCompMult)).

Ta có thể sử dụng ma trận để làm vài thứ hay ho. Ví dụ ta có thể dùng nó để tịnh tiến một vector:

![](3dtransmat.png)

Và hay hơn nữa, ta còn có thể dùng nó để xoay trục toạ độ:

![](rotmat.png)

Đoạn code dưới đây khởi tạo một ma trận 2 chiều. Hàm này áp dụng [công thức ở hình trên](http://en.wikipedia.org/wiki/Rotation_matrix) để xoay một vector 2 chiều quanh gốc toạ độ ```vec2(0.0)```.

```glsl
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
```

Thực ra thì xoay 1 điểm quanh gốc toạ độ không phải là điều mà ta muốn, ta cần nó xoay quanh tâm của chính nó cơ. Và để làm điều đó, ta sẽ chữa mẹo như sau: đầu tiên di chuyển hình chữ thập về đúng gốc toạ độ để tâm của hình chữ thập trùng vị trí với gốc toạ độ, sau đó thực hiện phép quay, cuối cùng di chuyển hình chữ thập đã quay về lại vị trí cũ.

![](rotate.jpg)

Code sẽ trông như sau:

<div class="codeAndCanvas" data="cross-rotate.frag"></div>

Hãy thử:

* Uncomment dòng 45 xem chuyện gì xảy ra.

* Comment đoạn code thực hiện việc di chuyển hình chữ thập trước và sau khi thực hiện phép quay, ở dòng 37 và 39, xem chuyện gì xảy ra.

* Kết hợp phép quay với chuyển động tịnh tiến ở phần trước.

### Phép thu phóng

Ta đã thấy cách mà ma trận được sử dụng để di chuyển và quay vật thể trong không gian. Nếu bạn đã từng sử dụng các phần mềm tạo mô hình 3D hay sử dụng tính năng push và pop ma trận trong Processing, thì bạn sẽ biết rằng ma trận còn có thể phóng to thu nhỏ vật thể nữa.

![](scale.png)

Từ công thức thu phóng 3 chiều trên đây, ta có thể suy luận ra cách tạo nên ma trận thu phóng 2 chiều:

```glsl
mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
```

<div class="codeAndCanvas" data="cross-scale.frag"></div>

Hãy thử làm như sau để có thể hiểu sâu hơn cách ma trận thu phóng hoạt động:

* Uncomment dòng 42 để thấy rõ rằng cả hệ toạ độ được thu phóng chứ không phải chỉ mỗi hình chữ thập.

* Xem điều gì xảy ra nếu comment 2 dòng code di chuyển trước và sau khi thu phóng (37 và 39).

* Thử kết hợp ma trận quay với ma trận thu phóng. Chú ý rằng thứ tự thực hiện sẽ ảnh hưởng tới kết quả sau cùng. Hãy nhân các ma trận trước rồi nhân với vector sau cùng.

* Giờ thì không những bạn biết cách vẽ các hình rồi, mà còn biết cách di chuyển, quay và phóng to thu nhỏ chúng nữa. Hãy kết hợp nhiều hình lại để tạo nên [một giao diện ảo](https://www.pinterest.com/patriciogonzv/huds/). Bạn có thể tham khảo [ví dụ sau](https://www.shadertoy.com/user/ndel).

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/4s2SRt?gui=true&t=10&paused=true" allowfullscreen></iframe>

### Công dụng khác của ma trận: Không gian màu YUV

[YUV](http://en.wikipedia.org/wiki/YUV) là không gian màu sử dụng cách mã hoá analog truyền thống của ảnh về video, chỉ quan tâm tới dải màu mà con người có thể nhìn thấy được để thu gọn dữ liệu cần lưu trữ.

Đoạn code dưới đây sử dụng ma trận để chuyển đổi màu từ không gian này sang một không gian khác.

<div class="codeAndCanvas" data="yuv.frag"></div>

Bạn có thể thấy tôi thao tác với màu tương tự như với các vector khi đem chúng nhân với các ma trận. 

Trong chương này ta đã học cách biến đổi ma trận để di chuyển, quay và thu phóng các vector. Các phép biến đổi này rất cần thiết để có thể kết hợp các hình mà ta đã học ở các chương trước. Ở chương tiếp theo, ta sẽ áp dụng tất cả những kiến thức này để tạo nên các hoa văn tuyệt đẹp. Bạn sẽ thấy việc đó ngầu thế nào cho mà xem.