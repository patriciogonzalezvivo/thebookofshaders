<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*oleh [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) dan [Jen Lowe](http://jenlowe.net/)*

Panduan langkah demi langkah untuk melalui semesta Fragment Shaders yang abstrak dan kompleks.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Konten

* [Pengenalan](00/)

* Memulai
    * [Apa itu shader?](01/)
    * [“Hello world!”](02/)
    * [Uniforms](03/)
	* [Menjalankan shader](04/)

* Menggambar secara algoritmik
    * [Funsi Membentuk](05/)
    * [Warna](06/)
    * [Bentuk](07/)
    * [Matriks](08/)
    * [Pola](09/)

* Desain generatif
    * [Acak](10/)
    * [Noise](11/)
    * [Noise seluler](12/)
    * [Gerak Pecahan Brownian](13/)
    * Fraktal

* Pemrosesan gambar
    * Tekstur
    * Operasi Gambar
    * Konvolusi Kernel
    * Filter
    * Efek lainnya

* Simulasi
    * Pingpong
    * Conway
    * Riak
    * Warna air
    * Reaksi difusi

* Grafik 3D
    * Cahaya
    * Peta-normal
    * Peta benjolan
    * Ray berbaris
    * Peta lingkungan (bulat dan kubus)
    * Merefleksikan dan membiaskan

* [Lampiran:](appendix/) Cara lain untuk menggunakan buku ini
	* [Bagaimana saya mendapatkan buku ini secara offline?](appendix/00/)
	* [Bagaimana cara menjalankan contoh di Raspberry Pi?](appendix/01/)
	* [Bagaimana mencetak buku ini?](appendix/02/)
    * [Bagaimana saya bisa berkolaburasi?](appendix/03/)
    * [An introduction for those coming from JS](appendix/04/) oleh [Nicolas Barradeau](http://www.barradeau.com/)

* [Galeri contoh](examples/)

* [Glosarium](glossary/)

## Tentang Penulis

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentina) adalah seorang artis dan developer yang tinggal di New York. Dia menjelajahi ruang interstisial antara organik dan sintetis, analog dan digital, individu dan kolektif. Dalam karyanya ia menggunakan kode sebagai bahasa ekspresif dengan tujuan untuk mengembangkan bersama menjadi lebih baik.

Patricio mempelajari dan mempraktikkan psikoterapi dan terapi seni ekspresif. Dia memegang gelar MFA dalam Desain & Teknologi dari Parsons The New School, tempat dia sekarang mengajar. Saat ini dia bekerja sebagai Graphic Engineer di Mapzen membuat alat pemetaan openSource.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) adalah seorang ilmuwan data independen dan komunikator data di Datatelling tempat dia mengumpulkan orang + angka + kata. Dia mengajar di program SVA's Design for Social Innovation, mendirikan School for Poetic Computation, mengajar Matematika untuk Seniman di NYU ITP, meneliti di Lab Desain Informasi Spasial di Universitas Columbia, dan menyumbangkan ide di White House Office of Science and Technology Policy. Dia berbicara di SXSW dan Eyeo. Karyanya telah diliput oleh The New York Times dan Fast Company. Penelitian, penulisan, dan ceramahnya mengeksplorasi janji dan implikasi data dan teknologi di masyarakat. Dia memiliki gelar B.S. dalam Matematika Terapan dan Magister Ilmu Informasi. Seringkali berlawanan, dia selalu berada di sisi cinta.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Ucapan Terima Kasih

Terima kasih kepada [Scott Murray](http://alignedleft.com/) untuk nasihat dan inspirasi.

Terima kasih kepada [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/) untuk kontribusi dengan dukungan, ide bagus dan kode.

Terima kasih kepada [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) dan [Sawako](https://twitter.com/sawakohome) untuk [terjemahan Bahasa Jepang (日本語訳)](?lan=jp)

Terima kasih kepada [Tong Li](https://www.facebook.com/tong.lee.9484) dan [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) untuk [terjemahan Bahasa China (中文版)](?lan=ch)

Terima kasih kepada [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) untuk [terjemahan Bahasa Korea (한국어)](?lan=kr)

Terima kasih kepada Nahuel Coppero (Necsoft) untuk terjemahan [Bahasa Spanyol (español)](?lan=es)

Terima kasih kepada [Raphaela Protásio](https://github.com/Rawphs) dan [Lucas Mendonça](https://github.com/luuchowl) untuk terjemahan [terjemahan Bahasa Portugis](?lan=pt)

Terima kasih kepada [Nicolas Barradeau](https://twitter.com/nicoptere) and [Karim Naaji](http://karim.naaji.fr/) for the French [translation (français)](?lan=fr)

Terima kasih kepada [Andrea Rovescalli](https://www.earove.info) untuk terjemahan [Bahasa Italia (italiano)](?lan=it)

Terima kasih kepada [Michael Tischer](http://www.mitinet.de) untuk terjemahan [Bahasa Jerman (deutsch)](?lan=de)

Terima kasih kepada [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3) untuk terjemahan [Bahasa Rusia (russian)](?lan=ru)

Terima kasih kepada [Andy Stanton](https://andy.stanton.is/) untuk perbaikan dan improvisasi [the pdf/epub export pipeline](https://thebookofshaders.com/appendix/02/)

Terima kasih kepada [Naufal Adriansyah](https://www.facebook.com/naufal.adrna08) untuk terjemahan [Bahasa Indonesia](?lan=id)

Terima kasih kepada [Manoylov Andriy](https://twitter.com/ManoylovAC) untuk terjemahan [Bahasa Ukraina (українська)](?lan=ua)

Terima kasih kepada semua orang yang telah percaya pada proyek ini dan [telah berkontribusi dalam perbaikan](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) atau donasi.

## Dapatkan bagian baru

Daftar untuk surat berita atau follow di [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
