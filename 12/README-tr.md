![](dragonfly.jpg)

## Hücresel Gürültü

1996'da, Perlin'in orijinal Gürültüsünden on altı yıl sonra ve Simpleks Gürültüsünden beş yıl önce, [Steven Worley "A Cellular Texture Basis Function" adlı bir makale yazdı](http://www.rhythmiccanvas.com/research/papers/worley.pdf). Bu makalede, grafik topluluğu tarafından artık yaygın olarak kullanılan prosedürel bir dokulama tekniği tanımladı.

Arkasındaki prensipleri anlamak için **yineleme** açısından düşünmeye başlamamız gerekir. Muhtemelen bunun ne anlama geldiğini biliyorsunuzdur: evet, ```for``` döngülerini kullanmaya başlayın. GLSL'de ```for``` döngülerinin tek bir tuhaflığı var: kontrol ettiğimiz sayı sabit (```const```) olmalıdır. Yani dinamik döngü yok — yineleme sayısı sabitlenmelidir.

Bir örneğe bakalım.

### Mesafe alanı için noktalar

Hücresel Gürültü, mesafe alanlarına dayanır; bir dizi özellik noktasından en yakın olanına olan mesafe. Diyelim ki 4 noktanın mesafe alanını yapmak istiyoruz. Ne yapmamız gerekir? **Her piksel için en yakın noktaya olan mesafeyi hesaplamak** istiyoruz. Bu, tüm noktalar arasında yinelememiz, mevcut piksele olan mesafelerini hesaplamamız ve en yakın olanın değerini saklamamız gerektiği anlamına gelir.

```glsl
    float min_dist = 100.; // Bir noktaya en yakın mesafeyi saklayan değişken

    min_dist = min(min_dist, distance(st, point_a));
    min_dist = min(min_dist, distance(st, point_b));
    min_dist = min(min_dist, distance(st, point_c));
    min_dist = min(min_dist, distance(st, point_d));
```

![](cell-00.png)

Bu çok zarif değildir, ama işi görür. Şimdi bir dizi ve ```for``` döngüsü kullanarak yeniden uygulayalım.

```glsl
    float m_dist = 100.;  // minimum mesafe
    for (int i = 0; i < TOTAL_POINTS; i++) {
        float dist = distance(st, points[i]);
        m_dist = min(m_dist, dist);
    }
```

Bir nokta dizisi arasında yineleme yapmak ve [```min()```](../glossary/?search=min) fonksiyonu kullanarak minimum mesafeyi takip etmek için ```for``` döngüsünü nasıl kullandığımıza dikkat edin. İşte bu fikrin kısa bir çalışan uygulaması:

<div class="codeAndCanvas" data="cellnoise-00.frag"></div>

Yukarıdaki kodda noktalardan biri fare konumuna atanmıştır. Bu kodun nasıl davrandığı hakkında sezgisel bir fikir edinmek için onunla oynayın. Sonra şunu deneyin:

- Geri kalan noktaları nasıl canlandırabilirsiniz?
- [Şekiller bölümünü](../07/) okuduktan sonra, bu mesafe alanını kullanmanın ilginç yollarını hayal edin!
- Ya bu mesafe alanına daha fazla nokta eklemek isterseniz? Ya dinamik olarak nokta eklemek/çıkarmak istesek?

### Döşeleme ve yineleme

Muhtemelen ```for``` döngülerinin ve *dizilerin* GLSL ile çok iyi arkadaş olmadığını fark etmişsinizdir. Daha önce söylediğimiz gibi, döngüler çıkış koşullarında dinamik sınırlar kabul etmez. Ayrıca birçok örnek arasında yineleme yapmak shader'ınızın performansını önemli ölçüde azaltır. Bu, büyük miktarda nokta için bu doğrudan yaklaşımı kullanamayacağımız anlamına gelir. GPU'nun paralel işleme mimarisinden yararlanan başka bir strateji bulmamız gerekir.

![](cell-01.png)

Bu soruna yaklaşmanın bir yolu, uzayı döşemelere bölmektir. Her pikselin her bir noktaya olan mesafeyi kontrol etmesi gerekmiyor, değil mi? Her piksel kendi iş parçacığında çalıştığı göz önüne alındığında, uzayı hücrelere bölebiliriz; her biri izlenecek benzersiz bir noktaya sahiptir. Ayrıca, hücreler arasındaki kenarlardaki sapmaları önlemek için komşu hücrelerdeki noktalara olan mesafeleri de kontrol etmemiz gerekir. [Steven Worley'nin makalesinin](http://www.rhythmiccanvas.com/research/papers/worley.pdf) ana parlak fikri budur. Sonuçta, her pikselin yalnızca dokuz konumu kontrol etmesi gerekir: kendi hücresinin noktası ve etrafındaki 8 hücredeki noktalar. Uzayı zaten şu bölümlerde hücrelere ayırdık: [desenler](../09/), [rastgelelik](../10/) ve [gürültü](../11/), bu yüzden umarız bu tekniğe artık aşinasınızdır.

```glsl
    // Ölçekleme
    st *= 3.;

    // Uzayı döşeleme
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
```

Plan nedir? Döşeme koordinatlarını (tam sayı koordinatında saklanan, ```i_st```) bir noktanın rastgele konumunu oluşturmak için kullanacağız. Kullanacağımız ```random2f``` fonksiyonu bir ```vec2``` alır ve bize rastgele bir konuma sahip bir ```vec2``` verir. Böylece her döşeme için döşemenin içinde rastgele bir konumda bir özellik noktası olacaktır.

```glsl
    vec2 point = random2(i_st);
```

O döşemenin içindeki her piksel (float koordinatında saklanan, ```f_st```) o rastgele noktaya olan mesafesini kontrol edecektir.

```glsl
    vec2 diff = point - f_st;
    float dist = length(diff);
```

Sonuç şöyle görünecektir:

<a href="../edit.php#12/cellnoise-01.frag"><img src="cellnoise.png"  width="520px" height="200px"></img></a>

Yine de sadece mevcut döşemedeki değil, çevreleyen döşemelerdeki noktalara olan mesafeleri de kontrol etmemiz gerekir. Bunun için komşu döşemeler arasında **yinelememiz** gerekir. Tüm döşemeler değil, sadece mevcut olanın hemen çevresindekiler. Yani ```x``` ekseninde ```-1``` (sol) ile ```1``` (sağ) döşeme ve ```y``` ekseninde ```-1``` (alt) ile ```1``` (üst) arasında. 9 döşemelik 3x3'lük bir bölge, şöyle bir çift ```for``` döngüsüyle yinelenebilir:

```glsl
for (int y= -1; y <= 1; y++) {
    for (int x= -1; x <= 1; x++) {
        // Izgaradaki komşu yeri
        vec2 neighbor = vec2(float(x),float(y));
        ...
    }
}
```

![](cell-02.png)

Şimdi, çift ```for``` döngümüzde komşu döşeme ofsetini mevcut döşeme koordinatına ekleyerek komşuların her birindeki noktaların konumunu hesaplayabiliriz.

```glsl
        ...
        // Mevcut + komşu ızgara yerinden rastgele konum
        vec2 point = random2(i_st + neighbor);
        ...
```

Gerisinin tamamı, o noktaya olan mesafeyi hesaplama ve en yakın olanı ```m_dist``` (minimum mesafe) adlı bir değişkende saklama ile ilgilidir.

```glsl
        ...
        vec2 diff = neighbor + point - f_st;

        // Noktaya olan mesafe
        float dist = length(diff);

        // Daha yakın mesafeyi tut
        m_dist = min(m_dist, dist);
        ...
```

Yukarıdaki kod, [Inigo Quilez'in bu makalesinden](http://www.iquilezles.org/www/articles/smoothvoronoi/smoothvoronoi.htm) ilham almıştır.

Özetleyecek olursak: uzayı döşemelere ayırırız; her piksel kendi döşemesindeki ve çevresindeki 8 döşemedeki noktaya olan mesafeyi hesaplar; en yakın mesafeyi saklar. Sonuç, aşağıdaki örneğe benzeyen bir mesafe alanıdır:

<div class="codeAndCanvas" data="cellnoise-02.frag"></div>

Daha fazla keşfedin:

- Uzayı farklı değerlerle ölçekleyin.
- Noktaları canlandırmanın başka yollarını düşünebilir misiniz?
- Ya fare konumuyla ekstra bir nokta hesaplamak istesek?
- ```m_dist = min(m_dist, dist);``` dışında bu mesafe alanını oluşturmanın hangi diğer yollarını hayal edebilirsiniz?
- Bu mesafe alanıyla hangi ilginç desenleri yapabilirsiniz?

Bu algoritma, piksellerin değil noktaların perspektifinden de yorumlanabilir. Bu durumda şöyle tarif edilebilir: her nokta, başka bir noktanın büyüyen alanını bulana kadar büyür. Bu, doğadaki bazı büyüme kurallarını yansıtır. Yaşayan formlar, genişleme ve büyüme iç gücü ile dış güçlerin sınırlamaları arasındaki bu gerilim tarafından şekillendirilir. Bu davranışı simüle eden klasik algoritma, [Georgy Voronoi](https://en.wikipedia.org/wiki/Georgy_Voronoy) adını taşır.

![](monokot_root.jpg)

### Voronoi Algoritması

Hücresel gürültüden Voronoi diyagramları oluşturmak göründüğünden daha az zordur. Sadece piksele en yakın olan kesin nokta hakkında bazı ek bilgileri *saklamamız* gerekir. Bunun için ```m_point``` adlı bir ```vec2``` kullanacağız. En yakın noktanın merkezine olan vektör yönünü sadece mesafe yerine saklayarak, o noktanın "benzersiz" bir tanımlayıcısını "saklayacağız".

```glsl
    ...
    if( dist < m_dist ) {
        m_dist = dist;
        m_point = point;
    }
    ...
```

Aşağıdaki kodda en yakın mesafeyi hesaplamak için artık ```min``` kullanmadığımızı, normal bir ```if``` ifadesi kullandığımızı not edin. Neden? Çünkü daha yakın yeni bir nokta göründüğünde aslında daha fazlasını yapmak, yani konumunu saklamak (32-37 arası satırlar) istiyoruz.

<div class="codeAndCanvas" data="vorono-00.frag"></div>

Hareket eden hücrenin (fare konumuna bağlı) renginin konumuna göre nasıl değiştiğine dikkat edin. Bu, rengin en yakın noktanın değeri (konumu) kullanılarak atanmasından kaynaklanır.

Daha önce yaptığımız gibi, şimdi bunu ölçeklendirmenin, [Steven Worley'nin makalesinin yaklaşımına](http://www.rhythmiccanvas.com/research/papers/worley.pdf) geçmenin zamanı. Kendiniz uygulamayı deneyin. Tıklayarak aşağıdaki örneğin yardımını alabilirsiniz.

<a href="../edit.php#12/vorono-01.frag"><canvas id="custom" class="canvas" data-fragment-url="vorono-01.frag"  width="520px" height="200px"></canvas></a>

Bu algoritmayı anladıktan sonra, ilginç ve yaratıcı kullanımlar düşünün.

![Extended Voronoi - Leo Solaas (2011)](solas.png)

![Cloud Cities - Tomás Saraceno (2011)](saraceno.jpg)

![Accretion Disc Series - Clint Fulkerson](accretion.jpg)

![Vonoroi Puzzle - Reza Ali (2015)](reza.png)

### Voronoi'yi İyileştirme

2011'de, [Stefan Gustavson Steven Worley'nin algoritmasını GPU için optimize etti](http://webstaff.itn.liu.se/~stegu/GLSL-cellular/GLSL-cellular-notes.pdf), 3x3 yerine sadece 2x2 matris üzerinde yineleme yaparak. Bu, iş miktarını önemli ölçüde azaltır, ancak döşemeler arasındaki kenarlarda süreksizlik şeklinde artefaktlar oluşturabilir. Aşağıdaki örneklere bakın.

<div class="glslGallery" data="12/2d-cnoise-2x2,12/2d-cnoise-2x2x2,12/2d-cnoise,12/3d-cnoise" data-properties="clickRun:editor,openFrameIcon:false"></div>

Daha sonra 2012'de [Inigo Quilez kesin Voronoi sınırları yapma hakkında bir makale yazdı](http://www.iquilezles.org/www/articles/voronoilines/voronoilines.htm).

<a href="../edit.php#12/2d-voronoi.frag"><img src="2d-voronoi.gif"  width="520px" height="200px"></img></a>

Inigo'nun Voronoi deneyleri burada bitmedi. 2014'te [voro-noise](http://www.iquilezles.org/www/articles/voronoise/voronoise.htm) dediği şey hakkında güzel bir makale yazdı, normal gürültü ile voronoi arasında kademeli bir harmanlama sağlayan bir fonksiyon. Kendi sözleriyle:

*"Bu benzerliğe rağmen, gerçek şu ki ızgaranın her iki desende kullanılma şekli farklıdır. Gürültü rastgele değerleri (değer gürültüsünde olduğu gibi) veya gradyanları (gradyan gürültüsünde olduğu gibi) enterpolasyon yapar/ortalar, Voronoi ise en yakın özellik noktasına olan mesafeyi hesaplar. Şimdi, düzgün çift doğrusal enterpolasyon ve minimum değerlendirme çok farklı iki işlemdir, veya... öyle midir? Belki daha genel bir metrikte birleştirilebilirler mi? Eğer öyleyse, hem Gürültü hem de Voronoi desenleri, daha genel bir ızgara tabanlı desen oluşturucunun özel durumları olarak görülebilir mi?"*

<a href="../edit.php#12/2d-voronoise.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoise.frag"  width="520px" height="200px"></canvas></a>

Şimdi yakından bakma, doğadan ilham alma ve bu tekniğe kendi yaklaşımınızı bulma zamanı!

![Deyrolle glass film - 1831](DeyrolleFilm.png)

<div class="glslGallery" data="12/metaballs,12/stippling,12/cell,12/tissue,12/cracks,160504143842" data-properties="clickRun:editor,openFrameIcon:false"></div>

#### Araç kutunuz için

* [LYGIA'nın üretken fonksiyonları](https://lygia.xyz/generative), GLSL'de desenler üretmek için yeniden kullanılabilir fonksiyonlar kümesidir. Üretken sanat yaratmak için rastgelelik ve gürültüyü nasıl kullanacağınızı öğrenmek için harika bir kaynaktır. Yeniden kullanılabilirlik, performans ve esneklik için tasarlanmış çok ayrıntılı bir kütüphanedir. Ve herhangi bir projeye ve framework'e kolayca eklenebilir.
