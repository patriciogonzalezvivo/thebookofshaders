## Mẫu hoa văn

Vì các chương trình shader được tính toán cho từng pixel nên dù bạn có vẽ một hình bao nhiêu lần thì cũng không ảnh hưởng tới số phép tính. Điều đó đặc biệt thích hợp nếu ta dùng shader để vẽ các mẫu hoa văn hoạ tiết lặp lại.

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

Ở chương này ta sẽ dùng hết tất cả những gì đã học để vẽ rồi lặp lại hình vẽ đó ra toàn bộ canvas. Cũng giống như các chương trước, ta sẽ vẽ hình trong một khu vực khoảng [0.0, 1.0] trên hệ toạ độ, rồi tạo bản sao của các khu vực đó để tạo nên một lưới các hình vẽ lặp lại.

*"Hệ thống lưới tạo điều kiện để loài người khám phá và phát minh. Trong thiên nhiên hoang dã, các hoa văn giúp ta nhận biết dễ hơn. Người xưa đã dùng các hoa văn từ rất sớm để trang trí, từ các hoạ tiết trên đồ gốm tới các hoạ tiết khảm hình học trong các nhà tắm La Mã."* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

Trước hết tôi sẽ nhắc lại hàm [```fract()```](../glossary/?lan=vi&search=fract). Nó trả về phần thập phân của số thực, tương đương với phép tính phần dư khi chia cho 1 ([```mod(x,1.0)```](../glossary/?lan=vi&search=mod)). Nói cách khác, hàm [```fract()```](../glossary/?lan=vi&search=fract) trả về phần lẻ sau dấu thập phân. Hệ toạ độ của ta thì đã nằm trong khoảng [0.0, 1.0] rồi nên dùng hàm ```fract()``` trong khoảng này chẳng có ý nghĩa gì:

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

Nhưng nếu ta tăng kích thước của hệ toạ độ lên - gấp 3 lần chẳng hạn - thì cũng với đoạn code trên, ta sẽ thu được 3 đoạn biến thiên tuyến tính giống nhau: đoạn đầu tiên nằm trong khoảng 0-1, đoạn thứ hai nằm trong khoảng 1-2 và đoạn cuối nằm trong khoảng 2-3.

<div class="codeAndCanvas" data="grid-making.frag"></div>

Vậy là ta đã có 1 lưới 3x3 rồi, hãy coi mỗi ô là một không gian thu nhỏ. Bạn hãy uncomment dòng 27 để vẽ một hình gì đó ở mỗi không gian thu nhỏ nhé. (Do ta đã giãn cả 2 trục x và y với cùng 1 tỉ lệ nên các hình vẽ sẽ không bị bóp méo gì cả). *Chú ý*: Đoạn code không hề dùng vòng lặp.

Hãy thử sửa code như sau để hiểu rõ hơn:

* Giãn 2 trục x và y với 1 tỉ lệ khác, thậm chí là số thực và mỗi trục 1 tỉ lệ khác nhau.

* Tạo 1 hàm để sử dụng lại sau này cho mẹo lặp hoạ tiết này.

* Chia lưới thành 3 hàng và 3 cột. Tìm cách nhận biết từng hàng và cột đang được xử lý để có thể tuỳ ý thay đổi hình vẽ trong mỗi ô. Thử vẽ một bàn cờ caro xem sao.

### Apply matrices inside patterns

Vì mỗi ô là một hệ toạ độ thu nhỏ, ta có thể áp dụng các phép biến đổi ma trận để di chuyển, quay và thu phóng từng ô.

<div class="codeAndCanvas" data="checks.frag"></div>

* Hãy nghĩ cách làm cho hoạ tiết này chuyển động. Thử thay đổi màu sắc, hình dáng và cả chuyển động xem sao. Hãy tạo 3 animation riêng biệt.

* Tạo các hoạ tiết phức tạp hơn bằng cách kết hợp nhiều hình cơ bản.

[![](diamondtiles-long.png)](../edit.php#09/diamondtiles.frag)

* Hãy kết hợp nhiều lớp hoạ tiết chồng lên nhau để tạo nên hoạ tiết [kẻ ca-rô Tartan đặc trưng của Scotland](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns).

[ ![Hoạ tiết kẻ ca-rô Tartan kiểu Scotland tạo bởi Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### Hoạ tiết so le

Giả sử ta muốn tạo bên một bức tường gạch. Hãy nhìn ảnh dưới đây và bạn sẽ thấy các hàng gạch được xếp so le với nhau. Làm thế nào ta có thể vẽ được hình đó ?

![](brick.jpg)

Đầu tiên ta cần xác định được tính chẵn lẻ của mỗi hàng, thì mới biết có cần dịch chuyển hàng đó để tạo nên hoạ tiết so le không.

Để biết hàng đang vẽ là chẵn hay lẻ, ta sẽ dùng hàm tính phần dư ([```mod()```](../glossary/?lan=vi&search=mod)) khi chia cho ```2.0```. Nếu là phép chia hết thì đó là số chẵn, ngược lại là số lẻ. Hãy uncomment 2 dòng cuối của đoạn code dưới đây.

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

Bạn có thể thấy tôi đã dùng [toán tử ba ngôi (ternary)](https://en.wikipedia.org/wiki/%3F:) để kiểm tra xem hàm [```mod()```](../glossary/?lan=vi&search=mod) khi chia cho ```2.0``` thì phần dư có nhỏ hơn ```1.0``` không. Dòng cuối cùng, thì tôi chọn cách khác mà vẫn cho ra kết quả tương tự, đó là dùng hàm [```step()```](../glossary/?lan=vi&search=step), cách này nhanh hơn. Tại sao lại thế ? Thực ra thì khó mà biết được card đồ hoạ biên dịch và tối ưu code ra sao, nhưng nhiều khả năng là các hàm có sẵn sẽ nhanh hơn các hàm ta tự viết. Còn trong trường hợp này thì `step()` nhanh hơn vì nó được tối ưu bằng phần cứng, còn các lệnh điều kiện thì rất chậm trên các card đồ hoạ. Vì thế nếu có thể hãy cố gắng dùng các hàm có sẵn và hạn chế dùng các lệnh điều kiện.

Giờ thì ta có công thức tìm ra các hàng lẻ rồi nên chỉ cần dịch chuyển các viên gạch một nửa đơn vị theo trục ```x``` trên những hàng này thì sẽ tạo nên hoạ tiết so le thôi. Dòng 14 trong đoạn code dưới đây thực hiện đúng như vậy. Tuy nhìn qua thì thấy ta cũng áp dụng dịch chuyển cho cả các hàng chẵn nữa, nhưng vì kết quả phép tính phần dư bằng ```0``` cho các hàng này nên thành ra các viên gạch không bị dịch chuyển chút nào và vẫn giữ nguyên vị trí như ta mong muốn.

Hãy thử uncomment dòng 32 nhé, đó là dòng code tôi dùng để kéo giãn 2 trục theo tỉ lệ khác nhau để tạo nên hình viên gạch. Uncomment tiếp dòng 40, bạn sẽ thấy hệ trục toạ độ của mỗi ô lưới được minh hoạ bằng màu đỏ và xanh lá.

<div class="codeAndCanvas" data="bricks.frag"></div>

* Hãy thử làm các hàng gạch chuyển động theo thời gian nhé

* Hãy chuyển động các hàng chẵn sang bên trái còn các hàng lẻ sang bên phải thử xem.

* Nếu phải chuyển sang dịch các cột so le nhau thì bạn làm được không ?

* Kết hợp dịch chuyển cả 2 trục toạ độ để tạo nên chuyển động như dưới đây:

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Hoạ tiết Truchet

Ta có thể nhận biết từng ô ở hàng chẵn hay lẻ, ở cột chẵn hay lẻ, nên có thể tuỳ ý xử lý hình vẽ mỗi ô dựa vào tính chẵn lẻ này. [Hoạ tiết Truchet](http://en.wikipedia.org/wiki/Truchet_tiles) chỉ cần 1 hình vẽ nhưng chỉ cần quay 90 độ là có thêm phiên bản nữa.

![](truchet-00.png)

Bằng cách quay từng ô, ta có thể tạo nên vô số thiết kế khác nhau.

![](truchet-01.png)

Hãy chú ý vào hàm ```rotateTilePattern()``` dưới đây, nó chia mỗi ô thành 4 ô nhỏ hơn để chứa cả 4 phiên bản của hoạ tiết Truchet.

<div class="codeAndCanvas" data="truchet.frag"></div>

* Hãy comment, uncomment và tạo bản sao của các dòng 69 và 72 để tạo nên các thiết kế mới.

* Hãy thay hoạ tiết gốc gồm 2 hình tam giác đen trắng bằng các hoạ tiết khác như: 2 nửa hình tròn, hình thoi, đường thẳng.

* Tạo nên các hoạ tiết mà mỗi ô xác định góc xoay dựa vào vị trí của chính ô đó

* Tạo nên các hoạ tiết có các thuộc tính khác nhau dựa vào vị trí của chính ô đó

* Áp dụng các kỹ thuật học được ở chương này để tạo ra thứ gì đó không phải hoạ tiết (Ví dụ: quẻ bói Kinh Dịch)

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## Tự thiết kế

Tạo nên các hoạ tiết lặp lại là một bài tập tốt cho trí não khi phải tìm cách tái sử dụng một số lượng rất nhỏ các hoạ tiết ban đầu. Con người đã dùng kỹ thuật này từ rất lâu rồi, từ việc trang trí hoạ tiết trên những tấm vải, cho tới các sàn gạch được lát tỉ mỉ; từ các đường viền Hy Lạp cổ tới các thiết kế cửa Trung Quốc, sự hoà quyện của các hoạ tiết dù lặp lại mà vẫn đa dạng kích thích trí tưởng tượng của con người. Hãy dành chút thời gian để ngắm nhìn các [hoạ tiết](https://www.pinterest.com/patriciogonzv/paterns/) [trang trí](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) mà các hoạ sỹ đã sử dụng để che giấu phần lặp lại và làm ta ngạc nhiên với những sự sắp đặt đầy bất ngờ. Từ các hoạ tiết hình học Ả Rập, tới các hoa văn trên vải của Châu Phi, có cả một vũ trụ các hoa văn hoạ tiết mà ta có thể khám phá và học hỏi.

![Quyển 'A handbook of ornament' của Franz Sales Meyer (1920)](geometricpatters.png)

Đây cũng là chương cuối của phần Các thuật toán vẽ hình. Ở các chương tiếp theo ta sẽ học cách đưa một ít xáo trộn từ entropy vào shader để tạo nên những hình ảnh độc nhất, không thể đoán trước.
