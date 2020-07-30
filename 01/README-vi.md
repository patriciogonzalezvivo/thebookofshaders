# Mở đầu
## Fragment shader là gì

Ở chương trước, tôi đã mô tả shader tương đương với cỗ máy in của Gutenberg nhưng cho ngành đồ hoạ. Tại sao ? Và quan trọng hơn: shader là gì ?

![Từ việc chép-từng-từ-một, Ảnh bên trái của William Blades (1891). Cho tới in-từng-trang-một, Ảnh bên phải của Rolt-Wheeler (1920).](print.png)

Nếu bạn đã từng vẽ trên máy tính, bạn biết rằng để có được hình mình muốn, bạn phải vẽ hình tròn, hình chữ nhật rồi vài đường thẳng, vài hình tam giác. Quá trình đó không khác gì việc viết từng chữ một - đó là một loạt các chỉ dẫn để máy tính thực hiện lần lượt.

Shader cũng là một tập hợp các chỉ dẫn, nhưng các chỉ dẫn đó sẽ được thực thi cùng lúc cho từng điểm ảnh trên màn hình. Điều đó có nghĩa là code bạn viết phải xử lý khác nhau tuỳ theo vị trí của điểm ảnh trên màn hình. Giống như máy rập chữ, chương trình của bạn sẽ hoạt động như một hàm nhận vị trí của điểm ảnh rồi trả về màu của điểm ảnh đó. Chương trình đó chạy rất rất nhanh.

![Các khuôn chữ Trung Quốc](typepress.jpg)

## Làm cách nào shader lại chạy nhanh tới vậy ?

Để trả lời câu hỏi này, tôi xin giới thiệu với bạn sự kỳ diệu của việc *xử lý song song*.

Hãy tưởng tượng CPU là một dây chuyền công nghiệp lớn, và mọi tác vụ đi qua dây chuyền là một khâu. Có vài khâu đồ sộ hơn các khâu khác, tức là chúng cần nhiều thời gian và năng lượng hơn để xử lý. Ta nói chúng cần nhiều năng lực xử lý hơn. Kiến trúc của máy tính khiến mỗi khâu phải thực hiện tuần tự; khâu này kết thúc rồi mới đến khâu tiếp theo. Máy tính hiện đại thường có tới 4 bộ xử lý tương tự như 4 dây chuyền sản xuất này, lần lượt thực thi từng tác vụ nhỏ. Mỗi dây chuyền nhỏ trong đó gọi là một *thread*.

![CPU](00.jpeg)

Các trò chơi điện tử và các ứng dụng đồ hoạ cần nhiều năng lực xử lý hơn hẳn các phần mềm khác. Vì các nội dung đồ hoạ của chúng yêu cầu thực hiện rất nhiều phép toán, cho từng điểm ảnh một. Mỗi điểm ảnh trên màn hình đều phải được tính đến, còn trong các trò chơi 3 chiều thì cả các vật thể lẫn các góc camera cũng phải được tính luôn.

Quay trở lại phép so sánh về dây chuyền và tác vụ. Mỗi điểm ảnh trên màn hình đại diện cho 1 tác vụ nhỏ. Bản thân từng tác vụ không phải là vấn đề lớn với CPU, nhưng (vấn đề ở đây là) các tác vụ bé xíu này lại phải được thực thi cho từng điểm ảnh trên cả màn hình. Có nghĩa là trên màn hình cũ có độ phân giải 800x600, có tới 480.000 điểm ảnh cần phải được xử lý mỗi khung hình, tương đương với 14.400.000 phép tính mỗi giây! Đúng thế! Đó chính là điều khiến bộ vi xử lý bị quá tải. Còn ở màn hình retina thời hiện đại có độ phân giải 2880x1800 hiển thị 60 khung hình một giây, thì số phép tính mỗi giây lên tới 311.040.000. Bằng cách nào mà các kỹ sư đồ hoạ giải quyết được vấn đề này ?

![](03.jpeg)

Đây là lúc mà xử lý song song trở thành một giải pháp tốt. Thay vì phải trang bị vài bộ vi xử lý to lớn và mạnh mẽ, hoặc *các dây chuyền*, sẽ là thông minh hơn nếu để cho hàng loạt các bộ vi xử lý tí hon chạy song song. Và đó chính là việc mà các bộ xử lý đồ hoạ (GPU) làm.

![GPU](04.jpeg)

Hình dung hàng loạt các bộ vi xử lý tí hon như các dây chuyền được xếp thành hàng hình chữ nhật, còn dữ liệu của mỗi điểm ảnh là một quả bóng bàn. Nhét 14.400.000 quả bóng bàn trong một giây vào một ống đơn lẻ sẽ rất khó. Nhưng một nhóm nhiều ống xếp thành hàng 800x600 thì có thể đưa 480.000 quả bóng bàn chui qua tới 30 lần một giây một cách dễ dàng. Độ phân giải cao hơn cũng tương tự - phần cứng càng có năng lực xử lý song song thì khối lượng công việc mà nó có thể giải quyết lại lớn hơn.

Một "siêu năng lực" khác của GPU là các hàm Toán học được tối ưu bằng phần cứng, nên các phép toán phức tạp sẽ được xử lý trực tiếp trên phần cứng thay vì phần mềm. Điều đó có nghĩa là các phép tính lượng giác và ma trận sẽ được tính cực kỳ nhanh - như điện luôn.

## GLSL là gì?

GLSL là viết tắt của OpenGL Shading Language, là một quy chuẩn để viết các shader mà ta sẽ dùng ở các chương tới. Có nhiều loại shader phụ thuộc vào phần cứng và hệ điều hành. Ở đây chúng ta sẽ sử dụng quy chuẩn của 
[Khronos Group](https://www.khronos.org/opengl/). Hiểu về lịch sử hình thành của OpenGL sẽ giúp ích trong việc vượt qua được một số rào cản kỳ lạ của nó, vì thế tôi giới thiệu quyển sách này: [OpenGL là ](http://openglbook.com/chapter-0-preface-what-is-opengl.html)

## Shader nổi tiếng khó nhằn, sao lại thế ?

Như chú Ben nói "Quyền lực càng cao, trách nhiệm càng lớn", và việc tính toán song song cũng tuân thủ quy tắc này; thiết kế kiến trúc rất mạnh mẽ của GPU cũng đi kèm với các ràng buộc và giới hạn.

Để các dây chuyền, tức các thread, có thể chạy song song, thì chúng phải độc lập. Có thể nói rằng các thread bị **mù** khi không thể biết được các thread khác đang làm gì. Giới hạn này dẫn tới việc toàn bộ dữ liệu phải đi theo 1 chiều. Nên thread này không thể biết kết quả của thread kia hay thay đổi dữ liệu đầu vào hoặc lấy dữ liệu đầu ra của một thread nọ để chuyển cho một thread khác nữa.

Và GPU cũng luôn khiến cho các bộ vi xử lý (các dây chuyền) của mình phải bận rộn; cứ dây chuyền nào xong việc thì sẽ nhận được thông tin mới để xử lý tiếp. Nên mỗi thread còn chẳng biết nó vừa hoàn thành xong việc gì. Nó có thể vừa mới vẽ xong 1 nút bấm trên giao diện của hệ điều hành, rồi vẽ một phần bầu trời trong 1 trò chơi nào đó, sau đó lại phải hiển thị nội dung của 1 cái email. Mỗi thread không chỉ bị **mù** mà còn **mất trí nhớ** nữa. Bên cạnh việc viết code shader khá trừu tượng do phải viết một hàm dùng chung cho mọi điểm ảnh nhưng kết quả thì phụ thuộc vào vị trí của điểm ảnh đó, thì các ràng buộc về việc bị mù và mất trí nhớ ở trên cũng là nguyên do khiến cho shader không được biết đền nhiều bởi các lập trình viên mới vào nghề.

Nhưng đừng lo! Ở các chương tới, ta sẽ học từng bước một, từ đơn giản tới phức tạp. Nếu bạn đang đọc trên một trình duyệt đời mới, bạn có thể sẽ thích tương tác với các ví dụ. Đừng trì hoãn sự sung sướng nữa mà hãy click nút *Next >>* để nhảy thẳng vào code nào!