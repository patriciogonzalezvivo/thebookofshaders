## Bagaimana saya bisa berkolaburasi?

Terima kasih telah bersedia untuk berkolaborasi! Ada banyak cara yang bisa anda lakukan:

- Menerjemahkan konten
- Mengimprovisasi [bagian glosarium (```glossary/```)](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Menyunting konten
- Membagikan contoh shadermu melalui [editor on-line](http://editor.thebookofshaders.com/)

### Menerjemahkan Konten

Buku ini dibuat dalam bahasa [Markdown](ttps://daringfireball.net/projects/markdown/syntax) jadi ini sangat mudah untuk disunting dan dikerjakan.

1. Mulailah dengan membuka repositori [Github di ```github.com/patriciogonzalezvivo/thebookofshaders```](https://github.com/patriciogonzalezvivo/thebookofshaders). Lihatlah file dan folder di dalamnya. Anda akan melihat bahwa isinya ada di ```README.md``` dan file lain dengan huruf kapital seperti: ```TITLE.md```, ```SUMMARY.md```, dll. Perhatikan juga bahwa terjemahan di-host dalam file dengan nama yang diakhiri dengan dua huruf yang merujuk pada bahasanya, mis .: ```README-jp.md```, ```README-es.md```, dll.

2. Fork repositori dan klon di komputer Anda.

3. Gandakan konten file yang ingin diterjemahkan. Ingatlah untuk menambahkan dua huruf yang mengacu pada bahasa yang Anda terjemahkan ke file yang akan anda kerjakan.

4. Terjemahkan baris demi baris konten (lihat **Catatan terjemahan**).

5. Uji (lihat **Pengujian**).

6. Push ke fork github anda sendiri untuk kemudian buatlah [Pull Request](https://help.github.com/articles/using-pull-requests/)

#### Catatan Terjemahan

Jangan menghapus atau mengubah contoh yang disematkan, seperti:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

or

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Pengujian

Mulai jalankan server lokal PHP di dalam folder repositori lokal:

```bash
php -S localhost:8000
```

Kemudian dalam browser cari ```localhost:8000```, pergi ke bab yang ingin diterjemahkan dan tambahkan ```?lan=``` diikuti dengan dua huruf yang anda gunakan untuk menandai bahasa yang anda terjemahkan.

### Mengimprovisasi bagian glosarium

Bagian ini dibawah pengembangan. Kami senang untuk mendengar idemu pada cara untuk membuat alat yang bersahabat untuk semua.

### Menyunting konten

Kita semua manusia. Jika anda melihat sesuatu, lakukanlah sesuatu, buat Pull Request atau buka/buat isu. Terima Kasih!

### Membagikan contoh shadermu

Anda akan melihat banyak tautan ke [editor on-line](http://editor.thebookofshaders.com/) dan contoh yang disematkan darinya.
Setelah anda membuat sesuatu yang membuat anda bangga, klik "Export" (atau ikon ```⇪```) dan kemudian salin "URL to code...", kirim ke  [@bookofshaders](https://twitter.com/bookofshaders) atau [@kyndinfo](https://twitter.com/kyndinfo). Kami sangat menantikan untuk melihatnya dan menambahkannya ke [bagian galeri contoh](https://thebookofshaders.com/examples/)