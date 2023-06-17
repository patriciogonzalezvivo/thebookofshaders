<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*Tác giả: [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) và [Jen Lowe](http://jenlowe.net/)*

Quyển sách này sẽ hướng dẫn người đọc khám phá dần vũ trụ trừu tượng và phức tạp của Fragment Shader.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Nội dung

* [Lời nói đầu](00/?lan=vi)

* Giới thiệu
    * [Shader là gì?](01/?lan=vi)
    * [“Hello world!”](02/?lan=vi)
    * [Uniform](03/?lan=vi)
    * [Chạy thử shader](04/?lan=vi)

* Các thuật toán hình học
    * [Các hàm số cơ bản (Hàm hình dạng - Shape function)](05/?lan=vi)
    * [Màu sắc](06/?lan=vi)
    * [Hình dạng](07/?lan=vi)
    * [Ma trận](08/?lan=vi)
    * [Mẫu hoa văn (Pattern)](09/?lan=vi)

* Các thiết kế ngẫu nhiên
    * [Ngẫu nhiên](10/?lan=vi)
    * [Nhiễu (Noise)](11/?lan=vi)
    * [Nhiễu mô phỏng tế bào (Cellular noise)](12/?lan=vi)
    * [Chuyển động Brown (Fractional Brownian motion)](13/?lan=vi)
    * Phân dạng (Fractals)

* Xử lý ảnh
    * Ảnh vân bề mặt (Texture)
    * Các phép toán xử lý ảnh
    * Tích chập (Kernel convolution)
    * Bộ lọc (Filter)
    * Các hiệu ứng khác

* Mô phỏng
    * Bóng bàn (Pingpong)
    * Tiến trình sống của Conway
    * Gợn sóng
    * Màu nước
    * Mô hình Phản ứng-Khuếch tán (Reaction-Diffusion)

* Đồ hoạ 3 chiều
    * Ánh sáng
    * Giả lập chi tiết bề mặt bằng vector pháp tuyến (Normal map)
    * Giả lập chi tiết bề mặt từ mặt cong (Bump map)
    * Dò tia quang học (Ray marching)
    * Ánh xạ từ môi trường bằng mặt cầu hoặc khối lập phương (Environmental map)
    * Phản xạ và khúc xạ

* [Phụ lục:](appendix/?lan=vi) Các cách khác để đọc và đóng góp cho quyển sách này
	* [Làm thế nào để đọc quyển sách này mà không cần Internet ?](appendix/00/?lan=vi)
	* [Làm thế nào để chạy thử ví dụ trên Raspberry Pi ?](appendix/01/?lan=vi)
	* [Làm thế nào để in quyển sách này ?](appendix/02/?lan=vi)
   * [Làm thế nào để góp sức cho quyển sách này ?](appendix/03/?lan=vi)
   * [Giới thiệu cho người đã biết Javascript](appendix/04/?lan=vi) từ [Nicolas Barradeau](http://www.barradeau.com/)

* [Thư viện các ví dụ](examples/?lan=vi)

* [Chú giải](glossary/?lan=vi)

## Tác giả

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (sinh năm 1982 tại Buenos Aires, Argentina) là artist kiêm developer ở New York。 Anh ấy khám phá sự giao thoa giữa hữu cơ và vô cơ, analog và kỹ thuật số, cá nhân và tập thể. Trong công việc, anh ấy dùng code như một cách đóng góp tạo nên những điều tốt đẹp hơn cho cộng đồng.

Patricio đã học tập và công tác trong ngành tâm lý trị liệu và nghệ thuật biểu cảm. Anh ấy có bằng Thạc sỹ ngành Thiết kế và Công nghệ từ trường Parson The New School, cũng là nơi anh ấy đang giảng dạy. Hiện tại, anh ấy là Kỹ sư đồ hoạ tại Mapzen để phát triển các công cụ cho openSource.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) là một nhà khoa học dữ liệu độc lập ở Datatelling, nơi mà cô ấy khám phá mối liên hệ giữa con người với chữ số và ngôn từ. Cô ấy hiện đang giảng dạy ở khoa Thiết kế của trường Mỹ thuật New York theo chương trình Social Innovation. Cô ấy đã cùng sáng lập ra School for Poetic Computation, dạy môn Toán chuyên ngành nghệ thuật ở khoa Sau Đại Học của trường New York, công tác tại phòng nghiên cứu Spatial Information Design tại Đại học Columbia và còn đóng góp nhiều ý tưởng cho Văn phòng Nhà Trắng về các chính sách Khoa học công nghệ. Cô ấy đã từng thuyết trình ở SXSW và Eyeo. Sản phẩm của cô ấy đã xuất hiện trên trang bìa của tờ The New York Times và Fast Company. Công việc nghiên cứu, sáng tác và thuyết trình của cô ấy chủ yếu khai thác đề tài về tiềm năng và ý nghĩa của việc áp dụng các thành tựu của ngành dữ liệu và công nghệ cho cộng đồng. Cô ấy có bằng Cử nhân khoa học ngành Toán ứng dụng và bằng Thạc sỹ ngành Khoa học thông tin. Nhưng cô ấy cũng là một người hay mơ mộng.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Lời cảm ơn

Cảm ơn [Scott Murray](http://alignedleft.com/) vì niềm cảm hứng và những lời khuyên.

Cảm ơn [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/) vì đã hỗ trợ cả về ý tưởng lẫn code.

Cảm ơn [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) và [Sawako](https://twitter.com/sawakohome) vì [Bản dịch tiếng Nhật (日本語訳)](?lan=jp)

Cảm ơn [Tong Li](https://www.facebook.com/tong.lee.9484) và [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) vì [Bản dịch tiếng Trung (中文版)](?lan=ch)

Cảm ơn [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) vì [Bản dịch tiếng Hàn (한국어)](?lan=kr)

Cảm ơn Nahuel Coppero (Necsoft) vì [Bản dịch tiếng Tây Ban Nha (español)](?lan=es)

Cảm ơn [Raphaela Protásio](https://github.com/Rawphs) và [Lucas Mendonça](https://github.com/luuchowl) vì [Bản dịch tiếng Bồ Đào Nha (portugues)](?lan=pt)

Cảm ơn [Nicolas Barradeau](https://twitter.com/nicoptere) và [Karim Naaji](http://karim.naaji.fr/) vì [Bản dịch tiếng Pháp (français)](?lan=fr)

Cảm ơn [Andrea Rovescalli](https://www.earove.info) vì [Bản dịch tiếng Ý (italiano)](?lan=it)

Cảm ơn [Michael Tischer](http://www.mitinet.de) vì [Bản dịch tiếng Đức (deutsch)](?lan=de)

Cảm ơn [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3) vì [Bản dịch tiếng Nga (russian)](?lan=ru)

Cảm ơn [Vu Phuong Hoang](https://github.com/DancingPhoenix88) và [Minh-Phuc Bui](https://github.com/phucbm) vì [Bản dịch tiếng Việt](?lan=vi)

Cảm ơn [Manoylov Andriy](https://twitter.com/ManoylovAC) vì [Bản dịch tiếng Ukraina (українська)](?lan=ua)

Cảm ơn [Andy Stanton](https://andy.stanton.is/) vì đã sửa lỗi và cải tiến [cách export quyển sách ra định dạng pdf/epub](https://thebookofshaders.com/appendix/02/?lan=vi)

Cảm ơn tất cả mọi người đã tin tưởng, [cùng sửa lỗi](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) và quyên góp cho dự án này.

## Thông báo khi có chương mới

Đăng ký nhận thư định kỳ hoặc theo dõi trên [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
