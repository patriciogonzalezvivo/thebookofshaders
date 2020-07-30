## Làm thế nào để đóng góp cho quyển sách này

Cảm ơn bạn vì muốn góp sức! Có rất nhiều cách để làm việc đó:

- Dịch quyển sách sang ngôn ngữ khác
- Cải thiện phần [```Chú giải```](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Biên tập lại nội dung
- Chia sẻ code shader của bạn trên [editor online](http://editor.thebookofshaders.com/)

### Dịch quyển sách sang ngôn ngữ khác

Quyển sách này được viết theo [cú pháp Markdown](https://daringfireball.net/projects/markdown/syntax) nên rất dễ chỉnh sửa.

1. Bạn có thể truy cập [repository ```github.com/patriciogonzalezvivo/thebookofshaders``` trên GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders). Hãy xem các file và thư mục ở đó. Bạn sẽ thấy nội dung của các chương nằm ở các file ```README.md``` và các file có tên viết hoa như: ```TITLE.md```, ```SUMMARY.md```, vân vân. Ngoài ra thì các bản dịch sẽ có file riêng và có tên kết thúc bằng mã ngôn ngữ 2 ký tự, ví dụ: ```README-jp.md```, ```README-es.md```, vân vân.

2. Fork repository này rồi tạo một bản sao trên máy của bạn.

3. Tạo một bản sao cho mỗi file mà bạn muốn dịch. Hãy nhớ thêm mã ngôn ngữ 2 ký tự vào cuối tên file.

4. Dịch nội dung sang ngôn ngữ khác (xem mục **Chú ý khi dịch thuật**).

5. Kiểm tra lại (xem mục **Kiểm tra**).

6. Push lên repository riêng của bạn rồi tạo một [Pull Request](https://help.github.com/articles/using-pull-requests/) vào repository của chúng tôi.

#### Chú ý khi dịch thuật

Không được xoá hoặc thay đổi mã nhúng các ví dụ tương tự như các đoạn mã sau:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

hoặc

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Kiểm tra

Hãy thử chạy trên server PHP nội bộ của bạn:

```bash
php -S localhost:8000
```

Rồi truy cập ```localhost:8000``` trên trình duyệt và tới chương mà bạn đã dịch rồi thêm đuôi ```?lan=``` kèm mã ngôn ngữ 2 ký tự.

Ví dụ, nếu bạn dịch chương ```03``` sang tiếng Pháp tức là bạn sửa file ```03/README-fr.md``` nên giờ bạn sẽ tự kiểm tra lại tại địa chỉ: ```http://localhost:8000/03/?lan=fr```

### Cải thiện phần chú giải

Phần này vẫn đang được bổ sung. Chúng tôi rất vui lòng lắng nghe các ý tưởng của bạn để khiến nó trở nên dễ hiểu hơn. Hãy gửi tin nhắn tới [@bookofshaders](https://twitter.com/bookofshaders).

### Biên tập nội dung

Chúng ta đều là những người bình thường có nhiều điểm có thể cải thiện hơn nữa. Nếu bạn có gì muốn góp ý, cứ tạo Pull Request hoặc một issue. Cảm ơn!

### Chia sẻ code shader

Bạn sẽ thấy rất nhiều link trỏ tới [editor online](http://editor.thebookofshaders.com/) hoặc các phiên bản nhúng của nó ở quyển sách này.
Nếu bạn hoàn thành 1 đoạn code hay ho nào đó, hãy click nút "Export" (hoặc biểu tượng ```⇪```) rồi copy "URL to code...". Sau đó gửi URL tới [@bookofshaders](https://twitter.com/bookofshaders) hoặc [@kyndinfo](https://twitter.com/kyndinfo). Chúng tôi rất mong chờ được bổ sung nó vào [phần thư viện các ví dụ](https://thebookofshaders.com/examples/).
