## Làm thế nào để in quyển sách này

Giả sử bạn không có nhu cầu tương tác với các ví dụ mà chỉ muốn đọc quyển sách theo cách cổ điển như khi đang nằm trên bãi biển hoặc trên tàu điện. Trong trường hợp đó bạn có thể in quyển sách này.

#### Cài đặt glslViewer

Để in quyển sách này đầu tiên phải biên dịch nó đã. Để làm được việc đó thì bạn cần [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) để biến các đoạn code shader thành ảnh minh hoạ.

Trên **MacOSX** nếu đã có [homebrew](http://brew.sh/) thì cần gõ lệnh sau:

```bash
brew install glslviewer
```

Trên **Raspberry Pi** bạn cần cài [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), một phiên bản Linux dựa trên Debian dành riêng cho Raspberry PI rồi gõ lệnh sau:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Cài đặt Python 2.7, Latex Engine và Pandoc

Để biên dịch các chương sách viết theo cú pháp Markdown bằng phần mềm Latex rồi xuất ra định dạng PDF thì bạn cần có Latex Engine và Pandoc.

Trên **MacOSX**:

Tải và cài đặt MacTeX bằng lệnh:

```bash
brew install --cask mactex-no-gui
```

sau đó cài thêm [Pandoc](http://johnmacfarlane.net/pandoc/) và Python 2 bằng lệnh:

```bash
brew install pandoc python@2
```

Trên **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Chuyển đổi quyển sách sang định dạng PDF

Giờ bạn đã có đủ công cụ cần thiết, hãy tạo một bản sao của [quyển sách này](https://github.com/patriciogonzalezvivo/thebookofshaders) và in nó thôi.

Ở cửa sổ terminal, hãy gõ lệnh:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

Nếu mọi thứ ổn, bạn sẽ thấy file `book.pdf` mà bạn có thể đọc bằng bất kỳ thiết bị nào hoặc in ra.

#### Chuyển đổi quyển sách sang định dạng epub để đọc trên thiết bị kỹ thuật số

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

File `book.epub` có thể đọc trực tiếp hoặc cần chuyển sang định dạng `.mobi` để đọc trên Kindle bằng một phần mềm khác như Calibre chẳng hạn.
