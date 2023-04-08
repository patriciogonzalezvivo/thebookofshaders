## Bagaimana mencetak buku ini?

Katakanlah anda tidak ingin melihat atau berinteraksi dengan contoh dan Anda hanya ingin buku teks mode lama yang bagus yang dapat Anda baca di pantai atau dalam perjalanan Anda ke kota. Dalam hal ini, Anda dapat mencetak buku ini.

#### Memasang glslViewer

Untuk mencetak buku ini anda terlebih dahulu harus menguraikannya. Untuk itu anda akan membutuhkan [`glslViewer`](https://github.com/patriciogonzalezvivo/glslViewer) sebuah alat shader konsol yang akan mengkompilasi dan mengubah contoh shader ke gambar.

Pada **MacOSX**, pastikan mempunyai [homebrew](http://brew.sh/) yang terpasang dan terminal lakukanlah:
```bash
brew install glslviewer
```

Pada **Raspberry Pi**, anda harus mempunyai [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), sebuah distribusi Linux berbasis Debian yang dibuat untuk Raspberry Pi dan lakukanlah:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
```

#### Memasang Python 3, Latex Engine dan Pandoc

Untuk mengurai bab Markdown ke Latex dan kemudian ke berkas PDF, kita akan menggunakan Xetex Letex Engine dan Pandoc

Pada **MacOSX**:

Unduh dan Pasang MacTeX dengan:

```bash
brew install --cask mactex-no-gui
```

Kemudian pasang [Pandoc](http://johnmacfarlane.net/pandoc/) dan Python 3 dengan:

```bash
brew install pandoc python
```

Pada **Raspberry Pi** (Raspbian):

```bash
sudo apt-get install texlive-xetex pandoc python2.7
```

#### Compile the book into a pdf and print it

Sekarang anda sudah mempunya apa yang dibutuhkan, waktunya untuk mengkloning [repositori buku ini](https://github.com/patriciogonzalezvivo/thebookofshaders)) dan kompilasi buku ini:

Untuk itu buka terminal sekali lagi dan ketik:

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean pdf
```

Jika semua berjalan lancar, anda akan melihat berkas `book.pdf` yang bisa anda baca di perangkat favorit atau dicetak.

#### Kompilasi buku menjadi epub untuk digunakan dengan e-reader

```bash
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
make clean epub
```

`Book.epub` yang dihasilkan dapat digunakan secara langsung, atau diubah menjadi file` .mobi` untuk digunakan dengan Kindle dengan menggunakan konverter, misalnya Calibre.
