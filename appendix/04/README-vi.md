## Giới thiệu cho người đã biết Javascript
Tác giả: [Nicolas Barradeau](http://www.barradeau.com/)

Nếu bạn là developer Javascript, khả năng cao là bạn sẽ thấy hoang mang một chút khi đọc quyển sách này.
Thực tế là có rất nhiều điểm khác biệt khi code JavaScript vốn chỉ là bề nổi, so với việc phải đụng tới shader ở sâu bên dưới tảng băng chìm.
Tuy nhiên, không giống với ngôn ngữ nền tảng là Assembly, GLSL rất gần với ngôn ngữ mà con người có thể hiểu được, và tôi tin rằng một khi bạn đã nắm được các đặc tính của nó thì bạn sẽ bắt kịp rất nhanh thôi.

Coi như bạn đã biết về Javascript và cả Canvas API đi.
Mà nếu có chưa biết mấy thì cũng đừng lo, bạn vẫn sẽ hiểu được phần lớn nội dung của phần này thôi.

Tất nhiên tôi sẽ không đi sâu vào chi tiết và một vài điều tôi nói có thể _không chính xác hoàn toàn_, nên đừng kỳ vọng nó được như "cầm tay chỉ việc" mà hãy coi nó như

### MỘT CÁI ÔM NỒNG ẤM

JavaScript rất thích hợp để thử nghiệm nhanh ; bạn chỉ việc viết vài hàm đơn giản, không có ràng buộc gì về kiểu dữ liệu, tuỳ ý thêm bớt các hàm của class, tải lại trang web là đã thấy ngay kết quả rồi,
sau đó lại sửa một tí, tải lại trang, cứ thế lặp lại, dễ như ăn kẹo.

Thế GLSL thì có gì khác JavaScript chứ.
Suy cho cùng thì cả 2 đều chạy trên trình duyệt mà, chúng đều vẽ một vài thứ lên màn hình đó thôi, mà riêng về khía cạnh đó thì dùng JavaScript dễ hơn.

Ừ thì, điểm khác biệt chính nằm ở chỗ Javascript là một ngôn ngữ **thông dịch (interpreted)** còn GLSL thì là một ngôn ngữ **biên dịch (compiled)**.
Một chương trình **biên dịch** được thực thi trực tiếp bởi hệ điều hành, là một chương trình bậc thấp và thường chạy rất nhanh.
Còn một chương trình **thông dịch** thì lại cần một [Máy ảo (Virtual Machine / VM)](https://en.wikipedia.org/wiki/Virtual_machine) để thực thi, nó là một chương trình bậc cao và thường chậm hơn.

Khi một trình duyệt (chính xác phải là _**máy ảo** JavaScript_ mới đúng) **thực thi** hoặc **thông dịch** một đoạn mã, nó chẳng biết biến nào có ý nghĩa gì hay hàm này sẽ cho kết quả gì (ngoại trừ **TypedArrays**).
Vì thế nó chẳng thể tối ưu bất kỳ cái gì _trước khi thực thi_ cả, nó còn cần thời gian để dịch code của bạn này, rồi thì đoán xem kiểu dữ liệu của các biến là gì này và nếu được thì cố gắng chuyển một phần sang dạng mã Assembly để code chạy nhanh hơn.

Đó là cả một quá trình cồng kềnh, phức tạp và có phần lề mề, nếu bạn hứng thú đi vào chi tiết thì tôi xin giới thiệu tìm hiểu [cách mà trình thông dịch V8 của Chrome hoạt động](https://developers.google.com/v8/).
Điểm tệ nhất đó là, mỗi trình duyệt lại tự tối ưu mã JavaScript theo một cách riêng mà quá trình này _hoàn toàn_ nằm ngoài tầm với của bạn.

Còn một chương trình **biên dịch** thì không như thế ; hệ điều hành thực thi nó, nếu chương trình không có lỗi biên dịch thì cứ thế mà chạy thôi.
Nếu bạn quên một dấu chấm phẩy cuối dòng thì khả năng cao là bạn sẽ được thông báo còn code của bạn thì thậm chí còn chưa được biên dịch thành chương trình cơ.

Hơi phũ, nhưng đó chính là cách mà **shader** hoạt động: _một chương trình được biên dịch để thực thi trên GPU_.
Đừng sợ! Một **trình biên dịch** sẽ là chiến hữu đáng tin cậy nhất của bạn.
Các ví dụ trong quyển sách này và [người đồng hành editor online](http://editor.thebookofshaders.com/) rất thân thiện.
Nó sẽ chỉ ra cho bạn thấy tại sao code của bạn không biên dịch được và bạn phải sửa chỗ nào, và nếu bạn làm đúng thì kết quả hiển thị ngay lập tức luôn.
Đó là một cách tuyệt vời để học vì nó rất trực quan và bạn chẳng phải sợ sẽ làm hỏng cái gì cả.

Điểm lưu ý cuối cùng, một chương trình **shader** được tạo nên bởi 2 chương trình con, đó là **vertex shader** và **fragment shader**.
Về cơ bản thì **vertex shader** sẽ nhận tham số đầu vào là các khối hình học rồi biến chúng thành các **điểm ảnh (pixel)** (hoặc *fragment*) rồi chuyển kết quả cho **fragment shader** xử lý tiếp, vốn công việc chính là tô màu từng điểm ảnh.
Quyển sách này hầu như chỉ tập trung vào chương trình thứ hai. Trong tất cả các ví dụ, khối hình được sử dụng chỉ là một tứ giác lấp đầy cả màn hình.

Vậy! Bạn đã sẵn sàng chưa ?
Tiếp tục nhé!

### Quy định kiểu dữ liệu một cách chặt chẽ
![Kết quả tìm kiếm đầu tiên với từ khoá 'strong type' trên Google Image, ngày 2016/05/20](strong_type.jpg)

Khi bạn đã quen với JavaScript hay các ngôn ngữ không quan trọng về kiểu dữ liệu, thì việc phải **quy định kiểu dữ liệu** cho mỗi biến là một khái niệm xa lạ, cũng khiến cho nó trở thành rào cản lớn nhất khi làm quen với GLSL.
**Kiểu dữ liệu**, như chính cái tên của nó, có nghĩa là bạn phải chỉ định mỗi biến (và cả hàm nữa) sử dụng kiểu dữ liệu gì.
Về cơ bản thì việc dùng chung một từ khoá **`var`** cho tất cả các biến đã không còn nữa.
GLSL không cho phép điều đó xảy ra nên bạn có muốn cũng không được.

Thay vì dùng từ khoá **`var`** thần thánh, bạn sẽ phải _chỉ đích danh kiểu dữ liệu cho từng biến một_, sau đó thì trình biên dịch sẽ biết chính xác đang phải xử lý cái gì và làm thế nào thì hiệu quả nhất. Nhược điểm của việc này là bạn phải hiểu tất cả các kiểu dữ liệu, mà lại còn phải hiểu tường tận nữa cơ.
May thay, chỉ có một vài kiểu dữ liệu thôi và cũng khá đơn giản nữa.

Nghe thì đáng sợ chứ thực ra nó không quá khác với code JavaScript mà bạn vẫn hay dùng đâu ; nếu một biến có kiểu `boolean` thì bạn sẽ trông đợi nó chỉ lưu trữ một trong hai giá trị `true` hoặc `false` mà thôi.
Nếu một biến được khai báo là `var uid = XXX;`, thì có khả năng đó là một số nguyên còn nếu nó được khai báo là `var y = YYY;` có thể nó trỏ tới một số thực.
Còn với ngôn ngữ **quy định kiểu dữ liệu (strong type)**, bạn sẽ không phí thời gian đoán xem 2 biến đó có cùng kiểu không, bằng các biểu thức `X == Y` (hay `typeof X == typeof Y` ? .. hoặc `typeof X !== null && Y...` ...) ; bạn sẽ biết chắc điều đó đúng hay sai mà kể cả bạn không để ý thì trình biên dịch sẽ làm thay việc đó.

Đây là các **kiểu dữ liệu đơn (scalar)** trong GLSL: `bool` (Đúng sai), `int`(Số nguyên), `float`(Số thực).
Còn vài kiểu nữa nhưng cứ từ từ, đoạn code mẫu dưới đây khai báo các biến (đừng quên **`var`** không tồn tại trong thế giới GLSL nhé):

```glsl
// Khai báo một biến boolean
JavaScript: var b = true;               GLSL: bool b = true;

// Khai báo một số nguyên
JavaScript: var i = 1;                  GLSL: int i = 1;

// Khai báo một số thực
JavaScript: var f = 3.14159;            GLSL: float f = 3.14159;
```

Không có gì khó phải không ? Như đã nói ở trên, nó thậm chí còn giúp bạn đỡ đau đầu khi code ấy chứ. Nếu còn nghi ngờ về điều đó thì cứ tạm bỏ qua, chỉ cần biết nó giúp chương trình của bạn chạy nhanh hơn JavaScript nhiều là cũng đủ rồi.

#### void
Có kiểu `void` tương đương với  `null`, nó được dùng khi hàm không trả về kết quả gì cả.
Và bạn không thể khai báo biến kiểu này.

#### boolean
Các biến kiểu boolean hầu hết được sử dụng trong các câu lệnh điều kiện như ; `if( myBoolean == true ){}else{}`.
Nếu các nhánh điều kiện rất hay gặp ở CPU, thì [kiến trúc song song của GPU](http://thebookofshaders/01/) lại hạn chế đất diễn của chúng.
Thậm chí việc sử dụng các lệnh điều kiện còn không được khuyến khích ở đa phần các trường hợp, trong quyển sách này có một vài kỹ thuật để xử lý các trường hợp đó.

#### Ép kiểu
Như [Boromir](https://en.wikipedia.org/wiki/Boromir) đã nói, "One does not simply combine Typed primitives". Không như JavaScript, GLSL không cho phép thực hiện các phép toán giữa các toán hạng không cùng kiểu.

Ví dụ sau:
```glsl
int     i = 2;
float   f = 3.14159;

// thử nhân một số nguyên với một số thực
float   r = i * f;
```
sẽ không cho kết quả tốt vì bạn đang cố lai con **_mèo_** với con **_hươu cao cổ_**.
Giải pháp là **ép kiểu (type casting)** ; đoạn code sau sẽ giúp _trình biên dịch tin rằng_ *`i`* cũng có kiểu `float` dù *`i`* vẫn giữ nguyên kiểu vốn có:
```glsl
// ép biến `i` từ kiểu int sang float
float   r = float( i ) * f;
```

Điều này giống như việc cho con **_mèo_** mặc đồ của con **_hươu cao cổ_** vậy, và nó sẽ có hiệu quả (`r` sẽ kết quả của phép toán `i` x `f`).

Bạn có thể ép kiểu qua lại giữa tất cả các kiểu phía trên, chú ý là khi chuyển từ số thực sang số nguyên thì phần thập phân sẽ biến mất, tương đương với việc dùng hàm `Math.floor()`. Ép một số thực `float` hoặc một số nguyên `int` sang kiểu `bool` sẽ cho kết quả `true` nếu số đó khác 0.

#### Hàm khởi tạo (constructor)
Kiểu dữ liệu của biến cũng chính là hàm khởi tạo của class tương ứng ; thực tế thì một số thực `float` có thể coi là 1 _`instance`_ của class _`Float`_.

Các lệnh sau đây đều hợp lệ và cho kết quả giống nhau

```glsl
int     i = 1;
int     i = int( 1 );
int     i = int( 1.9995 );
int     i = int( true );
```
Trông thì không giống kiểu `scalar` lắm, và cũng na ná **ép kiểu**, nhưng mọi sự sẽ sáng tỏ ở phần *overload*.

OK, vậy là ta đã biết về ba `kiểu dữ liệu cơ bản`, những thứ mà bạn không thể sống nếu thiếu được và đương nhiên là GLSL còn nhiều kiểu khác.

### Vector
![Kết quả tìm kiếm đầu tiên với từ khoá 'vector villain' trên Google Image, ngày 2016/05/20](vector.jpg)

Trong cả JavaScript lẫn GLSL, bạn sẽ cần những cách tinh vi hơn để xử lý dữ liệu, và **`vectors`** khi đó rất hữu ích.
Tôi cho rằng bạn đã sử dụng class `Point` trong JavaScript để lưu 2 giá trị `x` và `y` cùng lúc rồi, code sẽ trông thế này:
```glsl
// Khai báo 'class':
var Point = function( x, y ){
    this.x = x || 0;
    this.y = y || 0;
}

// và bạn sẽ tạo một instance mới như sau
var p = new Point( 100,100 );
```

Như ta thấy, có quá nhiều điểm không hợp lý. Từ khoá **`var`** vồn dùng cho biến thì lại được dùng để khai báo class rồi thì **`this`** chả hiểu ở đâu ra, xong lại `x` với `y` chả biết kiểu dữ liệu gì ...
Kiểu này là không ổn với shader đâu.

Thay vào đó, GLSL có sẵn các cấu trúc dữ liệu để lưu trữ các biến đồng thời, có thể kể ra:
 * `bvec2`: Vector boolean 2 chiều, `bvec3`: Vector boolean 3 chiều, `bvec4`: Vector boolean 4 chiều
 * `ivec2`: Vector số nguyên 2 chiều, `ivec3`: Vector số nguyên 3 chiều, `ivec4`: Vector số nguyên 4 chiều
 * `vec2`: Vector số thực 2 chiều, `vec3`: Vector số thực 3 chiều, `vec4`: Vector số thực 4 chiều

Bạn nhận ra là có đủ các loại **vector** cho mỗi kiểu dữ liệu cơ bản, tuyệt vời ông mặt giời.
Từ giải thích trên đây, ta có thể suy luận được rằng `bvec2` sẽ gồm 2 giá trị kiểu `bool` còn `vec4` sẽ gồm 4 số thực kiểu `float`

Một điểm mới nữa từ vector là các **chiều (dimension)**, không phải bạn dựng hình 2D thì dùng vector 2 chiều còn dựng hình 3D thì dùng vector 3 chiều đâu nhé. Nếu vậy thì vector 4 chiều dùng để dựng hình gì ? (Thực ra thì không gian 4 chiều có tên riêng đấy, là tesseract hoặc khối siêu lập phương - hypercube)

Nhưng không phải thế đâu nhé, từ **chiều** ở đây chỉ nói về số giá trị được lưu giữ trong mỗi **vector** thôi:
```glsl
// tạo một vector boolean 2 chiều
bvec2 b2 = bvec2 ( true, false );

// tạo một vector số nguyên 3 chiều
ivec3 i3 = ivec3( 0,0,1 );

// tạo một vector số thực 4 chiều
vec4 v4 = vec4( 0.0, 1.0, 2.0, 1. );
```
`b2` gồm 2 giá trị boolean, `i3` gồm 3 số nguyên `v4` gồm 4 số thực.

Làm thế nào để sử dụng từng giá trị trong vector?
Với kiểu dữ liệu đơn thì quá đơn giản ; nếu ta có `float f = 1.2;` thì biến `f` sẽ có giá trị `1.2`.
Còn với **vector** thì hơi khác và cũng kỳ diệu hơn một chút.

#### Truy cập
Có nhiều cách để truy cập các giá trị bên trong vector
```glsl
// Đầu tiên hãy tạo một vector số thực 4 chiều
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );
```
Để lấy từng giá trị trong vector, ta có thể viết:
```glsl
float x = v4.x;     // x = 0.0
float y = v4.y;     // y = 1.0
float z = v4.z;     // z = 2.0
float w = v4.w;     // w = 3.0
```
rất dễ dàng, nhưng còn nhiều cách khác cũng cho kết quả tương tự:
```glsl
float x =   v4.x    =   v4.r    =   v4.s    =   v4[0];     // x = 0.0
float y =   v4.y    =   v4.g    =   v4.t    =   v4[1];     // y = 1.0
float z =   v4.z    =   v4.b    =   v4.p    =   v4[2];     // z = 2.0
float w =   v4.w    =   v4.a    =   v4.q    =   v4[3];     // w = 3.0
```

Nếu bạn tinh ý thì sẽ nhận ra:
   * `X`, `Y`, `Z` và `W` được dùng để mô tả các vector trong đồ hoạ 3D
   * `R`, `G`, `B` và `A` được dùng để mô tả các kênh màu và alpha
   * `[0]`, `[1]`, `[2]` và `[3]` được dùng như một mảng cố định

Vậy nên tuỳ vào việc bạn đang xử lý các toạ độ 2D hay 3D, màu kèm theo alpha hoặc không, hay một vài con số bất kỳ, bạn có thể tuỳ chọn cách dùng **vector** bạn muốn.
Thường thì các toạ độ 2 chiều và các vector sẽ được lưu bằng các cấu trúc `vec2`, `vec3` hoặc `vec4`, màu sắc thì được lưu trong `vec3` hoặc `vec4` nếu bạn muốn lưu thêm kênh alpha nữa, không có ràng buộc nào cả.
Thậm chí, nếu bạn dùng cả một vector `bvec4` chỉ để lưu 1 giá trị boolean thì cũng được nốt, có điều hơi lãng phí bộ nhớ.

**Chú ý**: Trong shader, các giá trị của các kênh (`R`, `G`, `B`, `A`) đều được chuẩn hoá để nằm trong khoảng [0-1] chứ không phải [0x00-0xFF], vì thế tốt nhất là nên sử dụng vector số thực 4 chiều `vec4` để lưu trữ giá trị màu.

Hay quá phải không, chưa hết đâu nhé!

#### Tráo đổi (swizzle)

Ta có thể lấy ra nhiều hơn một giá trị nữa cơ ; giả sử bạn chỉ cần 2 giá trị `X` và `Y` từ một `vec4`, thì trong JavaScript, bạn sẽ phải làm như sau:
```glsl
var needles = [0, 1]; // vị trí của 'x' và 'y' trong array dưới đây
var a = [ 0,1,2,3 ]; // giả lập `vec4`
var b = a.filter( function( val, i, array ) {
return needles.indexOf( array.indexOf( val ) ) != -1;
});
// b = [ 0, 1 ]

// hoặc trực diện luôn
var needles = [0, 1];
var a = [ 0,1,2,3 ]; // giả lập `vec4`
var b = [ a[ needles[ 0 ] ], a[ needles[ 1 ] ] ]; // b = [ 0, 1 ]
```
Quá cồng kềnh. Hãy xem trong GLSL làm như thế nào:
```glsl
// Tạo một `vec4`
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );

// rồi chỉ lấy mỗi x và y ra
vec2 xy =   v4.xy; //   xy = vec2( 0.0, 1.0 );
```
Ủa cái gì vậy ?! Khi bạn **truy cập liên tiếp (concatenate accessors)**, GLSL sẽ trả về tập con của các giá trị bạn muốn, gói gọn trong một **vector** khác.
Thực ra thì vector là một cấu trúc dữ liệu cho phép truy cập ngẫu nhiên, nếu muốn bạn có thể tượng tượng nó giống array bên JavaScript vậy.
Vì thế, bạn không chỉ lấy được 1 tập con mà còn có thể chỉ định **thứ tự từng phần tử** muốn lấy nữa cơ. Đoạn code sau sẽ tráo đổi giá trị của các vector theo thứ tự ngược lại:
```glsl
// Tạo một vector R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

// Truy cập các gía trị theo thứ tự ngược lại
vec4 backwards = v4.abgr; // backwards = vec4( 1.0, 0.0, 0.8, 0.2 );
```
Hơn thế nữa, chẳng ai ngăn bạn lấy một phần tử nhiều lần:
```glsl
// Tạo một vector R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

// Và tạo một vector mới chỉ dùng giá trị của kênh G (2 lần) và A
vec3 GAG = v4.gag; // GAG = vec4( 0.8, 1.0, 0.8 );
```

Khă năng này quá ngầu khi phải xử lý vector, ví dụ như khi chỉ muốn lấy các kênh RGB của một màu có đủ RGBA chẳng hạn.

#### Overload tất cả

Ở phần kiểu dữ liệu, tôi đã nhắc tới điều gì đó liên quan tới **hàm khởi tạo (constructor)** và đây lại là 1 tính năng tuyệt vời nữa của GLSL ; **overload**.
Cho ai chưa biết, **overload** là một toán tử hoặc hàm số đại loại sẽ _'tự động thay đổi cách thực thi sao cho khớp với kiểu dữ liệu'_.
JavaScript không có overload, nên bạn có thể thấy nó hơi lạ lúc đầu, nhưng khi đã quen rồi thì bạn sẽ thắc mắc sao JavaScript lại không có tính năng này (ngắn gọn là do không ràng buộc kiểu dữ liệu đó).

Hãy xem ví dụ đơn giản nhất để hiểu overload là gì:

```glsl
vec2 a = vec2( 1.0, 1.0 );
vec2 b = vec2( 1.0, 1.0 );
// overload phép cộng
vec2 c = a + b;     // c = vec2( 2.0, 2.0 );
```
HẢ ? Hai giá trị không phải số đơn thuần mà cũng cộng được ?!

Chính xác là thế đó. Tất nhiên là áp dụng cho toàn bộ các toán tử khác (`+`, `-`, `*` & `/`) nữa nhưng đây mới là mở đầu thôi.
Hãy xem đoạn code sau:
```glsl
vec2 a = vec2( 0.0, 0.0 );
vec2 b = vec2( 1.0, 1.0 );
// overload hàm khởi tạo
vec4 c = vec4( a , b );         // c = vec4( 0.0, 0.0, 1.0, 1.0 );
```
Ta vừa mới tạo nên một `vec4` từ 2 `vec2`, bằng cách gán giá trị của `a.x` và `a.y` cho `X`, `Y` của `vec4`, rồi lại gán tiếp `b.x` và `b.y` cho `Z`, `W` của `vec4`

Đây là điều sẽ xảy ra khi một **hàm** được overload để chấp nhận các loại tham số khác nhau, cụ thể trong trường hợp này là hàm khởi tạo của `vec4`.
Điều đó có nghĩa là rất nhiều phiên bản khác nhau của cùng 1 hàm có thể cùng tồn tại, ví dụ các lệnh khai báo sau hoàn toàn hợp lệ:

```glsl
vec4 a = vec4(1.0, 1.0, 1.0, 1.0);
vec4 a = vec4(1.0);// cả 4 giá trị x, y, z, w đều bằng 1.0
vec4 a = vec4( v2, float, v4 );// vec4( v2.x, v2.y, float, v4.x );
vec4 a = vec4( v3, float );// vec4( v3.x, v3.y, v3.z, float );
etc.
```

Điều duy nhất bạn cần bận tâm là đảm bảo hàm tạo có đủ dữ liệu nó cần mà thôi.

Điều cuối cùng, bạn hoàn toàn có thể overload một hàm có sẵn bất kỳ sao cho nó phù hợp với yêu cầu của bạn (cũng không nên lạm dụng quá).

#### Các kiểu dữ liệu khác
Vector thật thú vị, và là vũ khí chính trong code shader.
Còn các cấu trúc dữ liệu khác như Ma trận và Texture sampler sẽ được bàn tới ở phần sau của quyển sách.

Bạn cũng có thể dùng Array. Tất nhiên là phải quy định kiểu rồi và sau đây là một vài điểm đáng lưu tâm:

 * Kích thước Array cố định
 * Không thể dùng các hàm push(), pop(), splice() vân vân và cũng không có thuộc tính ```length``` luôn nha
 * Không thể gán giá trị hàng loạt khi khởi tạo mà phải gán giá trị từng phần tử một

Code như sau sẽ không đúng:
```glsl
int values[3] = [0,0,0];
```
phải như thế này cơ:
```glsl
int values[3];
values[0] = 0;
values[1] = 0;
values[2] = 0;
```
Điều này cũng không quá tệ nếu bạn thật sự cần can thiệp từng phần tử trong array.
Còn nếu muốn đa dạng hơn thì có thể dùng kiểu ```struct```. Chúng giống như các _object_ nhưng không có hàm đi kèm ;
chúng chỉ cho phép đóng gói các biến vào bên trong thôi
```glsl
struct ColorStruct {
    vec3 color0;
    vec3 color1;
    vec3 color2;
}
```
sau đó bạn có thể sử dụng như sau:
```glsl
// Khởi tạo cấu trúc với giá trị nào đó
ColorStruct sandy = ColorStruct( 	vec3(0.92,0.83,0.60),
                                    vec3(1.,0.94,0.69),
                                    vec3(0.95,0.86,0.69) );

// Truy cập biến trong cấu trúc
sandy.color0 // vec3(0.92,0.83,0.60)
```
Cú pháp kiểu này có thể hơi tự do chút, nhưng nó sẽ giúp bạn viết code rõ ràng hơn hay ít nhất là nhìn dễ hiểu hơn.

#### Các lệnh điều khiển

Cấu trúc dữ liệu hay thật đấy nhưng tới lúc nào đó ta vẫn _có thể_ phải cần tới các lệnh điều khiển.
May mán là cú pháp rất giống với JavaScript.

Ví dụ về lệnh điều kiện:
```glsl
if( condition ){
    //true
}else{
    //false
}
```
Còn một vòng lặp thì thường giống như:
```glsl
const int count = 10;
for( int i = 0; i <= count; i++){
    // làm gì đó
}
```
hoặc với iterator:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    // làm gì đó
}
```
Chú ý là biến ```count``` phải được khai báo là một ```hằng số (constant)```.
Điều đó có nghĩa là ta phải đặt thêm từ khoá ```const``` vào trước như ví dụ dưới đây.

Ngoài ra ta cũng có các lệnh ```break``` và ```continue```:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    if( i < 5. )continue;
    if( i >= 8. )break;
}
```
Chú ý là trên một vài nền tảng phần cứng, lệnh ```break``` không hoạt động giống nhau nên vòng lặp vẫn chạy.

Nhìn chung thì bạn nên giữ số vòng lặp càng ít càng tốt và tránh sử dụng các lệnh điều kiện càng nhiều càng tốt.

#### qualifiers

Không chỉ có kiểu dữ liệu mà GLSL còn dùng **qualifier** để giúp trình biên dịch biết mỗi biến có gì đặc biệt.
Ví dụ có những dữ liệu chỉ được truyền từ CPU sang GPU gọi là **attribute** và **uniform**.
Từ khoá **attribute** được dùng trong vertex shader, còn **uniform** được dùng cho cả vertex shader và fragment shader.
Từ khoá ```varying``` để đánh dấu các biến luân chuyển giữa vertex shader và fragment shader.

Tôi sẽ không đi vào chi tiết ở đây vì ta chủ yếu tập trung vào **fragment shader** nhưng ở phần sau của quyển sách, bạn sẽ thấy code tương tự như:
```glsl
uniform vec2 u_resolution;
```
Tôi mới đặt từ khoá ```uniform``` vào trước kiểu dữ liệu của biến khi khai báo đó.
Điều này có nghĩa là CPU sẽ gửi thêm thông tin cho shader thông qua biến này. Cụ thể đó là độ phân giải của canvas, chiều rộng và chiều cao của canvas sẽ được lưu vào biến x và y của một vector 2 chiều.

Khi trình biên dịch thấy một biến có đánh dấu qualifier này, nó sẽ đảm bảo bạn không thể thay đổi giá trị trong shader.

Điều tương tự cũng được áp dụng cho biến ```count``` được dùng để giới hạn số vòng lặp ```for```:
```glsl
const float count = 10.;
for( ... )
```
Khi ta dùng qualifier ```const```, trình biên dịch sẽ đảm bảo rằng giá trị của biến này chỉ được khởi tạo một lần duy nhất, nếu không thì nó không phải là hằng số nữa rồi.

Còn 3 qualifier hay được dùng nữa cho các tham số của hàm là : ```in```, ```out``` và ```inout```.
Trong JavaScript, khi bạn truyền giá trị vào 1 hàm thì mọi thay đổi với giá trị đó chỉ có tác dụng trong hàm chứ không ảnh hưởng gì tới biến bên ngoài.
```glsl
function banana( a ){
    a += 1;
}
var value = 0;
banana( value );
console.log( value );// > 0 ; ra khỏi hàm thì value vẫn giữ nguyên giá trị như trước khi gọi hàm
```

Ý nghĩa của 3 qualifier tham số:
  * ```in``` không thay đổi giá trị của biến bên ngoài (mặc định cho mọi tham số)
  * ```out```  chỉ dùng để lưu giá trị mới mà vẫn giữ nguyên khi đã ra khỏi hàm
  * ```inout```  tuỳ ý đọc ghi

Viết lại hàm banana trong GLSL:
```glsl
void banana( inout float a ){
    a += 1.;
}
float A = 0.;
banana( A ); // lúc này A = 1.;
```
Điều này rất khác so với JavaScript và cũng rất tiện.

#### Không gian và toạ độ

Chú ý cuối cùng, trong DOM và Canvas 2D, trục Y hướng xuống dưới.
Điều này có lý trong bối cảnh DOM dựng trang web có thể scroll được ; từ trên xuống dưới.
Còn trong canvas của WebGL thì trục Y hướng lên trên.

Điều đó có nghĩa là gốc tọa độ, điểm (0, 0) nằm ở góc dưới cùng bên trái của WebGL canvas, chứ không phải góc trên cùng bên trái như 2D Canvas.
Toạ độ của texture cũng vì thế mà có thể gây lú một chút nếu chưa quen.

## Và thế là hết !
Tất nhiên ta có thể đi sâu hơn vào rất nhiều khái niệm phía trên, nhưng nhớ rằng đây chỉ là lời chào dành cho người mới.
Đúng là có rất nhiều thứ phải tìm hiểu nhưng với sự kiên trì và chăm chỉ thì sẽ quen nhanh thôi.

Tôi hy vọng bạn thấy một vài phần hữu ích ở đây, giờ thì bạn sẵn sàng bắt đầu chuyển phiêu lưu vào quyển sách chưa ?
