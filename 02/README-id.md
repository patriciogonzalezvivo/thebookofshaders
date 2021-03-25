## Hello World

Biasanya contoh "Hello World" adalah langkah pertama untuk mempelajari bahasa baru. Ini sebuah program satu baris sederhana yang menampilkan pesan sambutan yang antusias dan menyatakan peluang di depan.

Dalam rendering teks, GPU adalah tugas yang terlalu rumit untuk langkah pertama, sebagai gantinya kami akan memilih warna sambutan yang cerah untuk meneriakkan antusiasme kami!

<div class="codeAndCanvas" data="hello_world.frag"></div>

Jika anda membaca buku ini dalam browser, blok kode sebelumnya itu interaktif. Itu maksudnya anda dapat mengklik dan mengganti bagain manapun dari kode itu yang ingin anda jelajahi. Perubahan akan segera diperbarui berkat arsitektur GPU yang mengompilasi dan menggantikan shader * dengan cepat *. Cobalah dengan mengubah nilai pada baris 8.

Meskipun kode sederhana ini tidak terlihat banyak, kita kita dapat menyimpulkan pengetahuan substansial darinya:

1. Bahasa Shader memiliki satu fungsi `main` yang mengembalikan warna pada akhir. Ini sama seperti C. 

2. Warna piksel terakhir disimpan ke variabel global yang disediakan `gl_FragColor`.

3. Bahasa beraneka C ini telah membuat *variabel* (seperti `gl_FragColor`), *fungsi* dan *tipe*. Dalam hal ini kita baru saja diperkenalkan dengan `vec4` yang merupakan singkatan dari vektor empat dimensi presisi floating point. Nanti kita akan melihat lebih banyak tipe seperti `vec3` dan` vec2` bersama dengan yang populer: `float`,`int` dan `bool`.

4. Jika kita melihat lebih dekat ke tipe `vec4` kita dapat menyimpulkan bahwa empat argumen menanggapi saluran MERAH, HIJAU, BIRU dan ALPHA. Kita juga dapat melihat bahwa nilai-nilai ini *dinormalisasi*, yang berarti nilainya berubah dari `0.0` ke` 1.0`. Nanti, kita akan belajar bagaimana menormalkan nilai membuatnya lebih mudah untuk * memetakan * nilai antar variabel.

5. *Fitur C* penting lainnya yang dapat kita lihat dalam contoh ini adalah keberadaan makro praprosesor. Makro adalah bagian dari langkah pra-kompilasi. Dengan mereka dimungkinkan untuk `#define` variabel global dan melakukan beberapa operasi bersyarat dasar (dengan `#ifdef` dan `#endif`). Semua perintah makro dimulai dengan hashtag (`#`). Pra-kompilasi terjadi tepat sebelum mengkompilasi dan menyalin semua panggilan ke `#defines` dan centang `#ifdef` (ditentukan) dan kondisional `#ifndef` (tidak ditentukan). Dalam "Hello World!" Contoh di atas, kita hanya menyisipkan baris 2 jika `GL_ES` ditentukan, yang sebagian besar terjadi ketika kode dikompilasi pada perangkat seluler dan browser.

6. Tipe float sangatlah penting dalam shader, jadi tingkat presisi sangat tinggi. Presisi yang lebih rendah artinya semakin cepat waktu renderingnya, tapi dengan biaya kualitas. Anda dapat memilih-milih dan menentukan presisi setiap variabel menggunakan floating point. Dalam baris kedua ('precision mediump float;') kita menyetel seluruh float ke presisi medium. Tetapi kita dapat memilih untuk menyetel mereka ke presisi rendah (`precision lowp float`) atau tinggi (`precision highp float;`).

7. Yang terakhir, dan mungkin yang terpenting, detailnya bahwa spesifikasi GLSL tidak menjamin bahwa variabel akan otomatis ditransmisikan. Apa maksudnya? Pabrikan memiliki pendekatan berbeda untuk mengakselerasikan proses kartu grafis tapi merka dipaksa untuk menjamin spesifikasi minimum. Transmisi otomatis bukan salah satunya. Dalam "Hello World!" contoh `vec4` memiliki ketepatan titik mengambang dan untuk itu diharapkan akan ditetapkan dengan `floats`. Jika Anda ingin membuat kode yang konsisten dan tidak menghabiskan waktu berjam-jam untuk men-debug layar putih, biasakan untuk meletakkan titik (`.`) di float Anda. Kode semacam ini tidak akan selalu berfungsi: 

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);	// ERROR
}
```

Sekarang kita telah menjelaskan elemen paling relevan dari "halo dunia!" program, saatnya untuk mengklik blok kode dan mulai menantang semua yang telah kita pelajari. Anda akan melihat bahwa pada kesalahan, program akan gagal untuk dikompilasi, menampilkan layar putih. Ada beberapa hal yang menarik untuk dicoba, misalnya:

* Mencoba mengganti floats dengan integers, kartu grafis anda mungkin akan atau mungkin tidak akan mentolenransi perilaku ini.

* Mencoba untuk mengkomentari baris 8 dan tidak memberi nilai piksel apa pun pada fungsi. 

* Mencoba membuat fungsi terpisah yang mengembalikan spesisif warna dan menggunakannya dalam `main()`. Sebagai petunjuk, ini adalah kode yang mengembalikan warna merah:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* Ada banyak cara untuk membangun tipe `vec4`, coba untuk menemukan jalan lain. Berikut ini adalah salah satu contohnya:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Meskipun contoh ini tidak terlalu seru, ini adalah contoh dasar - kita mengubah seluruh piksel dalam kanvas menjadi warna tertentu yang sama. Dalam bab berikutnya kita akan melihat bagaimana cara mengubah warna piksel dengan menggunakan dua tipe input: ruang (tempat piksel pada layar) dan waktu (jumlah detik semenjak halaman dimuat).
