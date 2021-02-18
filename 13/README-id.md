![Due East over Shadequarter Mountain - Matthew Rangel (2005) ](rangel.jpg)

## Gerak Pecahan Brownian

Noise cenderung memiliki arti yang berbeda bagi orang yang berbeda. Musisi akan menganggapnya dalam istilah suara yang mengganggu, komunikator sebagai interferensi, dan astrofisikawan sebagai radiasi latar gelombang mikro kosmik. Konsep-konsep ini membawa kita kembali ke alasan fisik di balik keacakan di dunia sekitar kita. Namun, mari kita mulai dengan sesuatu yang lebih mendasar, dan lebih sederhana: gelombang dan propertinya. Gelombang adalah fluktuasi dari waktu ke waktu pada beberapa properti. Gelombang audio adalah fluktuasi tekanan udara, gelombang elektromagnetik adalah fluktuasi medan listrik dan magnet. Dua karakteristik penting dari sebuah gelombang adalah amplitudo dan frekuensinya. Persamaan untuk gelombang linier sederhana (satu dimensi) terlihat seperti ini:

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = amplitude * sin(x * frequency);
"></div>

* Coba ubah nilai frekuensi dan amplitudo untuk memahami bagaimana perilakunya.
* Dengan menggunakan fungsi pembentukan, coba ubah amplitudo dari waktu ke waktu.
* Dengan menggunakan fungsi pembentukan, coba ubah frekuensi dari waktu ke waktu.

Dengan melakukan dua latihan terakhir Anda telah berhasil "memodulasi" gelombang sinus, dan Anda baru saja membuat gelombang AM (amplitudo termodulasi) dan FM (frekuensi termodulasi). Selamat!

Sifat lain yang menarik dari gelombang adalah kemampuannya untuk menjumlahkan, yang secara resmi disebut superposisi. Beri komentar/hapus komentar dan atur baris berikut. Perhatikan bagaimana tampilan keseluruhan berubah saat kita menambahkan gelombang dengan amplitudo dan frekuensi yang berbeda secara bersamaan.

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = sin(x * frequency);
float t = 0.01*(-u_time*130.0);
y += sin(x*frequency*2.1 + t)*4.5;
y += sin(x*frequency*1.72 + t*1.121)*4.0;
y += sin(x*frequency*2.221 + t*0.437)*5.0;
y += sin(x*frequency*3.1122+ t*4.269)*2.5;
y *= amplitude*0.06;
"></div>

* Percobaan dengan mengubah frekuensi dan amplitudo untuk gelombang tambahan.
* Apakah mungkin membuat dua gelombang membatalkan satu sama lain? Akan terlihat seperti apa?
* Apakah mungkin menambahkan gelombang sedemikian rupa sehingga mereka akan memperkuat satu sama lain?

Dalam musik, setiap not dikaitkan dengan frekuensi tertentu. Frekuensi untuk nada-nada ini mengikuti pola yang kita sebut skala, di mana penggandaan atau separuh frekuensi sesuai dengan lompatan satu oktaf.

Sekarang, mari gunakan noise Perlin sebagai ganti gelombang sinus! Derau Perlin dalam bentuk dasarnya memiliki tampilan dan nuansa umum yang sama dengan gelombang sinus. Amplitudo dan frekuensinya agak bervariasi, tetapi amplitudonya tetap cukup konsisten, dan frekuensi dibatasi pada kisaran yang cukup sempit di sekitar frekuensi tengah. Ini tidak teratur seperti gelombang sinus, dan lebih mudah untuk membuat tampilan acak dengan merangkum beberapa versi skala noise. Dimungkinkan juga untuk membuat sejumlah gelombang sinus tampak acak juga, tetapi dibutuhkan banyak gelombang berbeda untuk menyembunyikan sifat berkala dan teraturnya.

Dengan menambahkan iterasi yang berbeda dari noise (*oktaf*), di mana kami secara berturut-turut meningkatkan frekuensi dalam langkah-langkah reguler (*lacunaritas*) dan menurunkan amplitudo (*penguatan/gain*) dari **noise** kita dapat memperoleh perincian yang lebih halus di noise dan dapatkan detail yang lebih halus. Teknik ini disebut "Gerak Pecahan Brownian" (*GPB*), atau sederhananya "gangguan fraktal", dan dalam bentuk yang paling sederhana dapat dibuat dengan kode berikut:

<div class="simpleFunction" data="// Properties
const int octaves = 1;
float lacunarity = 2.0;
float gain = 0.5;
//
// Initial values
float amplitude = 0.5;
float frequency = 1.;
//
// Loop of octaves
for (int i = 0; i < octaves; i++) {
&#9;y += amplitude * noise(frequency*x);
&#9;frequency *= lacunarity;
&#9;amplitude *= gain;
}"></div>

* Ubah jumlah oktaf secara bertahap untuk mengulang dari 1 ke 2, 4, 8 dan 10. Lihat apa yang terjadi.
* Jika Anda memiliki lebih dari 4 oktaf, coba ubah nilai lacunarity.
* Juga dengan> 4 oktaf, ubah nilai penguatan dan lihat apa yang terjadi.

Perhatikan bagaimana dengan setiap oktaf tambahan, kurva tampaknya menjadi lebih detail. Perhatikan juga kemiripan diri sementara lebih banyak oktaf ditambahkan. Jika Anda memperbesar kurva, bagian yang lebih kecil terlihat hampir sama dengan keseluruhannya, dan setiap bagian terlihat kurang lebih sama seperti bagian lainnya. Ini adalah properti penting dari fraktal matematika, dan kami mensimulasikan properti itu dalam loop kami. Kami tidak membuat fraktal *benar*, karena kami menghentikan penjumlahan setelah beberapa iterasi, tetapi secara teoritis, kami akan mendapatkan fraktal matematika yang sebenarnya jika kami membiarkan loop berlanjut selamanya dan menambahkan komponen noise dalam jumlah tak terbatas. Dalam grafik komputer, kita selalu memiliki batasan hingga detail terkecil yang dapat kita selesaikan, misalnya ketika objek menjadi lebih kecil dari piksel, jadi tidak perlu membuat jumlah tak terbatas untuk membuat tampilan fraktal. Terkadang banyak istilah mungkin diperlukan, tetapi tidak pernah dalam jumlah yang tak terbatas.

Kode berikut adalah contoh bagaimana GPB dapat diimplementasikan dalam dua dimensi untuk membuat pola yang tampak fraktal:

<div class='codeAndCanvas' data='2d-fbm.frag'></div>

* Kurangi jumlah oktaf dengan mengubah nilai pada baris 37
* Modifikasi lacunarity dari GPB di baris 47
* Jelajahi dengan mengubah keuntungan di baris 48

Teknik ini biasanya digunakan untuk membangun lanskap prosedural. Kemiripan diri dari GPB sangat cocok untuk pegunungan, karena proses erosi yang menciptakan gunung bekerja dengan cara yang menghasilkan jenis kemiripan diri ini di berbagai skala. Jika Anda tertarik dengan penggunaan ini, Anda harus membaca [artikel hebat ini oleh Inigo Quiles tentang noise tingkat lanjut](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm).

![Blackout - Dan Holdsworth (2010)](holdsworth.jpg)

Menggunakan teknik yang kurang lebih sama, juga memungkinkan untuk mendapatkan efek lain seperti yang dikenal sebagai **turbulensi**. Ini pada dasarnya adalah GPB, tetapi dibangun dari nilai absolut dari suara yang ditandatangani untuk menciptakan lembah yang tajam dalam fungsinya.

```glsl
for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise(st));
    st *= 2.;
    amplitude *= .5;
}
```

<a href="../edit.php#13/turbulence.frag"><img src="turbulence-long.png"  width="520px" height="200px"></img></a>

Anggota lain dari kelompok algoritme ini adalah **punggungan**, di mana lembah tajam dibalik untuk membuat punggungan tajam:

```glsl
    n = abs(n);     // create creases
    n = offset - n; // invert so creases are at top
    n = n * n;      // sharpen creases
```

<a href="../edit.php#13/ridge.frag"><img src="ridge-long.png"  width="520px" height="200px"></img></a>

Varian lain yang dapat membuat variasi yang berguna adalah dengan menggandakan komponen noise bersama-sama daripada menambahkannya. Menarik juga untuk menskalakan fungsi noise berikutnya dengan sesuatu yang bergantung pada istilah sebelumnya dalam loop. Ketika kita melakukan hal-hal seperti itu, kita menjauh dari definisi fraktal yang ketat dan menuju bidang "multifaktal" yang relatif tidak dikenal. Multifraktal tidak didefinisikan secara matematis secara ketat, tetapi itu tidak membuatnya kurang berguna untuk grafik. Faktanya, simulasi multifraktal sangat umum dalam perangkat lunak komersial modern untuk pembuatan medan. Untuk bacaan lebih lanjut, Anda dapat membaca bab 16 dari buku "Texturing and Modeling: a Prosedural Approach" (edisi ke-3), oleh Kenton Musgrave. Sayangnya, buku itu sudah tidak dicetak lagi sejak beberapa tahun lalu, tetapi Anda masih dapat menemukannya di perpustakaan dan di pasar barang bekas. (Ada versi PDF dari edisi pertama yang tersedia untuk dibeli secara online, tetapi jangan membelinya - ini hanya membuang-buang uang. Ini dari tahun 1994, dan tidak berisi barang pemodelan medan apa pun dari edisi ke-3.)

### Warping Domain

[Inigo Quiles menulis artikel menarik](http://www.iquilezles.org/www/articles/warp/warp.htm) tentang bagaimana mungkin menggunakan GPB untuk membengkokkan ruang dari GPB. Pikiran bertiup, kan? Ini seperti mimpi di dalam mimpi Inception.

![ f(p) = fbm( p + fbm( p + fbm( p ) ) ) - Inigo Quiles (2002)](quiles.jpg)

Contoh yang kurang ekstrem dari teknik ini adalah kode berikut di mana bungkus digunakan untuk menghasilkan tekstur seperti awan ini. Perhatikan bagaimana properti kemiripan diri tetap ada dalam hasil.

<div class='codeAndCanvas' data='clouds.frag'></div>

Warping tekstur koordinat dengan noise dengan cara ini bisa sangat berguna, sangat menyenangkan, dan sangat sulit untuk dikuasai. Ini adalah alat yang ampuh, tetapi membutuhkan sedikit pengalaman untuk menggunakannya dengan baik. Alat yang berguna untuk ini adalah menggeser koordinat dengan turunan (gradien) noise. [Artikel terkenal oleh Ken Perlin dan Fabrice Neyret disebut "noise aliran"](http://evasion.imag.fr/Publications/2001/PN01/) didasarkan pada gagasan ini. Beberapa implementasi modern noise Perlin menyertakan varian yang menghitung fungsi dan gradien analitiknya. Jika gradien "benar" tidak tersedia untuk fungsi prosedural, Anda selalu dapat menghitung perbedaan hingga untuk memperkirakannya, meskipun ini kurang akurat dan melibatkan lebih banyak pekerjaan.