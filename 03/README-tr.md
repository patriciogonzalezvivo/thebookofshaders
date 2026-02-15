## Uniform'lar

Şimdiye kadar GPU'nun, her biri görüntünün toplamının bir kısmına renk atamaktan sorumlu olan çok sayıda paralel iş parçacığını nasıl yönettiğini gördük. Her paralel iş parçacığı diğerlerine kör olsa da, CPU'dan tüm iş parçacıklarına bazı girdiler gönderebilmemiz gerekir. Grafik kartının mimarisi nedeniyle bu girdiler tüm iş parçacıkları için eşit (*uniform*) olacak ve zorunlu olarak *salt okunur* (read only) olarak ayarlanacaktır. Başka bir deyişle, her iş parçacığı okuyabileceği ancak değiştiremeyeceği aynı verileri alır.

Bu girdilere `uniform` denir ve desteklenen çoğu türde gelirler: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` ve `samplerCube`. Uniform'lar, varsayılan kayan nokta hassasiyetini atadıktan hemen sonra shader'ın en üstünde ilgili türle tanımlanır.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Tuval boyutu (genişlik,yükseklik)
uniform vec2 u_mouse;       // ekran piksellerinde fare konumu
uniform float u_time;       // Yüklemeden bu yana saniye cinsinden süre
```

Uniform'ları CPU ve GPU arasındaki küçük köprüler gibi hayal edebilirsiniz. İsimler uygulamadan uygulamaya değişecektir ancak bu örnek serisinde her zaman şunları iletiyorum: `u_time` (shader başladığından beri saniye cinsinden süre), `u_resolution` (shader'ın çizildiği pano boyutu) ve `u_mouse` (pano içindeki fare konumu piksel cinsinden). Bu değişkenin doğası hakkında açık olmak için uniform adından önce `u_` koyma kuralını izliyorum, ancak her türlü uniform adı bulacaksınız. Örneğin [ShaderToy.com](https://www.shadertoy.com/) aynı uniform'ları kullanır ancak şu isimlerle:

```glsl
uniform vec3 iResolution;   // görüntü alanı çözünürlüğü (piksel cinsinden)
uniform vec4 iMouse;        // fare piksel koordinatları. xy: geçerli, zw: tıklama
uniform float iTime;        // shader oynatma süresi (saniye cinsinden)
```

Yeterince konuştuk, uniform'ları eylem halinde görelim. Aşağıdaki kodda, panodaki kırmızı miktarının geçişini canlandırmak için bir sinüs fonksiyonuyla birlikte `u_time`'ı - shader çalışmaya başladığından beri geçen saniye sayısını - kullanıyoruz.

<div class="codeAndCanvas" data="time.frag"></div>

Gördüğünüz gibi GLSL'in daha fazla sürprizi var. GPU, donanım hızlandırmalı açı, trigonometrik ve üstel fonksiyonlara sahiptir. Bu fonksiyonlardan bazıları şunlardır: [`sin()`](../glossary/?search=sin&lan=tr), [`cos()`](../glossary/?search=cos&lan=tr), [`tan()`](../glossary/?search=tan&lan=tr), [`asin()`](../glossary/?search=asin&lan=tr), [`acos()`](../glossary/?search=acos&lan=tr), [`atan()`](../glossary/?search=atan&lan=tr), [`pow()`](../glossary/?search=pow&lan=tr), [`exp()`](../glossary/?search=exp&lan=tr), [`log()`](../glossary/?search=log&lan=tr), [`sqrt()`](../glossary/?search=sqrt&lan=tr), [`abs()`](../glossary/?search=abs&lan=tr), [`sign()`](../glossary/?search=sign&lan=tr), [`floor()`](../glossary/?search=floor&lan=tr), [`ceil()`](../glossary/?search=ceil&lan=tr), [`fract()`](../glossary/?search=fract&lan=tr), [`mod()`](../glossary/?search=mod&lan=tr), [`min()`](../glossary/?search=min&lan=tr), [`max()`](../glossary/?search=max&lan=tr) ve [`clamp()`](../glossary/?search=clamp&lan=tr).

Şimdi yukarıdaki kodla oynama zamanı.

* Renk değişimi neredeyse algılanamaz hale gelene kadar frekansı yavaşlatın.

* Titreşmeden tek bir renk görene kadar hızlandırın.

* İlginç desenler ve davranışlar elde etmek için üç kanalla (RGB) farklı frekanslarda oynayın.

## gl_FragCoord

GLSL'in bize varsayılan bir çıktı olan `vec4 gl_FragColor`'ı vermesi gibi, bize varsayılan bir girdi olan `vec4 gl_FragCoord`'ı da verir; bu, aktif iş parçacığının üzerinde çalıştığı *pikselin* veya *ekran parçasının* ekran koordinatlarını tutar. `vec4 gl_FragCoord` ile bir iş parçacığının panonun neresinde çalıştığını biliriz. Bu durumda buna `uniform` demiyoruz çünkü iş parçacığından iş parçacığına farklı olacaktır, bunun yerine `gl_FragCoord`'a *varying* (değişen) denir.

<div class="codeAndCanvas" data="space.frag"></div>

Yukarıdaki kodda, parçanın koordinatını panonun toplam çözünürlüğüne bölerek *normalize* ediyoruz. Bunu yaparak değerler `0.0` ve `1.0` arasına gelecektir, bu da X ve Y değerlerini KIRMIZI ve YEŞİL kanala eşlemeyi kolaylaştırır.

Shader diyarında, değişkenlere güçlü renkler atamak ve onlardan bir anlam çıkarmaya çalışmak dışında hata ayıklama (debugging) için çok fazla kaynağımız yoktur. Bazen GLSL'de kodlamanın şişelerin içine gemi koymaya çok benzediğini keşfedeceksiniz. Aynı derecede zor, güzel ve tatmin edicidir.

![](08.png)

Şimdi bu kod hakkındaki anlayışımızı deneme ve zorlama zamanı.

* `(0.0, 0.0)` koordinatının tuvalimizin neresinde olduğunu söyleyebilir misiniz?

* Peki ya `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` ve `(1.0, 1.0)`?

* Değerlerin piksel cinsinden olduğunu ve normalize EDİLMEDİĞİNİ bilerek `u_mouse`'u nasıl kullanacağınızı bulabilir misiniz? Renkleri hareket ettirmek için kullanabilir misiniz?

* `u_time` ve `u_mouse` koordinatlarını kullanarak bu renk desenini değiştirmenin ilginç bir yolunu hayal edebilir misiniz?

Bu alıştırmaları yaptıktan sonra yeni shader güçlerinizi başka nerede deneyebileceğinizi merak edebilirsiniz. Sonraki bölümde three.js, Processing ve openFrameworks'te kendi shader araçlarınızı nasıl yapacağınızı göreceğiz.
