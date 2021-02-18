![](dragonfly.jpg)

## Noise Seluler

Pada tahun 1996, enam belas tahun setelah Kebisingan asli Perlin dan lima tahun sebelum Kebisingan Simplex, [Steven Worley menulis makalah berjudul "A Cellular Texture Basis Function"](http://www.rhythmiccanvas.com/research/papers/worley.pdf). Di dalamnya, ia menjelaskan teknik tekstur prosedural yang sekarang banyak digunakan oleh komunitas grafis.

Untuk memahami prinsip di baliknya kita perlu mulai berpikir dalam **iterasi**. Mungkin Anda tahu apa artinya: ya, mulailah menggunakan loop ```untuk```. Hanya ada satu tangkapan dengan loop ```untuk``` di GLSL: angka yang kami periksa harus berupa konstanta (```const```). Jadi, tidak ada loop dinamis - jumlah iterasi harus diperbaiki.

Mari kita lihat contohnya.

### Poin untuk bidang jarak

Noise Seluler didasarkan pada bidang jarak, jarak ke yang terdekat dari serangkaian titik fitur. Katakanlah kita ingin membuat bidang jarak dari 4 titik. Apa yang harus kita lakukan? Nah, **untuk setiap piksel kami ingin menghitung jarak ke titik terdekat**. Itu berarti kita perlu mengulangi semua titik, menghitung jaraknya ke piksel saat ini dan menyimpan nilai untuk yang terdekat.

```glsl
    float min_dist = 100.; // A variable to store the closest distance to a point

    min_dist = min(min_dist, distance(st, point_a));
    min_dist = min(min_dist, distance(st, point_b));
    min_dist = min(min_dist, distance(st, point_c));
    min_dist = min(min_dist, distance(st, point_d));
```

![](cell-00.png)

Ini tidak terlalu elegan, tetapi berhasil. Sekarang mari kita implementasikan ulang menggunakan array dan loop ```for```.

```glsl
    float m_dist = 100.;  // minimum distance
    for (int i = 0; i < TOTAL_POINTS; i++) {
        float dist = distance(st, points[i]);
        m_dist = min(m_dist, dist);
    }
```

Perhatikan bagaimana kita menggunakan loop ```for``` untuk mengulang melalui larik titik dan melacak jarak minimum menggunakan [```min()```](../glossary/?search=min) fungsi. Berikut adalah implementasi kerja singkat dari gagasan ini:

<div class="codeAndCanvas" data="cellnoise-00.frag"></div>

Dalam kode di atas, salah satu titik ditetapkan ke posisi mouse. Mainkan dengan itu sehingga Anda bisa mendapatkan ide intuitif tentang bagaimana kode ini berperilaku. Kemudian coba ini:

- Bagaimana Anda bisa menghidupkan poin lainnya?
- Setelah membaca [bab tentang bentuk](../07/), bayangkan cara menarik menggunakan bidang jarak ini!
- Bagaimana jika Anda ingin menambahkan lebih banyak titik ke bidang jarak ini? Bagaimana jika kita ingin menambah / mengurangi poin secara dinamis?

### Tile dan Iterasi

Anda mungkin memperhatikan bahwa loop ```for``` dan *array* tidak terlalu berteman baik dengan GLSL. Seperti yang kami katakan sebelumnya, loop tidak menerima batas dinamis pada kondisi keluarnya. Selain itu, melakukan iterasi melalui banyak contoh akan mengurangi kinerja shader Anda secara signifikan. Itu berarti kita tidak dapat menggunakan pendekatan langsung ini untuk poin dalam jumlah besar. Kita perlu menemukan strategi lain, yang memanfaatkan arsitektur pemrosesan paralel dari GPU.

![](cell-01.png)

Salah satu cara untuk mengatasi masalah ini adalah dengan membagi ruang menjadi tile. Tidak setiap piksel perlu memeriksa jarak ke setiap titik, bukan? Mengingat fakta bahwa setiap piksel berjalan di utasnya sendiri, kita dapat membagi ruang menjadi sel, masing-masing dengan satu titik unik untuk diperhatikan. Selain itu, untuk menghindari penyimpangan di tepi antar sel, kita perlu memeriksa jarak ke titik di sel tetangga. Itulah gagasan cemerlang utama dari [makalah Steven Worley](http://www.rhythmiccanvas.com/research/papers/worley.pdf). Pada akhirnya, setiap piksel hanya perlu memeriksa sembilan posisi: titik selnya sendiri dan titik di 8 sel di sekitarnya. Kami sudah membagi ruang menjadi sel di bab-bab tentang: [pola](../09/), [acak](../10/) dan [noise](../11/), jadi semoga Anda sudah terbiasa dengan teknik ini sekarang.

```glsl
    // Scale
    st *= 3.;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
```

Jadi apa rencananya? Kami akan menggunakan koordinat petak (disimpan dalam koordinat bilangan bulat, ```i_st```) untuk membangun posisi acak suatu titik. Fungsi ```random2f``` yang akan kita gunakan menerima ```vec2``` dan memberi kita ```vec2``` dengan posisi acak. Jadi, untuk setiap tile kita akan memiliki satu titik fitur dalam posisi acak di dalam tile.

```glsl
    vec2 point = random2(i_st);
```

Setiap piksel di dalam petak itu (disimpan dalam koordinat float, ```f_st```) akan memeriksa jaraknya ke titik acak itu.

```glsl
    vec2 diff = point - f_st;
    float dist = length(diff);
```

Hasilnya akan terlihat seperti ini:

<a href="../edit.php#12/cellnoise-01.frag"><img src="cellnoise.png"  width="520px" height="200px"></img></a>


Kami masih perlu memeriksa jarak ke titik-titik di tile sekitarnya, bukan hanya yang ada di tile saat ini. Untuk itu kita perlu **iterasi** melalui tile tetangga. Tidak semua tile, hanya yang tepat di sekitar tile saat ini. Artinya, dari petak ```-1``` (kiri) ke ```1``` (kanan) dalam sumbu ```x``` dan ```-1``` (bottom) menjadi ```1``` (atas) dalam sumbu ```y```. Wilayah 3x3 dengan 9 petak dapat diiterasi menggunakan pengulangan ```for``` ganda seperti ini:

```glsl
for (int y= -1; y <= 1; y++) {
    for (int x= -1; x <= 1; x++) {
        // Neighbor place in the grid
        vec2 neighbor = vec2(float(x),float(y));
        ...
    }
}
```

![](cell-02.png)

Sekarang, kita dapat menghitung posisi titik pada masing-masing tetangga di loop ganda ```for``` dengan menambahkan offset tile tetangga ke koordinat tile saat ini.

```glsl
        ...
        // Random position from current + neighbor place in the grid
        vec2 point = random2(i_st + neighbor);
        ...
```

Selebihnya adalah tentang menghitung jarak ke titik itu dan menyimpan yang terdekat dalam variabel yang disebut ```m_dist``` (untuk jarak minimum).

```glsl
        ...
        vec2 diff = neighbor + point - f_st;

        // Distance to the point
        float dist = length(diff);

        // Keep the closer distance
        m_dist = min(m_dist, dist);
        ...
```


Kode di atas terinspirasi oleh [artikel ini oleh Inigo's Quilez](http://www.iquilezles.org/www/articles/smoothvoronoi/smoothvoronoi.htm) di mana dia berkata:

*"... mungkin perlu diperhatikan bahwa ada trik bagus dalam kode ini di atas. Sebagian besar implementasi di luar sana mengalami masalah presisi, karena mereka menghasilkan titik acak mereka dalam ruang" domain "(seperti ruang "dunia" atau "objek "), yang dapat secara sewenang-wenang jauh dari asalnya. Seseorang dapat menyelesaikan masalah memindahkan semua kode ke tipe data presisi lebih tinggi, atau dengan menjadi sedikit pintar. Implementasi saya tidak menghasilkan poin dalam ruang "domain", tetapi di "sel "spasi: setelah bagian bilangan bulat dan pecahan dari titik bayangan diekstraksi dan oleh karena itu sel tempat kami bekerja diidentifikasi, yang kami pedulikan adalah apa yang terjadi di sekitar sel ini, yang berarti kami dapat membuang semua bagian bilangan bulat dari koordinat kami semua bersama-sama, menyimpan banyak bit presisi. Faktanya, dalam implementasi voronoi biasa, bagian bilangan bulat dari koordinat titik hanya meniadakan ketika titik fitur acak per sel dikurangi dari titik bayangan. Dalam penerapan di atas, kami bahkan tidak membiarkan tongkat itu lation terjadi, karena kita memindahkan semua komputasi ke ruang "sel". Trik ini juga memungkinkan seseorang untuk menangani kasus di mana Anda ingin voronoi-shade seluruh planet - seseorang dapat dengan mudah mengganti input menjadi presisi ganda, melakukan perhitungan floor() dan fract(), dan pergi floating point dengan sisa perhitungan tanpa membayar biaya untuk mengubah seluruh implementasi menjadi presisi ganda. Tentu saja, trik yang sama berlaku untuk pola Perlin Noise (tetapi saya belum pernah melihatnya diterapkan atau didokumentasikan di mana pun)."*

Rekapitulasi: kami membagi ruang menjadi tile; setiap piksel akan menghitung jarak ke titik di tile mereka sendiri dan 8 tile sekitarnya; simpan jarak terdekat. Hasilnya adalah bidang jarak yang terlihat seperti contoh berikut:

<div class="codeAndCanvas" data="cellnoise-02.frag"></div>

Jelajahi lebih jauh dengan:

- Penskalaan ruang dengan nilai yang berbeda.
- Dapatkah Anda memikirkan cara lain untuk menghidupkan poin?
- Bagaimana jika kita ingin menghitung titik ekstra dengan posisi mouse?
- Cara lain apa untuk membangun bidang jarak ini yang dapat Anda bayangkan, selain ```m_dist=min(m_dist, dist);```?
- Pola menarik apa yang dapat Anda buat dengan bidang jarak ini?

Algoritma ini juga dapat diinterpretasikan dari perspektif titik dan bukan piksel. Dalam hal itu dapat digambarkan sebagai: setiap titik tumbuh hingga menemukan area tumbuh dari titik lain. Ini mencerminkan beberapa aturan pertumbuhan di alam. Bentuk kehidupan dibentuk oleh ketegangan antara kekuatan dalam untuk berkembang dan tumbuh, dan batasan oleh kekuatan luar. Algoritme klasik yang menyimulasikan perilaku ini dinamai [Georgy Voronoi] (https://en.wikipedia.org/wiki/Georgy_Voronoy).

![](monokot_root.jpg)

### Algoritma Voronoi

Membuat diagram Voronoi dari kebisingan seluler tidak sesulit kelihatannya. Kami hanya perlu *menyimpan* beberapa informasi tambahan tentang titik persis yang paling dekat dengan piksel. Untuk itu kita akan menggunakan ```vec2``` yang disebut ```m_point```. Dengan menyimpan arah vektor ke pusat titik terdekat, bukan hanya jarak, kita akan "menyimpan" pengenal "unik" dari titik tersebut.

```glsl
    ...
    if( dist < m_dist ) {
        m_dist = dist;
        m_point = point;
    }
    ...
```

Perhatikan bahwa dalam kode berikut ini kita tidak lagi menggunakan ```min``` untuk menghitung jarak terdekat, tetapi pernyataan ```if``` biasa. Mengapa? Karena sebenarnya kita ingin melakukan sesuatu yang lebih setiap kali muncul titik dekat baru, yaitu menyimpan posisinya (baris 32 sampai 37).

<div class="codeAndCanvas" data="vorono-00.frag"></div>

Perhatikan bagaimana warna sel yang bergerak (terikat pada posisi mouse) berubah warna sesuai dengan posisinya. Itu karena warna ditetapkan menggunakan nilai (posisi) titik terdekat.

Seperti yang kami lakukan sebelumnya, sekarang adalah waktu untuk meningkatkan ini, beralih ke [pendekatan makalah Steven Worley](http://www.rhythmiccanvas.com/research/papers/worley.pdf). Coba terapkan sendiri. Anda dapat menggunakan bantuan contoh berikut dengan mengkliknya. Perhatikan bahwa pendekatan asli Steven Worley menggunakan sejumlah variabel poin fitur untuk setiap tile, lebih dari satu di sebagian besar tile. Dalam implementasi perangkat lunaknya di C, ini digunakan untuk mempercepat loop dengan membuat keluar lebih awal. Loop GLSL tidak mengizinkan jumlah variabel iterasi, jadi Anda mungkin ingin tetap menggunakan satu titik fitur per tile.

<a href="../edit.php#12/vorono-01.frag"><canvas id="custom" class="canvas" data-fragment-url="vorono-01.frag"  width="520px" height="200px"></canvas></a>

Setelah Anda mengetahui algoritme ini, pikirkan kegunaan yang menarik dan kreatif untuknya.

![Extended Voronoi - Leo Solaas (2011)](solas.png)

![Cloud Cities - Tomás Saraceno (2011)](saraceno.jpg)

![Accretion Disc Series - Clint Fulkerson](accretion.jpg)

![Vonoroi Puzzle - Reza Ali (2015)](reza.png)

### Meningkatkan Voronoi

Pada tahun 2011, [Stefan Gustavson mengoptimalkan algoritme Steven Worley ke GPU](http://webstaff.itn.liu.se/~stegu/GLSL-cellular/GLSL-cellular-notes.pdf) dengan hanya melakukan iterasi melalui matriks 2x2 alih-alih 3x3. Ini mengurangi jumlah pekerjaan secara signifikan, tetapi dapat membuat artefak dalam bentuk diskontinuitas di tepi antara tile. Lihat contoh berikut.

<div class="glslGallery" data="12/2d-cnoise-2x2,12/2d-cnoise-2x2x2,12/2d-cnoise,12/3d-cnoise" data-properties="clickRun:editor,openFrameIcon:false"></div>

Kemudian pada tahun 2012 [Inigo Quilez menulis artikel tentang cara membuat perbatasan Voronoi yang tepat](http://www.iquilezles.org/www/articles/voronoilines/voronoilines.htm).

<a href="../edit.php#12/2d-voronoi.frag"><img src="2d-voronoi.gif"  width="520px" height="200px"></img></a>

Eksperimen Inigo dengan Voronoi tidak berhenti sampai di situ. Pada tahun 2014 dia menulis artikel bagus ini tentang apa yang dia sebut [voro-noise](http://www.iquilezles.org/www/articles/voronoise/voronoise.htm), sebuah fungsi yang memungkinkan perpaduan bertahap antara noise biasa dan voronoi . Dalam kata-katanya:

*"Terlepas dari kesamaan ini, kenyataannya adalah bahwa cara grid digunakan di kedua pola berbeda. Noise interpolates/rata-rata nilai acak (seperti dalam noise nilai) atau gradien (seperti dalam noise gradien), sementara Voronoi menghitung jarak ke titik fitur terdekat. Sekarang, interpolasi halus-bilinear dan evaluasi minimum adalah dua operasi yang sangat berbeda, atau... benarkah? Bisakah keduanya digabungkan dalam metrik yang lebih umum? Jika demikian, pola Noise dan Voronoi bisa jadi dilihat sebagai kasus tertentu dari generator pola berbasis jaringan yang lebih umum?"*

<a href="../edit.php#12/2d-voronoise.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoise.frag"  width="520px" height="200px"></canvas></a>

Sekarang saatnya bagi Anda untuk melihat lebih dekat pada berbagai hal, terinspirasi oleh alam, dan menemukan cara Anda sendiri dalam menggunakan teknik ini!

![Deyrolle glass film - 1831](DeyrolleFilm.png)

<div class="glslGallery" data="12/metaballs,12/stippling,12/cell,12/tissue,12/cracks,160504143842" data-properties="clickRun:editor,openFrameIcon:false"></div>
