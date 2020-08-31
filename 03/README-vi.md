## Uniform

Tới giờ ta đã biết cách mà GPU xử lý 1 số lượng lớn các thread song song, mỗi cái chịu trách nhiệm đổi màu cho 1 vùng trong cả màn hình. Dù mỗi thread không biết các thread khác đang làm gì, ta vẫn phải gửi dữ liệu từ CPU tới cho từng thread. Kiến trúc của GPU yêu cầu dữ liệu gửi cho các thread phải giống nhau (*uniform*) và không được thay đổi (*read only*). 

Các dữ liệu đầu vào này được gọi là `uniform` và hỗ trợ hầu hết các kiểu dữ liệu cơ bản như: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` và `samplerCube`. Uniform được định nghĩa cùng với kiểu dữ liệu tương ứng, ở phần trên cùng của code shader, ngay sau khi quy định độ chính xác của các số thực.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Kích thước canvas (Rộng, cao)
uniform vec2 u_mouse;       // Vị trí con trỏ chuột trong canvas
uniform float u_time;       // Thời gian hiện tại tính từ lúc load xong shader
```

Bạn có thể hình dung uniform giống như các cầu nối giữa CPU và GPU. Tên của các biến có thể thay đổi theo từng chương trình nhưng trong quyển sách này tôi sẽ luôn dùng: `u_time` (thời gian hiện tại tính từ lúc load xong shader), `u_resolution` (kích thước vùng mà shader sẽ vẽ) và `u_mouse` (vị trí con trỏ chuột trong vùng được vẽ). Tôi dùng quy tắc thêm tiền tố `u_` vào trước các tên biến để đánh dấu các uniform. Ví dụ code trên [ShaderToy.com](https://www.shadertoy.com/) cũng sử dụng quy tắc riêng:

```glsl
uniform vec3 iResolution;   // Kích thước canvas
uniform vec4 iMouse;        // Vị trí con trỏ chuột trong canvas (xy=vị trí hiện tại, zw=vị trí click)
uniform float iTime;        // Thời gian hiện tại tính từ lúc load xong shader
```

Hãy xem thực tế uniform làm việc như thế nào. Ở đoạn code dưới đây tôi dùng `u_time` - thời gian hiện tại tính bằng giây, kể từ lúc load xong shader - với hàm sine để kiểm soát sắc đỏ trong canvas theo thời gian.

<div class="codeAndCanvas" data="time.frag"></div>

GLSL có nhiều điều thú vị. Phần cứng của GPU giúp tăng tốc các hàm lượng giác và luỹ thừa: [`sin()`](../glossary/?lan=vi&search=sin), [`cos()`](../glossary/?lan=vi&search=cos), [`tan()`](../glossary/?lan=vi&search=tan), [`asin()`](../glossary/?lan=vi&search=asin), [`acos()`](../glossary/?lan=vi&search=acos), [`atan()`](../glossary/?lan=vi&search=atan), [`pow()`](../glossary/?lan=vi&search=pow), [`exp()`](../glossary/?lan=vi&search=exp), [`log()`](../glossary/?lan=vi&search=log), [`sqrt()`](../glossary/?lan=vi&search=sqrt), [`abs()`](../glossary/?lan=vi&search=abs), [`sign()`](../glossary/?lan=vi&search=sign), [`floor()`](../glossary/?lan=vi&search=floor), [`ceil()`](../glossary/?lan=vi&search=ceil), [`fract()`](../glossary/?lan=vi&search=fract), [`mod()`](../glossary/?lan=vi&search=mod), [`min()`](../glossary/?lan=vi&search=min), [`max()`](../glossary/?lan=vi&search=max) và [`clamp()`](../glossary/?lan=vi&search=clamp). Chúng rất nhanh.

Cùng sửa đoạn code trên nào.

* Hãy giảm tần suất đổi màu xuống sao cho việc đổi màu khó có thể nhận ra được

* Hãy tăng tần suất đổi màu tới khi bạn chỉ nhìn thấy 1 màu duy nhất nhấp nháy liên tục

* Hãy thay đổi mỗi kênh RGB với một tần suất khác nhau, bạn sẽ thấy các kết quả rất bất ngờ

## gl_FragCoord

Tương tự như biến lưu trữ giá trị output trong GLSL, `vec4 gl_FragColor`, ta cũng có biến lưu trữ giá trị input, `vec4 gl_FragCoord`, là toạ độ của điểm ảnh (*pixel*) hoặc một vùng điểm ảnh (*screen fragment*) mà thread này đang xử lý. Ta biết rằng giá trị của `vec4 gl_FragCoord` khác nhau giữa từng thread, nên nó không phải là uniform.

<div class="codeAndCanvas" data="space.frag"></div>

Ở đoạn code trên ta chuẩn hoá *(normalize)* toạ độ của từng fragment bằng cách chia nó cho kích thước của canvas. Bằng cách này, giá trị nhận được sẽ luôn nằm trong khoảng từ `0.0` tới `1.0`, và sẽ khiến việc ánh xạ sang sắc độ RED và GREEN dễ hơn.

Trong shader ta không có nhiều cách để debug lắm bên cạnh việc thử dùng một màu rất chói để kiểm tra. Code shader thi thoảng cũng giống như dựng một chiếc thuyền bên trong một cái chai, rất khó nhưng đẹp và khiến ta thoả mãn.

![](08.png)

Giờ là lúc để thử xem ta hiểu code tới đâu.

* Bạn có biết toạ độ `(0.0, 0.0)` nằm ở đâu trên canvas không ?

* Vậy còn `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` và `(1.0, 1.0)`?

* Hãy tìm cách lấy màu tại vị trí con trỏ chuột khi được click và di chuyển nó đi bất kỳ chỗ nào con trỏ chuột đang ở

* Bạn có tưởng tượng được cách nào để tạo ra các mảng màu hay ho bằng cách sử dụng `u_time` và `u_mouse` không ?

Sau khi làm các bài tập này, bạn có thể sẽ thắc mắc mình có thể sử dụng năng-lực-shader mới này của mình ở đâu nữa. Ở chương tới ta sẽ xem làm thế nào để tạo shader bằng three.js, Processing, và openFrameworks.
