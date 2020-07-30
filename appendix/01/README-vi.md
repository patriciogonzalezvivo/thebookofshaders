## Làm thế nào để chạy các ví dụ trên Raspberry Pi ?

Vài năm trước, việc một ai đó sở hữu một chiếc máy tính có card đồ hoạ còn khá hiếm. Giờ thì hầu nhưu máy nào cũng có, nhưng vẫn còn lâu nữa thì các lớp học mới được trang bị đầy đủ.

Nhờ có [Raspberry Pi Foundation](http://www.raspberrypi.org/), một thế hệ máy tính mới rất nhỏ và rẻ (chỉ khoảng 35$ một chiếc) đã ra đời và được trang bị cho các lớp học. Điều quan trọng nhất đối với quyển sách này là, các máy [Raspberry Pi](http://www.raspberrypi.org/) được trang bị GPU đời mới của hãng Broadcom sẽ cho phép truy cập trực tiếp ngay từ cửa sổ dòng lệnh. Tôi đã tạo ra [một công cụ hỗ trợ code GLSL gọi là glslViewer](https://github.com/patriciogonzalezvivo/glslViewer) có thể chạy tất cả các ví dụ trong quyển sách này. Công cụ này còn có khả năng cập nhật hình ảnh tự động, ngay khi bạn sửa code.

Bằng cách tạo một bản sao của quyển sách này ở máy tính của bạn (xem hướng dẫn ở phần trước) và cài đặt [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer), bạn có thể chạy các ví dụ với `glslViewer`. Ngoài ra nếu thêm tham số `-l` khi chạy thì một góc màn hình sẽ được dùng để dựng hình ví dụ đó, trong khi bạn có thể dùng bất kỳ chương trình biên soạn nào để sửa code. Nó còn hoạt động ngay cả khi bạn kết nối từ một máy tính khác thông qua ssh/sftp.

Để tạo bản sao của quyển sách và cài glslViewer sau khi đã có [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), gõ các lệnh sau:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
