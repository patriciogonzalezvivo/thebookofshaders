## Làm thế nào để đọc quyển sách này mà không cần Internet ?

Giả sử bạn có một chuyến đi dài và muốn tranh thủ học shader. Trong trường hợp đó bạn có thể tạo một bản sao của quyển sách này và hiển thị nó bằng server nội bộ.

Để làm điều đó, bạn chỉ cần có PHP, Python 2.6 và git. Trên các máy MacOS và Raspberry Pi thì Python đã được cài đặt sẵn rồi nhưng bạn vẫn cần cài thêm PHP và git. Cụ thể:

Trên **MacOSX** hãy cài [homebrew](http://brew.sh/) trước rồi mở terminal ra và gõ:

```bash
brew update
brew upgrade
brew install git php
```

Trên **Raspberry Pi** bạn cần cài [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), là một phiên bản Linux dựa trên Debian dành riêng cho Raspberry Pi, sau đó gõ lệnh:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Khi đã cài đặt xong các phần mềm cần thiết, bạn chỉ cần gõ:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Rồi truy cập server nội bộ ở địa chỉ [`http://localhost:8000/`](http://localhost:8000/)
