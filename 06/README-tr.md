![Paul Klee - Color Chart (1931)](klee.jpg)

## Renkler

GLSL vektör tipleri hakkında konuşma fırsatımız pek olmadı. Daha ileri gitmeden önce bu değişkenler hakkında daha fazla bilgi edinmek önemlidir ve renkler konusu onlar hakkında daha fazla şey öğrenmenin harika bir yoludur.

Nesne yönelimli programlama paradigmalarına aşinaysanız, muhtemelen vektörlerin içindeki verilere herhangi bir normal C-benzeri `struct` gibi eriştiğimizi fark etmişsinizdir.

```glsl
vec3 red = vec3(1.0,0.0,0.0);
red.x = 1.0;
red.y = 0.0;
red.z = 0.0;
```

Rengi *x*, *y* ve *z* gösterimi kullanarak tanımlamak kafa karıştırıcı ve yanıltıcı olabilir, değil mi? Bu yüzden aynı bilgiye farklı adlarla erişmenin başka yolları da vardır. `.x`, `.y` ve `.z` değerleri aynı zamanda `.r`, `.g` ve `.b` olarak, ve `.s`, `.t` ve `.p` olarak da çağrılabilir. (`.s`, `.t` ve `.p` genellikle bir dokunun uzaysal koordinatları için kullanılır, bunu ilerideki bir bölümde göreceğiz.) Vektördeki verilere dizin konumunu kullanarak da erişebilirsiniz: `[0]`, `[1]` ve `[2]`.

Aşağıdaki satırlar aynı veriye erişmenin tüm yollarını gösterir:

```glsl
vec4 vector;
vector[0] = vector.r = vector.x = vector.s;
vector[1] = vector.g = vector.y = vector.t;
vector[2] = vector.b = vector.z = vector.p;
vector[3] = vector.a = vector.w = vector.q;
```

Bir vektörün içindeki değişkenlere işaret etmenin bu farklı yolları, açık kod yazmanıza yardımcı olmak için tasarlanmış adlandırma kurallarıdır. Gölgelendirme diline gömülü bu esneklik, renk ve uzay koordinatları hakkında birbirinin yerine düşünmeye başlamanız için bir kapıdır.

GLSL'deki vektör tiplerinin bir diğer harika özelliği, özelliklerin istediğiniz sırada birleştirilebilmesidir; bu da değerleri dönüştürmeyi ve karıştırmayı kolaylaştırır. Bu yeteneğe *swizzle* denir.

```glsl
vec3 yellow, magenta, green;

// Sarı yapma
yellow.rg = vec2(1.0);  // Kırmızı ve yeşil kanallara 1 atama
yellow[2] = 0.0;        // Mavi kanala 0 atama

// Magenta yapma
magenta = yellow.rbg;   // Yeşil ve mavi kanalları değiştirilmiş olarak ata

// Yeşil yapma
green.rgb = yellow.bgb; // Sarının mavi kanalını (0) kırmızı ve mavi kanallara ata
```

### Renk karıştırma

Artık renklerin nasıl tanımlandığını bildiğinize göre, bunu önceki bilgilerimizle entegre etmenin zamanı geldi. GLSL'de çok kullanışlı bir fonksiyon olan [`mix()`](../glossary/?search=mix) vardır, iki değeri yüzdelerle karıştırmanızı sağlar. Yüzde aralığının ne olduğunu tahmin edebilir misiniz? Evet, 0.0 ile 1.0 arasındaki değerler! Çitle karate hareketleri pratiği yaparak geçirdiğiniz uzun saatlerden sonra bunları kullanmanın zamanı geldi!

![](mix-f.jpg)

Aşağıdaki kodu 18. satırda kontrol edin ve `colorA` ile `colorB`'yi karıştırmak için zamana bağlı bir sinüs dalgasının mutlak değerlerini nasıl kullandığımızı görün.

<div class="codeAndCanvas" data="mix.frag"></div>

Yeteneklerinizi sergileyerek:

* Renkler arasında ifade gücü yüksek bir geçiş yapın. Belirli bir duygu düşünün. Hangi renk onu en çok temsil ediyor? Nasıl ortaya çıkıyor? Nasıl kayboluyor? Başka bir duygu ve ona uygun renk düşünün. Yukarıdaki kodun başlangıç ve bitiş renklerini bu duygulara uyacak şekilde değiştirin. Ardından şekillendirme fonksiyonlarını kullanarak geçişi canlandırın. Robert Penner, bilgisayar animasyonu için [easing fonksiyonları](http://easings.net/) olarak bilinen bir dizi popüler şekillendirme fonksiyonu geliştirdi, araştırma ve ilham olarak [bu örneği](../edit.php#06/easing.frag) kullanabilirsiniz ama en iyi sonuç kendi geçişlerinizi yapmaktan gelecektir.

### Gradyanlarla oynama

[`mix()`](../glossary/?search=mix) fonksiyonunun sunabileceği daha fazlası var. Tek bir `float` yerine, ilk iki argümanla eşleşen bir değişken tipi geçirebiliriz, bizim durumumuzda bir `vec3`. Bunu yaparak her bir renk kanalı olan `r`, `g` ve `b`'nin karışım yüzdeleri üzerinde kontrol kazanırız.

![](mix-vec.jpg)

Aşağıdaki örneğe bir göz atın. Önceki bölümdeki örnekler gibi, geçişi normalize edilmiş *x* koordinatına bağlıyoruz ve bir çizgiyle görselleştiriyoruz. Şu anda tüm kanallar aynı çizgi boyunca gidiyor.

Şimdi 25 numaralı satırın yorumunu kaldırın ve ne olduğunu izleyin. Ardından 26 ve 27. satırların yorumunu kaldırmayı deneyin. Satırların, kanal başına karıştırılacak `colorA` ve `colorB` miktarını görselleştirdiğini unutmayın.

<div class="codeAndCanvas" data="gradient.frag"></div>

Muhtemelen 25-27. satırlarda kullandığımız üç şekillendirme fonksiyonunu tanıyorsunuzdur. Onlarla oynayın! Önceki bölümdeki becerilerinizi keşfetme ve sergilemenin ve ilginç gradyanlar yapmanın zamanı. Aşağıdaki alıştırmaları deneyin:

![William Turner - The Fighting Temeraire (1838)](turner.jpg)

* William Turner gün batımına benzeyen bir gradyan oluşturun

* `u_time` kullanarak gündoğumu ve gün batımı arasında bir geçiş canlandırın.

* Şimdiye kadar öğrendiklerimizi kullanarak bir gökkuşağı yapabilir misiniz?

* Renkli bir bayrak oluşturmak için `step()` fonksiyonunu kullanın.

### HSB

Renk uzayı hakkında konuşmadan renkler hakkında konuşamayız. Muhtemelen bildiğiniz gibi, renkleri kırmızı, yeşil ve mavi kanalların yanı sıra düzenlemenin farklı yolları vardır.

[HSB](http://en.wikipedia.org/wiki/HSL_and_HSV), Ton (Hue), Doygunluk (Saturation) ve Parlaklık (Brightness veya Value) anlamına gelir ve renklerin daha sezgisel ve kullanışlı bir organizasyonudur. Aşağıdaki kodda `rgb2hsv()` ve `hsv2rgb()` fonksiyonlarını okumak için bir dakikanızı ayırın.

x eksenindeki konumu Ton'a ve y eksenindeki konumu Parlaklığa eşleyerek, görünür renklerin güzel bir spektrumunu elde ederiz. Bu uzaysal renk dağılımı çok kullanışlı olabilir; HSB ile renk seçmek RGB'den daha sezgiseldir.

<div class="codeAndCanvas" data="hsb.frag"></div>

### Kutupsal koordinatlarda HSB

HSB başlangıçta kartezyen koordinatlar (x ve y'ye dayalı) yerine kutupsal koordinatlarda (açı ve yarıçapa dayalı) temsil edilmek üzere tasarlanmıştır. HSB fonksiyonumuzu kutupsal koordinatlara eşlemek için, tuvalin merkezinden piksel koordinatına olan açıyı ve mesafeyi elde etmemiz gerekir. Bunun için [`length()`](../glossary/?search=length) fonksiyonunu ve [`atan(y,x)`](../glossary/?search=atan) fonksiyonunu (yaygın olarak kullanılan `atan2(y,x)`'in GLSL versiyonu olan) kullanacağız.

Vektör ve trigonometrik fonksiyonlar kullanırken, `vec2`, `vec3` ve `vec4` renkleri temsil etseler bile vektör olarak ele alınır. Renkleri ve vektörleri benzer şekilde ele almaya başlayacağız, aslında bu kavramsal esnekliğin çok güçlendirici olduğunu göreceksiniz.

**Not:** Merak ediyorsanız, [`length`](../glossary/?search=length)'in yanı sıra daha fazla geometrik fonksiyon vardır: [`distance()`](../glossary/?search=distance), [`dot()`](../glossary/?search=dot), [`cross`](../glossary/?search=cross), [`normalize()`](../glossary/?search=normalize), [`faceforward()`](../glossary/?search=faceforward), [`reflect()`](../glossary/?search=reflect) ve [`refract()`](../glossary/?search=refract). Ayrıca GLSL'de özel vektör karşılaştırma fonksiyonları vardır: [`lessThan()`](../glossary/?search=lessThan), [`lessThanEqual()`](../glossary/?search=lessThanEqual), [`greaterThan()`](../glossary/?search=greaterThan), [`greaterThanEqual()`](../glossary/?search=greaterThanEqual), [`equal()`](../glossary/?search=equal) ve [`notEqual()`](../glossary/?search=notEqual).

Açıyı ve uzunluğu elde ettikten sonra, değerlerini 0.0 ile 1.0 arasındaki aralığa "normalize" etmemiz gerekir. 27. satırda, [`atan(y,x)`](../glossary/?search=atan) radyan cinsinden -PI ile PI (-3.14 ile 3.14) arasında bir açı döndürecektir, bu yüzden -0.5 ile 0.5 arasında değerler elde etmek için bu sayıyı `TWO_PI` (kodun üstünde tanımlanmıştır) ile bölmemiz gerekir, basit bir toplama ile istenen 0.0 ile 1.0 aralığına değiştiririz. Yarıçap maksimum 0.5 döndürecektir (çünkü görüntü alanının merkezinden mesafeyi hesaplıyoruz) bu yüzden maksimum 1.0 elde etmek için bu aralığı ikiye katlamamız (ikiyle çarpmamız) gerekir.

Gördüğünüz gibi, buradaki oyunumuz tamamen aralıkları sevdiğimiz 0.0 ile 1.0 aralığına dönüştürmek ve eşlemektir.

<div class="codeAndCanvas" data="hsb-colorwheel.frag"></div>

Aşağıdaki alıştırmaları deneyin:

* Dönen bir renk çarkı elde etmek için kutupsal örneği değiştirin, tıpkı bekleme fare simgesi gibi.

* Belirli bir ton değerini genişletmek ve geri kalanını daraltmak için HSB'den RGB'ye dönüştürme fonksiyonuyla birlikte bir şekillendirme fonksiyonu kullanın.

![William Home Lizars - Red, blue and yellow spectra, with the solar spectrum (1834)](spectrums.jpg)

* Renk seçicilerde kullanılan renk çarkına yakından bakarsanız (aşağıdaki görüntüye bakın), RYB renk uzayına göre farklı bir spektrum kullanırlar. Örneğin, kırmızının karşıt rengi yeşil olmalıdır, ancak bizim örneğimizde camgöbeğidir. Bunu tam olarak aşağıdaki görüntü gibi görünecek şekilde düzeltmenin bir yolunu bulabilir misiniz? [İpucu: şekillendirme fonksiyonlarını kullanmak için harika bir an.]

![](colorwheel.png)

* [Josef Albers'in Interaction of Color kitabını](http://www.goodreads.com/book/show/111113.Interaction_of_Color) okuyun ve aşağıdaki shader örneklerini pratik olarak kullanın.

<div class="glslGallery" data="160505191155,160505193939,160505200330,160509131554,160509131509,160509131420,160509131240" data-properties="clickRun:editor,openFrameIcon:false,showAuthor:false"></div>

#### Fonksiyonlar ve argümanlar hakkında not

Bir sonraki bölüme geçmeden önce duralım ve geri saralım. Önceki örneklerdeki fonksiyonlara geri dönün ve bakın. Argüman tiplerinin önünde `in` göreceksiniz. Bu bir [*niteleyici*](http://www.shaderific.com/glsl-qualifiers/#inputqualifier) ve bu durumda değişkenin salt okunur olduğunu belirtir. Gelecekteki örneklerde argümanları `out` veya `inout` olarak tanımlamanın da mümkün olduğunu göreceğiz. Bu sonuncusu, `inout`, kavramsal olarak bir argümanı referansla geçirmeye benzer ve bize geçirilen bir değişkeni değiştirme imkanı verir.

```glsl
int newFunction(in vec4 aVec4,      // salt-okunur
                out vec3 aVec3,     // salt-yazılır
                inout int aInt);    // okunur-yazılır
```

İnanmayabilirsiniz ama artık harika çizimler yapmak için tüm elemanlara sahibiz. Bir sonraki bölümde, uzayı *harmanlayarak* geometrik formlar yapmak için tüm numaralarımızı nasıl birleştireceğimizi öğreneceğiz. Evet... uzayı *harmanlayarak*.


#### Araç kutunuz için

* [LYGIA'nın renk shader fonksiyonları](https://lygia.xyz/color), GLSL'de renkleri manipüle etmek için yeniden kullanılabilir fonksiyonlar kümesidir. Renk uzayları arasında dönüştürme, renkleri harmanlama, gradyanlar oluşturma ve renk dönüşümleri uygulama fonksiyonları içerir. Yeniden kullanılabilirlik, performans ve esneklik için tasarlanmış çok ayrıntılı bir kütüphanedir. Ve herhangi bir projeye ve framework'e kolayca eklenebilir.
