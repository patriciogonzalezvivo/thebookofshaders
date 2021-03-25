## Bagaimana cara menjalankan contoh di Raspberry Pi?

Beberapa tahun yang lalu, asumsikan bahwa setiap orang memiliki komputer dengan unit pemrosesan grafis adalah hal yang mustahil. Sekarang, sebagian besar komputer memiliki GPU, tetapi masih merupakan standar yang tinggi untuk persyaratan di bengkel atau kelas, misalnya.

Terima Kasih kepada [Raspberry Pi Foundation](http://www.raspberrypi.org/) sebuah jenis baru dari generasi komputer yang kecil dan murah (sekitar $35/Rp500,000 satunya) telah menemukan jalannya ke kelas. Yang terpenting untuk tujuan buku ini, [Raspberry Pi](http://www.raspberrypi.org/) hadir dengan GPU Broadcom yang layak yang dapat diakses langsung dari konsol. Saya membuat [panggilan alat pengkodean langsung GLSL fleksibel **glslViewer**](https://github.com/patriciogonzalezvivo/glslViewer) yang menjalankan semua contoh dalam buku ini. Program ini juga memiliki kemampuan untuk memperbarui secara otomatis ketika pengguna menyimpan perubahan pada kode mereka. Apa artinya ini? Anda dapat mengedit shader dan setiap kali Anda menyimpannya, shader akan dikompilasi ulang dan dirender untuk Anda.

Dengan membuat salinan lokal dari repositori buku ini (lihat bagian di atas) dan [`glslViewer` diinstal](https://github.com/patriciogonzalezvivo/glslViewer), pengguna dapat menjalankan contoh dengan` glslviewer`. Juga dengan menggunakan flag `-l` mereka dapat membuat contoh di sudut layar sementara mereka memodifikasinya dengan editor teks apa pun (seperti `nano`, `pico`, `vi`, `vim` atau` emacs`) . Ini juga berfungsi jika pengguna terhubung melalui ssh/sftp.

Untuk memasang dan mengatur semua ini pada Raspberry Pi setelah memasang [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), sebuah distribusi Linux berbasis Debian yang dibuat untuk Raspberry Pi, ketik perintah berikut:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
