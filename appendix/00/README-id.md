## Bagaimana saya mendapatkan buku ini secara offline?

Katakanlah anda sedang berada di perjalanan jauh dan anda ingin mempelajari beberapa shader, Dalam kasus itu anda dapat membuat salinan lokal dari buku ini di komputermu dan berjalan di server lokal.

Untuk itu anda membutuhkan PHP, Python 3 dan Git Client. Pada komputer MacOS dan Raspberry Pi, Python sudah terpasang secara bawaan tapi anda tetap harus menginstall git client:

Pada **MacOSX**, pastikan mempunyai [homebrew](http://brew.sh/) yang terpasang dan terminal lakukanlah:

```bash
brew update
brew upgrade
brew install git php
```

Pada **Raspberry Pi**, anda harus mempunyai [Raspbian](https://www.raspberrypi.org/downloads/raspbian/), sebuah distribusi Linux berbasis Debian yang dibuat untuk Raspberry Pi dan lakukanlah:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer php
```

Setelah semua terpasang, anda hanya perlu melakukan:

```bash
cd ~
git clone --recursive https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
git submodule foreach git submodule init && git submodule update
php -S localhost:8000
```

Lalu di browser anda kunjungi ['http://localhost:8000/'](http://localhost:8000/)
