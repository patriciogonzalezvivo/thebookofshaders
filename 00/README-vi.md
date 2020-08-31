# Giới thiệu

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Hai bức ảnh trên đây được tạo ra bằng những cách khác nhau. Bức đầu tiên được vẽ bởi Van Gogh bằng nhiều lớp sơn chồng lên nhau. Nó đã ngốn của ông ấy hàng giờ đồng hồ. Bức thứ hai được tạo ra trong chớp mắt từ 4 ma trận điểm ảnh: một cho màu xanh (Cyan), một cho màu hồng (Magenta), một cho màu vàng (Yellow) và một cho màu đen (Black). Điểm khác biệt chính là: các lớp của bức tranh thứ hai được tạo ra đồng thời chứ không phải tuần tự.

Quyển sách này nói về một kỹ thuật mang tính cách mạng trong Đồ họa Máy tính, *fragment shader*, giúp nâng tầm đồ hoạ kỹ thuật số lên một tầm cao mới. Bạn có thể nghĩ sức ảnh hưởng của nó tương đương với cỗ máy in của Gutenberg khi xưa vậy.

![Cỗ máy in của Gutenberg](gutenpress.jpg)

Fragment shader cho bạn toàn quyền kiểm soát các điểm ảnh được render trên màn hình cực kỳ nhanh chóng. Đó là lí do tại sao nó được dùng trong mọi lĩnh vực của Đồ hoạ máy tính, từ các bộ lọc video trên điện thoại di động tới các trò chơi điện tử 3D đáng kinh ngạc.

![Game Journey của That Game Company](journey.jpg)

Ở các chương tiếp theo, bạn sẽ biết kỹ thuật này nhanh và mạnh kinh khủng tới mức nào, và làm thế nào để áp dụng nó vào công việc.

## Quyển sách này dành cho những ai ?

Quyển sách này được viết cho các kỹ sư và lập trình viên sáng tạo, những người đã có kinh nghiệm lập trình và kiến thức cơ bản về Giải tích và Lượng giác, và cho những ai muốn nâng tầm chất lượng đồ hoạ trong tác phẩm của mình. (Nếu bạn muốn học lập trình, tôi khuyên bạn nên bắt đầu từ trang web [Processing](https://processing.org/) rồi quay lại đây khi đã cảm thấy đủ kiến thức.

Quyển sách này sẽ chỉ cho bạn cách dùng các shader và cách áp dụng shader vào các dự án để cải thiện hiệu năng cũng như chất lượng đồ hoạ. Vì các shader viết bằng GLSL (viết tắt của OpenGL Shading Language) sẽ được biên dịch và chạy trên rất nhiều nền tảng khác nhau, bạn có thể ứng dụng những gì học được ở đây cho bất kỳ môi trường nào sử dụng OpenGL, OpenGL ES hoặc WebGL. Cụ thể, bạn có thể ứng dụng những kiến thức này  cho các bản vẽ [Processing](https://processing.org/), các ứng dụng [openFrameworks](http://openframeworks.cc/), các cỗ máy [Cinder](http://libcinder.org/) tương tác được, các website sử dụng [Three.js](http://threejs.org/) hay các trò chơi trên iOS/Android.

## Nội dung của quyển sách này là gì ?

Quyển sách này sẽ tập trung vào việc sử dụng các pixel shader viết bằng GLSL. Đầu tiên ta sẽ định nghĩa thế nào là shader, rồi mới học cách tạo các hình, mẫu, ảnh bằng Toán học và làm chúng chuyển động bằng shader. Bạn sẽ được học các kiến thức nền tảng của shader và áp dụng chúng vào các chuyên ngành khác như: Xử lý ảnh
(Các phép toán xử lý ảnh, ma trận chập, làm mờ, bộ lọc, bảng quy chiếu và các hiệu ứng khác), mô phỏng (
Mô phỏng tiến trình sống theo phương pháp Conway, mô hình Phản ứng - Khuếch tán của Gray-Scott, các gợn sóng trên mặt nước, hiệu ứng màu nước, nhiễu Voronoi, vân vân ...). Tới cuối quyển sách, ta sẽ nói về các kỹ thuật cao cấp hơn dựa trên thuật toán Dò tia - Ray Marching.

*Tất cả các chương đều có các ví dụ tương tác được để bạn khám phá.* Khi bạn sửa code, bạn sẽ thấy thay đổi ngay lập tức. Các khái niệm có thể hơi trừu tượng và dễ gây nhầm lẫn, nên các ví dụ tương tác được sẽ rất cần thiết để hỗ trợ bạn học. Bạn nắm vững các khái niệm càng nhanh thì bạn học càng dễ.

Những nội dung nằm ngoài phạm vi của quyển sách:

* Đây *không phải* sách nói về OpenGL hay WebGL. OpenGL/WebGL là chủ đề rộng lớn hơn cả GLSL và fragment shader. Để tìm hiểu thêm về OpenGL/WebGL, tôi khuyên bạn nên đọc [Giới thiệu OpenGL](https://open.gl/introduction),  [Hướng dẫn lập trình OpenGL - xuất bản lần 8](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (còn được biết tới với tên gọi là The Red Book) hoặc [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* Đây *không phải* sách Toán. Mặc dù ta có đề cập tới một vài thuật toán và kỹ thuật liên quan tới Giải tích và Lượng giác, nhưng chúng tôi sẽ không giải thích chúng một cách chi tiết. Để tiện giải đáp các thắc mắc về Toán, tôi khuyên bạn nên có một trong số các quyển sách sau: [Ứng dụng Toán trong lập trình và đồ hoạ máy tính - xuất bản lần 3](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) hoặc [Kiến thức Toán cần thiết cho lập trình Game và Ứng dụng real-time](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).


## Bạn cần gì để bắt đầu ?

Chỉ vài thứ thôi! Nếu bạn có trình duyệt có thể xử lý WebGL (như Chrome, Firefox hoặc Safari) và kết nối Internet, click nút _"Next >>>"_ ở cuối trang này để bắt đầu ngay.

Hoặc, tuỳ theo bạn có gì và cần gì từ quyển sách, bạn có thể:

- [Tạo quyển sách phiên bản không cần Internet](https://thebookofshaders.com/appendix/00/?lan=vi)

- [Chạy các ví dụ trên Raspberry Pi mà không cần trình duyệt](https://thebookofshaders.com/appendix/01/?lan=vi)

- [Tạo phiên bản PDF của sách để in](https://thebookofshaders.com/appendix/02/?lan=vi)

- Xem [repository trên GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) của quyền sách này để giúp sửa và chia sẻ code.
