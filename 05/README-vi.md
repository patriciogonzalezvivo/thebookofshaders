# Các thuật toán hình học
## Các hàm số cơ bản (Hàm hình dạng - Shape function)

Chương này có thể đặt tên là "bài học sơn hàng rào của ngài Miyagi". Trước đó, ta đã ánh xạ toạ độ *x* và *y* sang các kênh *RED* và *GREEN*. Ta cũng đã tạo ra một hàm nhận một vector 2 chiều (x, y) làm tham số đầu vào và trả ra một vector 4 chiều (r, g, b, a). Nhưng trước khi đi sâu vào việc biến đổi dữ liệu giữa các kiểu thì ta cần bắt đầu từ những thứ đơn giản hơn ... rất nhiều. Đó là việc tạo ra các hàm chỉ xử lý vector 1 chiều. Càng bỏ thời gian và công sức học cho thuẩn thục kỹ năng này, võ karate-shader của bạn sẽ càng cao siêu.

![The Karate Kid (1984)](mr_miyagi.jpg)

Cấu trúc code dưới đây sẽ là hàng rào của chúng ta. Trong đó, ta chuẩn hoá giá trị *x* (`st.x`) bằng 2 cách: một là với cường độ sáng (quan sát gradient từ đen sang trắng) và hai là vẽ đồ thị một đường màu xanh lá đè lên trên (trường hợp này giá trị của *x* được gán trực tiếp cho *y*). Đừng tập trung quá nhiều vào hàm vẽ đồ thị, ta sẽ đi vào chi tiết sau.

<div class="codeAndCanvas" data="linear.frag"></div>

**Chú thích**: Hàm khởi tạo `vec3` sẽ tự động "nhận ra" bạn muốn gán màu của cả 3 kênh RGB giống nhau ở dòng 19. Còn hàm khởi tạo `vec4` thì "nhận ra`" bạn muốn tạo một vector 4 chiều từ một vector 3 chiều kết hợp một số thực nữa dành cho chiều thứ tư, ở dòng 25.

Đoạn code này là hàng rào của bạn; nên hãy tập trung quan sát kỹ. Bạn sẽ còn sử dụng khoảng `0.0` và `1.0` này nhiều lần nữa. Bạn sẽ thuần thục kỹ năng tạo nên đồ thị này.

Ánh xạ một-một giữa *x* và *y* (phần gradient đen trắng) được gọi là *nội suy tuyến tính (linear interpolation)*. Ta có thể thay các hàm toán học khác để thay đổi hình dáng của đồ thị. Ví dụ ta có thể vẽ đồ thị luỹ thừa 5 của *x* để có được đường cong như hình dưới.

<div class="codeAndCanvas" data="expo.frag"></div>

Thú vị phải không ? Ở dòng 22, hãy thử các số mũ khác nhau như: 20.0, 2.0, 1.0, 0.0, 0.2 và 0.02 chẳng hạn. Hiểu được mối quan hệ giữa giá trị và số mũ sẽ rất hữu ích. Bằng cách sử dụng các hàm toán học ở đây bạn sẽ nắm rõ hơn về cách điều khiển các đường cong.

[`pow()`](..glossary/?lan=vi&search=pow) là hàm có sẵn trong số rất nhiều hàm của GLSL. Hầu hết đều được tăng tốc tính toán bởi phần cứng, có nghĩa là nếu được dùng đúng cách nó sẽ giúp code chạy nhanh hơn.

Hãy thay hàm luỹ thừa ở dòng 22 bằng các hàm khác như: [`exp()`](..glossary/?lan=vi&search=exp), [`log()`](..glossary/?lan=vi&search=log) và [`sqrt()`](..glossary/?lan=vi&search=sqrt). Một số hàm sẽ cho kết quả thú vị nếu bạn sử dụng hằng số PI. Ở dòng 8 tôi có định nghĩa macro sẽ thay thế tất cả những chỗ `PI` xuất hiện bằng hằng số `3.14159265359`.

### Step và Smoothstep

GLSL cũng có vài hàm số riêng biệt được tăng tốc bởi phần cứng.

Hàm [`step()`](..glossary/?lan=vi&search=step) nhận 2 tham số đầu vào. Tham số đầu tiên là một ngưỡng giới hạn nào đó, còn tham số thứ 2 là giá trị mà ta muốn biết có vượt qua ngưỡng giới hạn kia không. Bất kỳ giá trị nào nhỏ hơn ngưỡng sẽ cho kết quả `0.0` và ngược lại, tất cả các giá trị lớn hơn ngưỡng sẽ cho kết quả `1.0`.

Hãy thử thay giá trị ở dòng 20 của đoạn code dưới đây.

<div class="codeAndCanvas" data="step.frag"></div>

Một hàm tương tự là [`smoothstep()`](..glossary/?lan=vi&search=smoothstep). Tham số đầu vào là 1 khoảng min-max kèm thêm 1 giá trị. Hàm này sẽ nội suy giá trị đó trong khoảng min-max, các giá trị nằm ngoài khoảng này sẽ trở min hoặc max tuỳ theo nó nằm ở phía nào của khoảng đã cho.

<div class="codeAndCanvas" data="smoothstep.frag"></div>

Ở ví dụ trước, dòng 12, chú ý rằng ta đã dùng hàm `smoothstep` để vẽ đồ thị trong hàm `plot()`. Nếu muốn đồ thị trồi lên ở một đoạn nào đó thì làm thế nào ? Bằng cách ghép hai hàm [`smoothstep()`](..glossary/?lan=vi&search=smoothstep) lại. Hãy thay dòng code dưới đây vào dòng 20. Trông như ta đã chẻ đôi canvas ra phải không ?

```glsl
float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
```

### Sin và Cos

Khi bạn muốn dùng Toán để tạo chuyển động, tạo hình hay pha trộn các giá trị, không có gì tốt hơn việc làm quen với sin và cos.

Hai hàm lượng giác cơ bản này kết hợp với nhau để tạo nên những vòng tròn đa năng như dao gấp quân đội Thuỵ Sỹ của MacGyver vậy. Việc tìm hiểu cách chúng hoạt động và kết hợp với nhau ra sao rất quan trọng. Về cơ bản, cho một góc bất kỳ (đơn vị radian), hai hàm này sẽ cho kết quả là tọa độ *x* ([cos](..glossary/?lan=vi&search=cos)) và *y* ([sin](..glossary/?lan=vi&search=sin)) của 1 điểm trên đường tròn có bán kính bằng 1. Và chính việc kết quả thu được từ 2 hàm này vừa biến thiên một cách mềm mại lại còn luôn được chuẩn hoá sẵn theo cặp và cả đơn lẻ (trong khoảng -1 tới 1) khiến cho 2 hàm này trở thành các công cụ siêu hữu ích.

![](sincos.gif)

Mặc dù rất khó để mô tả mối liên hệ giữa các hàm lượng giác với đường tròn, nhưng chuyển động đẹp tuyệt trên đây đã làm rất tốt nhiệm vụ mô tả tóm tắt mối liên hệ này.

<div class="simpleFunction" data="y = sin(x);"></div>

Hãy nhìn thật kỹ đồ thị hình sine. Chú ý cách mà các giá trị *y* biến thiên rất mượt giữa +1 và -1. Như ta đã thấy ở ví dụ có sử dụng thời gian ở chương trước, bạn có thể sử dụng tính chất tuần hoàn này của hàm [`sin()`](..glossary/?lan=vi&search=sin) để áp dụng cho các thuộc tính. Nếu bạn đang đọc trên trình duyệt, bạn có thể sửa đoạn code phía trên để xem các sóng đồ thị thay đổi như thế nào. (Chú ý: Đừng quên dấu chấm phẩy ở cuối dòng.)

Hãy thử các thay đổi sau và xem điều gì xảy ra:

* Cộng `u_time` với *x* trước khi gọi hàm `sin`. Bạn sẽ thấy sóng đồ thị sẽ dịch chuyển dọc theo trục hoành.

* Nhân *x* với `PI` trước khi gọi hàm `sin`. Bạn sẽ thấy 2 chu kỳ bị **co lại** và lặp lại mỗi 2 đơn vị số nguyên.

* Nhân `u_time`với *x* trước khi gọi hàm `sin`. Bạn sẽ thấy **tần số (frequency)** giữa các chu kỳ ngày càng ngắn lại. Chú ý rằng u_time càng lớn thì càng khó nhìn rõ đồ thị do các chu kỳ bị co lại rất nhiều.

* Cộng 1.0 vào [`sin(x)`](..glossary/?lan=vi&search=sin). Và bạn sẽ thấy toàn bộ sóng được **nâng lên (displaced)** khiến cho giá trị nằm trong khoảng 0.0 và 2.0.

* Nhân [`sin(x)`](..glossary/?lan=vi&search=sin) với 2.0. Và bạn sẽ thấy **biên độ (amplitude)** rộng gấp đôi.

* Tính giá trị tuyệt đối ([`abs()`](..glossary/?lan=vi&search=abs)) của hàm `sin(x)`. Trông đồ thị sẽ giống như đường đi của quả bóng nảy trên mặt đất.

* Tách riêng phần thập phân bằng hàm [`fract()`](..glossary/?lan=vi&search=fract)từ kết quả của [`sin(x)`](..glossary/?lan=vi&search=sin).

* Làm tròn lên bằng hàm [`ceil()`](..glossary/?lan=vi&search=ceil) và làm tròn xuống bằng hàm [`floor()`](..glossary/?lan=vi&search=floor) từ kết quả của [`sin(x)`](..glossary/?lan=vi&search=sin) để có được sóng điện tử của các giá trị 1 và -1.

### Các hàm hữu ích khác

Chúng tôi vừa mới giới thiệu cho các bạn 1 vài hàm mới. Giờ là lúc thử nghiệm từng hàm một bằng cách uncomment từng dòng dưới đây một. Hãy làm quen với các hàm này. Tôi biết bạn đang thắc mắc ... tại sao ? Google nhanh với từ khoá "generative art" sẽ cho bạn câu trả lời. Hãy nhớ rằng các hàm này là hàng rào của chúng ta. Chúng ta đang dần thuần thục với các chuyển động 1 chiều, chỉ có lên và xuống. Sớm thôi, ta sẽ đụng tới các chiều thứ hai, ba và bốn!

![Anthony Mattox (2009)](anthony-mattox-ribbon.jpg)

<div class="simpleFunction" data="y = mod(x,0.5); // tính phần dư của phép tính x / 0.5
//y = fract(x); // tách phần thập phân của x
//y = ceil(x);  // làm tròn lên
//y = floor(x); // làm tròn xuống
//y = sign(x);  // lấy dấu âm dương của x
//y = abs(x);   // tính giá trị tuyệt đối của x
//y = clamp(x,0.0,1.0); // kẹp x trong khoảng 0.0 và 1.0
//y = min(0.0,x);   // tìm số nhỏ nhất giữa 2 số 0.0 và x
//y = max(0.0,x);   // tìm số lớn nhất giữa 2 số 0.0 và x "></div>

### Các hàm nâng cao

[Golan Levin](http://www.flong.com/) có tài liệu mô tả rất chi tiết về các hàm phức tạp khác vô cùng hữu ích. Ứng dụng chúng vào GLSL sẽ là một bước đi thông minh để bắt đầu dựng nên thư viện code của chính bạn.

* Các hàm đa thức: [www.flong.com/archive/texts/code/shapers_poly](http://www.flong.com/archive/texts/code/shapers_poly/)

* Các hàm luỹ thừa: [www.flong.com/archive/texts/code/shapers_exp](http://www.flong.com/archive/texts/code/shapers_exp/)

* Các hàm mô phỏng đường tròn và elip: [www.flong.com/archive/texts/code/shapers_circ](http://www.flong.com/archive/texts/code/shapers_circ/)

* Đường cong Bezier và các hàm tương tự: [www.flong.com/archive/texts/code/shapers_bez](http://www.flong.com/archive/texts/code/shapers_bez/)

<div class="glslGallery" data="160414041542,160414041933,160414041756" data-properties="clickRun:editor,hoverPreview:false"></div>

Như một đầu bếp đi thu thập các kỳ hoa dị thảo, nghệ sỹ kỹ thuật số và các lập trình viên đồ hoạ cũng sẽ có niềm yêu thích riêng với các hàm nội suy của riêng họ.

[Iñigo Quiles](http://www.iquilezles.org/) có 1 bộ sưu tầm các [hàm](http://www.iquilezles.org/www/articles/functions/functions.htm) rất hữu ích. Sau khi đọc [bài báo này](http://www.iquilezles.org/www/articles/functions/functions.htm) hãy xem cách thực thi các hàm đó trong GLSL. Hãy chú ý tới các tiểu tiết như thêm dấu chấm "." vào sau các số thực và sử dụng cách đặt tên hàm của ngôn ngữ C vào GLSL; ví dụ thay vì `powf()` hãy dùng `pow()`: 

<div class="glslGallery" data="05/impulse,05/cubicpulse,05/expo,05/expstep,05/parabola,05/pcurve" data-properties="clickRun:editor,hoverPreview:false"></div>

Để tạo động lực cho bạn, đây là 1 ví dụ hoàn hảo (tạo nên bởi [Danguafer](https://www.shadertoy.com/user/Danguafer)) về việc thuần thục môn võ karate-hàm-số.

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/XsXXDn?gui=true&t=10&paused=true" allowfullscreen></iframe>

Ở các chương tiếp theo *(Next >>)* chúng ta sẽ học các chiêu mới. Đầu tiên là trộn màu rồi sau đó là vẽ hình.

#### Bài tập

Hãy nhìn vào bảng các phương trình dưới đây, được tạo bởi [Kynd](http://www.kynd.info/log/). Hãy xem cách mà anh ấy kết hợp các hàm lại với nhau để kiểm soát các giá trị nằm trong khoảng 0.0 và 1.0. Giờ là lúc bạn tập luyện bằng cách dựng lại các hàm này. Hãy nhớ rằng càng luyện tập chăm chỉ bạn sẽ càng giỏi võ.

![Kynd - www.flickr.com/photos/kynd/9546075099/ (2013)](kynd.png)

#### Một vài công cụ cho bạn

Đây là một vài công cụu sẽ giúp bạn vẽ đồ thị các hàm 1 cách trực quan nhất.

* Grapher: Nếu bạn dùng máy Mac, gõ `grapher` trong Spotlight và bạn có thể dùng ngay công cụ siêu tiện ích này.

![OS X Grapher (2004)](grapher.png)

* [GraphToy](http://www.iquilezles.org/apps/graphtoy/): Thêm một sản phẩm nữa của [Iñigo Quilez](http://www.iquilezles.org) để minh hoạ các hàm GLSL trên WebGL.

![Iñigo Quilez - GraphToy (2010)](graphtoy.png)

* [Shadershop](http://tobyschachman.com/Shadershop/): Công cụ tuyệt vời này của [Toby Schachman](http://tobyschachman.com/) sẽ dạy bạn cách để tạo nên các hàm số phức tạp theo cách đơn giản nhất.

![Toby Schachman - Shadershop (2014)](shadershop.png)
