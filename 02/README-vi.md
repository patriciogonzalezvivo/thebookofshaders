## Hello World

Thông thường thì ví dụ "Hello World!" sẽ là bước đầu tiên khi học một ngôn ngữ lập trình mới. Đó là một chương trình đơn giản, in ra 1 dòng chữ chào đón.

Ở địa-bàn-của-GPU thì việc vẽ các ký tự chữ số là bước khởi đầu có phần quá phức tạp, thay vào đó chúng tôi chọn sẽ tô một màu tươi sáng lên màn hình để chào đón các bạn nồng nhiệt nhất!

<div class="codeAndCanvas" data="hello_world.frag"></div>

Nếu bạn đang đọc trên trình duyệt thì đoạn code phía trên có thể sửa được đấy. Điều đó có nghĩa là bạn có thể sửa bất kỳ phần nào bạn muốn. Thay đổi sẽ được cập nhật ngay lập tức nhờ vào kiến trúc GPU có khả năng biên dịch và cập nhật shader *thời gian thực*. Hãy thử thay đổi các giá trị ở dòng 8.

Dù chỉ có vài dòng code đơn giản thôi, nhưng ta có thể thu được nhiều thứ từ chúng lắm đấy:

1. Ngôn ngữ Shader có 1 hàm `main` trả về mã màu. Tương tự như ngôn ngữ C.

2. Màu cuối cùng của mỗi điểm ảnh được lưu vào biến toàn cục là `gl_FragColor`.

3. Ngôn ngữ nhìn-như-C này có sẵn vài *biến* (như `gl_FragColor`), *hàm* và *kiểu dữ liệu*. Trong trường hợp này, ta đã được giới thiệu về kiểu `vec4` lưu dữ liệu của một vector 4 chiều với độ chính xác của số thực. Sau này ta sẽ thấy các kiểu tương tự như `vec3` và `vec2` cũng như các kiểu dữ liệu phổ biến khác như: `float`, `int` và `bool`.

4. Nếu tinh ý, bạn sẽ nhận ra `vec4` lưu giá trị của 4 kênh đỏ (RED), xanh lá (GREEN), xanh dương (BLUE) và độ trong suốt (ALPHA). Và bạn cũng sẽ nhận thấy các giá trị này đã được chuẩn hoá **(normalized)**, có nghĩa là giá trị chỉ nằm trong khoảng từ `0.0` tới `1.0`. Sau này ta sẽ thấy các giá trị được chuẩn hoá sẽ giúp việc ánh xạ từ biến này sang biến kia trở nên dễ dàng như thế nào.

5. Một tính năng quan trọng khác (học từ ngôn ngữ C) ở trong ví dụ này là sự xuất hiện của các macro, chúng sẽ được xử lý ngay trước khi code được biên dịch. Bằng cách sử dụng macro, ta có thể `#define` các biến toàn cục và một vài thao tác điều kiện cơ bản (với `#ifdef` và `#endif`). Tất cả các lệnh macro đều được bắt đầu bằng ký hiệu hashtag (`#`). Ngay trước khi biên dịch, tất cả các lệnh điều kiện như `#ifdef` (nếu có macro) và `#ifndef` (nếu không có macro) sẽ được kiểm tra. Ở ví dụ "Hello World!" này, ta chỉ kiểm tra xem macro `GL_ES` có tồn tại không mà thôi. Macro này có tồn tại trên hầu hết các thiết bị điện thoại di động và trình duyệt, tức là dòng lệnh số 2 sẽ chỉ có tác dụng trên các nền tảng này.

6. Các kiểu dữ liệu số thực là yếu tố sống còn trong shader, nên việc quy định mức độ chính xác của chúng là tối quan trọng. Độ chính xác thấp đồng nghĩa với việc dựng hình nhanh hơn và đánh đổi lấy chất lượng thấp hơn. Bạn có thể tỉ mỉ điều chỉnh độ chính xác cho từng biến nếu muốn. Ở dòng 2 (`precision mediump float;`) ta đã quy định mức độ chính xác của toàn bộ các số thực ở mức trung bình. Nhưng cũng có thể giảm xuống mức thấp (`precision lowp float;`) hoặc tăng lên mức cao (`precision highp float;`).

7. Điều cuối cùng, có thể là quan trọng nhất, GLSL không đảm bảo các biến sẽ được chuyển đổi sang kiểu phù hợp. Điều đó nghĩa là gì ? Các nhà sản xuất có các cách tiếp cận khác nhau để tăng tốc card xử lý đồ hoạ của riêng họ nhưng đều phải tuân thủ các yêu cầu tối thiểu. Mà tự chuyển đổi kiểu dữ liệu thì không nằm trong số các yêu cầu bắt buộc đó. Trong ví dụ "Hello World!" của ta, `vec4` có độ chính xác của số thực nên giá trị mà nó lưu giữ nên có kiểu là `float`. Nếu bạn muốn viết code có độ ổn định cao mà không phải tốn hàng giờ ngồi debug trước màn hình trắng tinh, thì hãy làm quen với việc viết thêm dấu chấm (`.`) sau các số thực, nó giúp GPU biết đang phải xử lý một số thực. Đoạn code dưới đây không phải lúc nào cũng chạy đúng:

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);	// LỖI
}
```

Ta vừa mới mô tả những yếu tố cơ bản nhất trong chương trình "Hello World!", giờ là lúc để tự sửa code và bắt đầu áp dụng những gì mới được học. Bạn sẽ nhận ra nếu có lỗi thì chương trình không thể biên dịch được còn màn hình sẽ hiển thị màu trắng. Hãy thử vài thứ thú vị sau xem sao:

* Thử thay số thực bằng số nguyên, có thể card đồ hoạ của bạn vẫn chấp nhận đó

* Thử comment dòng số 8 và không lưu lại bất kỳ giá trị điểm ảnh nào

* Thử tạo một hàm mới chỉ trả về duy nhất một màu cố định và gọi hàm đó trong hàm `main()`. Gợi ý, đây là ví dụ một hàm trả về màu đỏ:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Có nhiều cách khởi tạo kiểu `vec4`, sau đây là 1 trong số chúng:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Dù ví dụ này không hấp dẫn lắm, nhưng nó là ví dụ cơ bản nhất - ta đã đổi màu của toàn bộ canvas sang một màu cố định. Ở chương tới ta sẽ tìm cách đổi màu điểm ảnh dựa theo vị trí của nó và thời điểm mà trang web được load nữa.
