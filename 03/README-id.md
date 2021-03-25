## Variabel Seragam (Uniform)

Sejauh ini kita telah melihat bagaimana GPU memanajemen thread paralel dalam jumlah yang besar, masing-masing bertanggung jawab untuk menetapkan warna ke sebagian kecil dari total gambar. Meskipun setiap thread itu buta satu sama lain, kita harus bisa untuk mengirim masukan dari CPU untuk seluruh thread. Karena arsitektur dari kartu grafis, masukan ini akan menjadi sama/seragam (*uniform*) ke semua thread dan harus disetel sebagai *hanya baca*. Dengan kata lain, setiap utas menerima data yang sama yang dapat dibaca tetapi tidak dapat diubah.

Masukan ini dinamakan `uniform` dan tersedia di sebagian besar tipe yang didukung: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` and `samplerCube`. Uniform ditentukan dengan jenis yang sesuai di bagian atas shader tepat setelah menetapkan presisi floating point default. 

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
```
Anda bisa menggambarkan uniform seperti jembatan kecil antara CPU dan GPU. Namanya akan bervariasi dari implementasi ke implementasi, tetapi dalam rangkaian contoh ini saya selalu meneruskan: `u_time` (waktu dalam detik sejak shader dimulai),` u_resolution` (ukuran billboard tempat shader ditarik) dan `u_mouse` (posisi mouse di dalam billboard dalam piksel). Saya mengikuti konvensi meletakkan `u_` sebelum nama seragam agar eksplisit tentang sifat variabel ini tetapi Anda akan menemukan semua jenis nama untuk seragam. Misalnya [ShaderToy.com] (https://www.shadertoy.com/) menggunakan seragam yang sama tetapi dengan nama berikut:

```glsl
uniform vec3 iResolution;   // viewport resolution (in pixels)
uniform vec4 iMouse;        // mouse pixel coords. xy: current, zw: click
uniform float iTime;        // shader playback time (in seconds)
```
Cukup bicaranya, mari melihat uniform dalam aksi. Dalam kode berikut kita menggunakan `u_time` - jumlah detik sejak shader mulai berjalan - bersama dengan fungsi sinus untuk menganimasikan transisi jumlah warna merah di papan iklan.

<div class="codeAndCanvas" data="time.frag"></div>

Seperti yang anda lihat, GLSL memilki banyak kejutan. GPU memiliki fungsi sudut akselerasi perangkat keras, trigonometri, dan eksponensial. Beberapa fungsi diantaranya adalah: [`sin()`](../glossary/?search=sin), [`cos()`](../glossary/?search=cos), [`tan()`](../glossary/?search=tan), [`asin()`](../glossary/?search=asin), [`acos()`](../glossary/?search=acos), [`atan()`](../glossary/?search=atan), [`pow()`](../glossary/?search=pow), [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log), [`sqrt()`](../glossary/?search=sqrt), [`abs()`](../glossary/?search=abs), [`sign()`](../glossary/?search=sign), [`floor()`](../glossary/?search=floor), [`ceil()`](../glossary/?search=ceil), [`fract()`](../glossary/?search=fract), [`mod()`](../glossary/?search=mod), [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) dan [`clamp()`](../glossary/?search=clamp).
Sekarang ini waktunya untuk bermain dengan kode di atas lagi.

* Perlambat frekuensinya sampai warnanya berubah menjadi tak terlihat.

* Percepat sampai anda melihat warna tanpa berkedip.

* Bermainlah dengan tiga saluran (RGB) dalam frekuensi yang berbeda untuk mendapatkan pola dan perilaku yang menarik.

## gl_FragCoord

Dengan cara yang sama GLSL memberi kita keluaran bawaan, `vec4 gl_FragColor`, GLSL juga memberi kita masukan default,` vec4 gl_FragCoord`, yang menyimpan koordinat layar dari *piksel* atau *fragmen layar* tempat thread aktif berfungsi di. Dengan `vec4 gl_FragCoord`, kita tahu di mana sebuah thread bekerja di dalam billboard. Dalam hal ini kita tidak menyebutnya `seragam` karena akan berbeda dari utas ke utas, sebaliknya` gl_FragCoord` disebut *bervariasi*.

<div class="codeAndCanvas" data="space.frag"></div>

Dalam kode di atas kita menormalisasi kordinat dari fragment dengan membaginya dengan total resolusi billboard. Dengan melakukan ini nilainya akan berada diantara `0.0` dan `0.1`, yang memudahkan untuk memetakan nilai X dan Y ke saluran MERAH dan HIJAU.

Di Shader, kita tidak memiliki terlalu banyak sumber daya untuk debugging selain memberikan warna yang kuat ke variabel dan mencoba memahaminya. Anda akan menemukan bahwa terkadang pengkodean dalam GLSL sangat mirip dengan meletakkan kapal di dalam botol. Sama-sama keras, indah, dan memuaskan.

![](08.png)

Sekarang waktunya untuk mencoba dan menantang pemahaman kita terhadap kode ini.

* Bisakah anda mengatakan di mana kordinat `(0.0, 0.0)` pada kanvas kita?

* Bagaimana dengan `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` and `(1.0, 1.0)`? 

* Dapatkah Anda mengetahui cara menggunakan `u_mouse` dengan mengetahui bahwa nilainya dalam piksel dan BUKAN nilai yang dinormalisasi? Bisakah Anda menggunakannya untuk memindahkan warna?

* Dapatkah Anda membayangkan cara yang menarik untuk mengubah pola warna ini menggunakan koordinat `u_time` dan` u_mouse`?

Setelah melakukan latihan ini, Anda mungkin bertanya-tanya di mana lagi Anda bisa mencoba kekuatan shader baru Anda. Pada bab berikut, kita akan melihat cara membuat alat shader Anda sendiri di three.js, Processing, dan openFrameworks.