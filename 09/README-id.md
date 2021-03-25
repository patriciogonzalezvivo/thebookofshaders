## Pola

Karena program shader dijalankan oleh piksel demi piksel tidak peduli seberapa banyak Anda mengulang bentuk, jumlah kalkulasi tetap konstan. Ini berarti bahwa shader fragmen sangat cocok untuk pola ubin.

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

Dalam bab ini kita akan menerapkan apa yang telah kita pelajari sejauh ini dan mengulanginya di sepanjang kanvas. Seperti pada bab-bab sebelumnya, strategi kita akan didasarkan pada perkalian koordinat ruang (antara 0,0 dan 1,0), sehingga bentuk yang kita gambar di antara nilai 0,0 dan 1,0 akan diulang untuk membuat kisi.

*"Grid menyediakan kerangka kerja di mana intuisi dan penemuan manusia dapat beroperasi dan dapat menumbangkan. Dalam kekacauan pola alam memberikan batasan dan janji ketertiban. Dari pola awal pada tembikar hingga mosaik geometris di pemandian Romawi, orang sudah lama menggunakan kisi-kisi untuk meningkatkan kehidupan mereka dengan dekorasi. "* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

Pertama mari kita ingat fungsi [```fract()```](../glossary/?search=fract). Ini mengembalikan bagian pecahan dari sebuah angka, membuat ```fract()``` pada dasarnya adalah modulo dari satu ([```mod(x, 1.0)```](../glossary/?search=mod)). Dengan kata lain, [```fract()```](../glossary/?search=fract) mengembalikan angka setelah titik mengambang. Variabel sistem koordinat kami yang dinormalisasi (```st```) sudah berubah dari 0,0 menjadi 1,0 sehingga tidak masuk akal untuk melakukan sesuatu seperti:

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

Tetapi jika kita meningkatkan skala sistem koordinat yang dinormalisasi - katakanlah tiga - kita akan mendapatkan tiga urutan interpolasi linier antara 0-1: yang pertama antara 0-1, yang kedua untuk floating point antara 1-2 dan yang ketiga satu untuk floating point antara 2-3.

<div class="codeAndCanvas" data="grid-making.frag"></div>

Sekarang saatnya menggambar sesuatu di setiap subruang, dengan menghapus komentar pada baris 27. (Karena kita mengalikan dengan sama dalam x dan y, rasio aspek ruang tidak berubah dan bentuk akan seperti yang diharapkan.)

Cobalah beberapa latihan berikut untuk mendapatkan pemahaman yang lebih dalam:

* Kalikan spasi dengan angka yang berbeda. Coba dengan nilai floating point dan juga dengan nilai x dan y yang berbeda.

* Buat fungsi yang dapat digunakan kembali dari trik ubin ini.

* Bagilah ruang menjadi 3 baris dan 3 kolom. Temukan cara untuk mengetahui di kolom dan baris mana utas tersebut dan gunakan itu untuk mengubah bentuk yang ditampilkan. Cobalah untuk membuat pertandingan tic-tac-toe.

### Menerapkan matriks di dalam pola

Karena setiap subdivisi atau sel adalah versi yang lebih kecil dari sistem koordinat yang dinormalisasi yang telah kita gunakan, kita dapat menerapkan transformasi matriks padanya untuk menerjemahkan, memutar, atau menskalakan ruang di dalamnya.

<div class="codeAndCanvas" data="checks.frag"></div>

* Pikirkan cara-cara menarik untuk menghidupkan pola ini. Pertimbangkan untuk membuat animasi warna, bentuk, dan gerakan. Buat tiga animasi berbeda.

* Buat kembali pola yang lebih rumit dengan menyusun berbagai bentuk.


[![](diamondtiles-long.png)](../edit.php#09/diamondtiles.frag)

* Gabungkan berbagai lapisan pola untuk membuat [Pola Tartan Skotlandia] Anda sendiri [Scottish Tartan Patterns](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns).

[ ![Vector Pattern Scottish Tartan By Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### Pola offset

Jadi katakanlah kita ingin meniru dinding bata. Melihat ke dinding, Anda dapat melihat setengah bata pada x di setiap baris lainnya. Bagaimana kita bisa melakukannya?

![](brick.jpg)

Sebagai langkah pertama kita perlu mengetahui apakah baris utas kita adalah bilangan genap atau ganjil, karena kita dapat menggunakannya untuk menentukan apakah kita perlu mengimbangi x di baris itu.

____kita harus memperbaiki dua paragraf berikutnya ini bersama-sama____

Untuk menentukan apakah utas kita berada di baris ganjil atau genap, kita akan menggunakan [```mod()```](../glossary/?search=mod) dari ```2.0``` dan kemudian lihat apakah hasilnya di bawah ```1.0``` atau tidak. Perhatikan rumus berikut dan hapus tanda komentar pada dua baris terakhir.

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

Seperti yang Anda lihat, kita dapat menggunakan [operator ternary](https://en.wikipedia.org/wiki/%3F:) untuk memeriksa apakah [```mod()```](../glossary/?search=mod) dari ```2.0``` berada di bawah ```1.0``` (baris kedua) atau serupa kita bisa menggunakan [```step()```](../glossary/?search=step) fungsi yang melakukan operasi yang sama, tetapi lebih cepat. Mengapa? Meskipun sulit untuk mengetahui bagaimana setiap kartu grafis mengoptimalkan dan mengkompilasi kodenya, dapat diasumsikan bahwa fungsi built-in lebih cepat daripada fungsi non-built-in. Setiap kali Anda dapat menggunakan fungsi bawaan, gunakanlah!

Jadi sekarang setelah kita memiliki rumus angka ganjil, kita dapat menerapkan offset ke baris ganjil untuk memberikan efek *bata* pada ubin kita. Baris 14 dari kode berikut adalah tempat kita menggunakan fungsi untuk "mendeteksi" baris ganjil dan memberinya offset setengah unit pada ```x```. Perhatikan bahwa untuk baris genap, hasil dari fungsi kita adalah ```0.0```, dan mengalikan  ```0.0``` dengan offset ```0.5``` menghasilkan offset ```0.0```. Tapi pada baris ganjil kita mengalikan hasil dari fungsi kita, ```1.0```, dengan offset ```0.5```, yang menggerakkan sumbu ```x``` dari sistem koordinat dengan ```0,5```.

Sekarang coba hapus komentar pada baris 32 - ini memperluas rasio aspek dari sistem koordinat untuk meniru aspek "bata modern". Dengan menghapus komentar pada baris 40 Anda dapat melihat bagaimana sistem koordinat terlihat dipetakan menjadi merah dan hijau.

<div class="codeAndCanvas" data="bricks.frag"></div>

* Coba animasikan ini dengan menggerakkan offset menurut waktu.

* Buat animasi lain di mana baris genap pindah ke kiri dan baris ganjil pindah ke kanan.

* Dapatkah Anda mengulangi efek ini tetapi dengan kolom?

* Coba gabungkan offset pada sumbu ```x``` dan ```y``` untuk mendapatkan sesuatu seperti ini:

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Ubin Truchet

Sekarang setelah kita belajar bagaimana mengetahui apakah sel kita berada di baris atau kolom genap atau ganjil, dimungkinkan untuk menggunakan kembali satu elemen desain tergantung pada posisinya. Pertimbangkan kasus [Truchet Tiles](http://en.wikipedia.org/wiki/Truchet_tiles) di mana satu elemen desain dapat disajikan dalam empat cara berbeda:

![](truchet-00.png)

Dengan mengubah pola di seluruh ubin, Anda dapat membuat serangkaian desain kompleks yang tak terbatas.

![](truchet-01.png)

Perhatikan baik-baik fungsi ```rotateTilePattern()```, yang membagi ruang menjadi empat sel dan menetapkan sudut rotasi untuk masing-masing sel.

<div class="codeAndCanvas" data="truchet.frag"></div>

* Beri komentar, hapus komentar, dan duplikat baris 69 hingga 72 untuk membuat desain baru.

* Ubah segitiga hitam dan putih untuk elemen lain seperti: setengah lingkaran, kotak atau garis yang diputar.

* Buat kode pola lain di mana elemen diputar sesuai dengan posisinya.

* Buat pola yang mengubah properti lainnya sesuai dengan posisi elemen.

* Pikirkan hal lain yang belum tentu merupakan pola di mana Anda dapat menerapkan asas-asas dari bagian ini. (Contoh: heksagram I Ching)

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## Membuat aturan Anda sendiri

Membuat pola prosedural adalah latihan mental dalam menemukan elemen minimal yang dapat digunakan kembali. Praktik ini sudah tua; Kita sebagai spesies telah lama menggunakan kisi dan pola untuk menghias tekstil, lantai, dan batas benda: dari pola berkelok-kelok di Yunani kuno, hingga desain kisi Cina, kesenangan akan pengulangan dan variasi menangkap imajinasi kita. Luangkan waktu untuk melihat [dekoratif](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [pola](https://www.pinterest.com/patriciogonzv/paterns/) dan lihat bagaimana seniman dan desainer memiliki sejarah panjang dalam menavigasi tepi halus antara keteraturan yang dapat diprediksi dan kejutan variasi dan kekacauan. Dari pola geometris Arab, hingga desain kain Afrika yang indah, ada banyak sekali pola yang dapat dipelajari.

![Franz Sales Meyer - A handbook of ornament (1920)](geometricpatters.png)

Dengan bab ini kami mengakhiri bagian tentang Gambar Algoritmik. Dalam bab-bab berikut kita akan belajar bagaimana membawa beberapa entropi ke shader kita dan menghasilkan desain generatif.