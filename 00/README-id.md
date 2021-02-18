# Pengenalan

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Gambar di atas dibuat dengan cara yang berbeda. Yang pertama dibuat oleh tangan Van Gogh dengan mengaplikasikan lapisan di atas lapisan cat. Ini menghabiskan waktu berjam-jam. Yang kedua dibuat dalam waktu sedetik oleh kombinasi 4 matriks dari piksel: satu untuk cyan, satu untuk magenta, satu untuk kuning dan satu untuk hitam. Kunci perbedaannya adalah gambar kedua diproduksi dengan cara non-serial (yang artinya bukan langkah demi langkah, tapi semua dalam waktu yang sama). 

Buku ini membahas tentang teknik komputasi revolusioner, *shader fragment*, yang membawa gambar yang dihasilkan secara digital ke level berikutnya. Anda bisa menganggapnya setara dengan Gutenberg Press untuk grafis.

![Gutenberg's press](gutenpress.jpg)

Shader fragment (fragment shader) memberi kendali penuh atas piksel yang ditampilkan di layar dengan kecepatan super cepat. Inilah sebabnya mengapa mereka digunakan dalam semua jenis kasus, dari filter video di ponsel hingga video game 3D yang luar biasa.

![Journey by That Game Company](journey.jpg)

Dalam bab-bab berikut anda akan menemukan betapa luar biasa cepat dan kuatnya teknik ini dan bagaimana menerapkannya pada pekerjaan profesional dan pribadi Anda.

## Untuk siapakah buku ini?

Buku ini ditulis untuk coders kreatif, developer dan insinyur game yang memiliki pengalaman coding, pengetahuan dasar tentang aljabar linier dan trigonometri, dan yang ingin membawa pekerjaan mereka ke tingkat kualitas grafis baru yang menarik. (Jika Anda ingin mempelajari cara membuat kode, saya sangat menyarankan Anda memulai dengan [Processing](https://processing.org/) dan kembali lagi nanti jika Anda sudah merasa nyaman dengannya.)

Buku ini akan mengajarkan anda cara menggunakan dan mengintegrasikan shader ke proyek anda, mengimprovisasi performanya dan kualitas grafis. Karena GLSL (OpenGL Shading Language) shader dapat dikompilasi dan berjalan di berbagai platform, anda dapat menerapkan apa yang dipelajari di lingkungan lain yang menggunakan OpenGL, OpenGL ES atau WebGL. Dalam kata lain, anda dapat menerapkan dan menggunakan pengetahuan anda dengan sketsa [Processing](https://processing.org/), aplikasi [openFrameworks](http://openframeworks.cc/), interaktif [Cinder](http://libcinder.org/) [Three.js](http://threejs.org/) website atau permaianan iOS/Android.

## Apa yang diajarkan buku ini?

Buku ini akan berfokus pada penggunaan shader piksel GLSL. Pertama kita akan mendefinisikan apa itu shader; kemudian kita akan belajar bagaimana membuat bentuk, pola, tekstur dan animasi prosedural dengannya. Anda akan mempelajari dasar-dasar bahasa bayangan dan menerapkannya pada skenario yang lebih berguna seperti: pemrosesan gambar (operasi gambar, konvolusi matriks, blur, filter warna, tabel pencarian, dan efek lainnya) dan simulasi (permainan hidup Conway, Gray-Scott's reaksi-difusi, riak air, efek cat air, sel Voronoi, dll.). Menjelang akhir buku kita akan melihat seperangkat teknik lanjutan berdasarkan Ray Marching

*Ada contoh interaktif untuk Anda mainkan di setiap bab.* Saat Anda mengubah kode, Anda akan segera melihat perubahannya. Konsepnya bisa abstrak dan membingungkan, jadi contoh interaktif sangat penting untuk membantu Anda mempelajari materi. Semakin cepat Anda menerapkan konsep, semakin mudah proses pembelajarannya.

Apa yang tidak diajarkan buku ini:

* Ini *bukan* buku OpenGL atau WebGL. OpenGL/webGL adalah subyek yang lebih besar dari GLSL atau fragment shader. Untuk mempelajari lebih lanjut tentang OpenGL/WebGL saya merekomendasikan melihat: [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (yang juga dikenal sebagai Red Book) atau [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)


* Ini *bukan* buku matematika. Meskipun kita akan membahas nomor algoritma dan teknik yang mengandalkan pemahaman aljabar linier dan trigonometri, kita tidak akan menjelaskannya secara detail. Untuk pertanyaan mengenai matematika, saya merekomendasikan menyimpan salah satu dari buku: [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) atau [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).


## Apa yang dibutuhkan untuk memulai?

Tidak banyak! Jika anda memiliki browser modern yang dapat melakukan WebGL (seperti Chrome, Firefox atau Safari) dan koneksi internet, klik tombol "Next" di akhir halaman untuk memulai.

Sebagai alternatif, berdasarkan apa yang anda miliki atau apa yang Anda butuhkan dari buku ini, Anda dapat:

- [Membuat versi offline dari buku ini](https://thebookofshaders.com/appendix/00/)

- [Menjalankan contoh di Raspberry Pi tanpa browser](https://thebookofshaders.com/appendix/01/)

- [Membuat PDF untuk dicetak](https://thebookofshaders.com/appendix/02/)

- Cek [repositori Github](https://github.com/patriciogonzalezvivo/thebookofshaders) menyelesaikan masalah dan berbagi kode.