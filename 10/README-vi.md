# Các thiết kế ngẫu nhiên

Sẽ không quá bất ngờ nếu ta đưa thêm một chút phá cách vào thiết kế sau khi đã vẽ rất nhiều họa tiết lặp lại mang nặng tính sắp đặt.

## Ngẫu nhiên

[![Họa tiết test - Ryoji Ikeda (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

Ngẫu nhiên là kết quả của của entropy, sau một quá trình vận động tự do. Làm thế nào để ta đưa được sự ngẫu nhiên đó vào trong các khung hình dễ đoán vẫn vẽ trước giờ ?

Hãy cùng phân tích đoạn code sau:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Tôi tách phần thập phân của sóng sin ra. Hàm [```sin()```](../glossary/?lan=vi&search=sin) cho kết quả nằm trong khoảng [-1.0, 1.0], đã trở thành nhiều khoảng gián đoạn có giá trị trong phạm vi [0.0, 1.0]. Đồ thị này khá là khó để dự đoán với nhiều người, vì thế ta có thể tận dụng để làm giả sự ngẫu nhiên, đặc biệt là khi ta giãn đồ thị trên theo trục tung bằng cách nhân kết quả từ hàm [```sin(x)```](../glossary/?lan=vi&search=sin) với một số lớn. Hãy thử sửa code phía trên để chứng kiến tận mắt nhé.

Khi bạn tăng dần con số lên tới mức ```100000.0``` (công thức sẽ nhìn như sau: ```y = fract(sin(x)*100000.0)```), bạn sẽ không thể nhìn ra chu kỳ của sóng sin nữa. Chính sự gián đoạn của phần thập phân đã bẻ gãy đường cong liên tục của sóng sin và tạo nên sự hỗn loạn, nhìn như chúng được phân bổ một cách ngẫu nhiên vậy.

## Ngẫu nhiên có kiểm soát

Sử dụng cơ chế ngẫu nhiên không hề đơn giản; đôi khi nó không đủ ngẫu nhiên, có lúc lại quá hỗn loạn. Hãy nhìn đồ thị dưới đây, nó được vẽ bằng cách dùng hàm ```rand()```, vốn sử dụng chính công thức phía trên để tạo ra sự ngẫu nhiên.

Nếu nhìn kỹ, bạn sẽ thấy có khá nhiều điểm hội tụ ở ```-1.5707``` và ```1.5707```. Tôi cá là bạn biết tại sao - đó chính là vị trí các đỉnh sóng sin.

Nhìn kỹ hơn nữa, bạn sẽ thấy ở giữa tập trung nhiều hơn phía trên và phía dưới.

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

Cách đây vài năm, [Pixelero](https://pixelero.wordpress.com) đã đăng một [bài báo thú vị về phân bổ ngẫu nhiên](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). Tôi có đặt vài hàm mà ông mô tả trong bài báo vào đoạn code phía trên. Hãy thử dùng các hàm đó để xem phân bố ngẫu nhiên thay đổi như thế nào nhé.

Nếu bạn đọc [bài báo của Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), thì hãy nhớ là hàm ```rand()``` không thật sự ngẫu nhiên, nó được gọi là ngẫu nhiên giả (pseudo-random). Điều đó có nghĩa là nếu ta gọi hàm ```rand(1.)``` thì nó sẽ luôn trả về cùng 1 giá trị duy nhất. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) có nhắc tới hàm ```Math.random()``` của ActionScript, là hàm ngẫu nhiên không xác định, mỗi lần gọi hàm này sẽ cho một kết quả khác nhau.

## Ngẫu nhiên hai chiều

Ta đã hiểu thêm một chút về việc sinh số ngẫu nhiên từ một số khác, giờ hãy thử tạo ra các số ngẫu nhiên từ một cặp số xem sao. Để làm được việc đó, ta cần một cách mã hoá vector 2 chiều thành 1 số thực. Có rất nhiều cách để làm việc này, nhưng tôi thấy hàm [```dot()```](../glossary/?lan=vi&search=dot) rất tiện trong việc này. Kết quả của phép tích vô hướng sẽ nằm trong khoảng [0.0, 1.0], tuỳ vào góc giữa 2 vector.

<div class="codeAndCanvas" data="2d-random.frag"></div>

Hãy xem các dòng 13 và 15, bạn sẽ thấy tôi kết hợp ```vec2 st``` với một vector khác ( ```vec2(12.9898,78.233)```).

* Thử thay đổi các giá trị ở hai dòng 14 và 15 xem các điểm ngẫu nhiên thay đổi thế nào.

* Thử kết hợp hàm ngẫu nhiên này với vị trí con trỏ chuột (```u_mouse```) và thời gian (```u_time```) để hiểu rõ hơn.

## Tận dụng sự ngẫu nhiên

Ngẫu nhiên 2 chiều trông khá giống màn hình TV bị nhiễu phải không ? Nó là thành phần quan trọng trong việc tạo ra các hình ảnh đấy. Cùng tìm hiểu xem làm như vậy bằng cách nào nhé.

Bước đầu tiên là áp dụng vào một lưới; dùng hàm [```floor()```](../glossary/?lan=vi&search=floor) để tạo ra một lưới mà mỗi ô ta sẽ chỉ tô đúng 1 màu. Hãy xem đoạn code dưới đây, đặc biệt là dòng 22 và 23.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

Sau khi chia canvas thành lưới 10x10 (dòng 21), ta có thể coi mỗi ô có 1 tọa độ riêng nằm trong khoảng [0.0, 1.0]. Phần này thì quen thuộc quá rồi thì ta đã làm tương ở chương trước. Để tô cùng một màu cho toàn bộ các điểm ảnh trong mỗi ô đó, ta sẽ chỉ dùng phần nguyên của tọa độ thay vì dùng cả phần thập phân. Sử dụng phần nguyên đó làm tham số cho hàm ngẫu nhiên, ta sẽ được một số khác, chính là màu mà ta sẽ tô cho các điểm ảnh trong từng ô. Và chính vì hàm ngẫu nhiên của ta được tính bằng công thức chung, nên tất cả điểm ảnh trong một ô sẽ có màu giống nhau.

Uncomment dòng 29 để kiểm chứng, mỗi ô vẫn là một "không gian con" có đầy đủ thông tin của từng điểm ảnh. 

Kết hợp phần nguyên và phần thập phân, ta sẽ tạo ra vô vàn phiên bản ngẫu nhiên có kiểm soát.

Hãy xem đoạn code sinh ra mê cung dưới đây, nó sử dụng công thức nổi tiếng ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10```.

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Ở đây tôi dùng các số ngẫu nhiên để vẽ những đường chéo, bằng cách sử dụng lại hàm ```truchetPattern()```, có tác dụng vẽ các họa tiết Truchet từ chương trước (dòng từ 41 tới 47).

Một họa tiết khác cũng thú vị không kém sẽ hiện ra khi bạn uncomment các dòng từ 50 tới 53, thậm chí họa tiết sẽ chuyển động khi bạn uncomment dòng 35 và 36.

## Sử dụng thành thạo sự ngẫu nhiên

[Ryoji Ikeda](http://www.ryojiikeda.com/), một nhạc sỹ nhạc điện tử và là một nghệ sỹ hiệu ứng thị giác, đã thành thục kỹ năng sử dụng sự ngẫu nhiên; sẽ thật khó để không xúc động và bị mê hoặc khi xem các tác phẩm của ông. Cách mà ông đưa sự ngẫu nhiên vào trong các tác phẩm âm nhạc và thị giác đã được mài dũa để không đem lại cảm giác lộn xộn mà vẫn phản ánh được sự phức tạp trong quá trình phát triển của văn hoá công nghệ.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Hãy chiêm ngưỡng các tác phẩm của [Ikeda](http://www.ryojiikeda.com/) và thử:

* Vẽ các mã vạch di chuyển ngược chiều nhau với vận tốc thay đổi theo thời gian.

<a href="../edit.php#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Tương tự như trên, hãy vẽ nhiều hàng hơn nữa, vận tốc đa dạng hơn nữa. Sử dụng tọa độ X của con trỏ chuột làm ngưỡng thập phân để ẩn hiện các ô tuỳ ý.

<a href="../edit.php#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Tạo bất kỳ hiệu ứng hay ho nào mà bạn muốn

<a href="../edit.php#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Làm thế nào để ứng dụng sự ngẫu nhiên vào trong mỹ thuật rất khó, đặc biệt khi bạn muốn mô phỏng các hình dáng và chuyển động tự nhiên. Bản thân sự ngẫu nhiên sẽ quá hỗn loạn và có rất ít sự vật tự nhiên trông giống như vậy. Nếu không tin bạn cứ thử quan sát các giọt mưa hoặc bảng giá cổ phiếu trên sàn chứng khoán mà xem, chúng cũng khá ngẫu nhiên đó, nhưng không hề giống như các họa tiết lộn xộn mà ta vẽ ở đầu chương này đâu. Tại sao à ? Vì các giá trị ngẫu nhiên mà ta dùng không có sự liên quan, còn trong tự nhiên thì trạng thái tại một thời điểm của sự vật chịu ảnh hưởng từ trạng thái tại thời điểm trước đó.

Trong chương kế tiếp ta sẽ học về nhiễu, một cách để tạo ra sự hỗn loạn có kiểm soát và trông tự nhiên hơn.
