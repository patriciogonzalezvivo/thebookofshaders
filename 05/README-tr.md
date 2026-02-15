# Algoritmik çizim
## Şekillendirme fonksiyonları

Bu bölüm "Bay Miyagi'nin çit boyama dersi" olarak adlandırılabilirdi. Daha önce, *x* ve *y*'nin normalize edilmiş konumunu *kırmızı* ve *yeşil* kanallara eşledik. Esasen iki boyutlu bir vektörü (x ve y) alıp dört boyutlu bir vektör (r, g, b ve a) döndüren bir fonksiyon yaptık. Ancak boyutlar arasında veri dönüştürmeye daha ileri gitmeden önce, daha basit başlamamız gerekiyor... çok daha basit. Bu, tek boyutlu fonksiyonlar yapmayı anlamak demektir. Bunu öğrenmeye ve ustalaşmaya ne kadar çok enerji ve zaman harcarsanız, shader karateniz o kadar güçlü olacaktır.

![The Karate Kid (1984)](mr_miyagi.jpg)

Aşağıdaki kod yapısı bizim çitimiz olacak. İçinde, *x* koordinatının (`st.x`) normalize edilmiş değerini iki şekilde görselleştiriyoruz: biri parlaklıkla (siyahtan beyaza güzel gradyanı gözlemleyin) ve diğeri üzerine yeşil bir çizgi çizerek (bu durumda *x* değeri doğrudan *y*'ye atanır). Plot fonksiyonuna fazla odaklanmayın, birazdan daha ayrıntılı inceleyeceğiz.

<div class="codeAndCanvas" data="linear.frag"></div>

**Hızlı Not**: `vec3` tip yapıcısı, üç renk kanalına aynı değeri atamak istediğinizi "anlar"; `vec4` ise üç boyutlu bir vektörle artı dördüncü bir değerle (bu durumda alfa veya opaklığı kontrol eden değer) dört boyutlu bir vektör oluşturmak istediğinizi anlar. Örneğin yukarıdaki 19. ve 25. satırlara bakın.

Bu kod sizin çitinizdir; onu gözlemlemek ve anlamak önemlidir. *0.0* ile *1.0* arasındaki bu alana tekrar tekrar geri döneceksiniz. Bu çizgiyi harmanlama ve şekillendirme sanatında ustalaşacaksınız.

*x* ile *y* (veya parlaklık) arasındaki bu bire bir ilişki *doğrusal enterpolasyon* olarak bilinir. Buradan, çizgiyi *şekillendirmek* için bazı matematiksel fonksiyonları kullanabiliriz. Örneğin, *eğri* bir çizgi yapmak için *x*'i 5'in kuvvetine yükseltebiliriz.

<div class="codeAndCanvas" data="expo.frag"></div>

İlginç, değil mi? 22. satırda farklı üsler deneyin: örneğin 20.0, 2.0, 1.0, 0.0, 0.2 ve 0.02. Değer ile üs arasındaki bu ilişkiyi anlamak çok faydalı olacaktır. Bu tür matematiksel fonksiyonları şurada burada kullanmak, kodunuz üzerinde ifade gücü kontrolü sağlayacaktır — değerlerin akışını kontrol etmenizi sağlayan bir tür veri akupunkturu.

[`pow()`](../glossary/?search=pow) GLSL'de yerleşik bir fonksiyondur ve başka birçoğu daha vardır. Çoğu donanım düzeyinde hızlandırılmıştır, bu da doğru şekilde ve ölçülü kullanıldıklarında kodunuzu daha hızlı hale getirecekleri anlamına gelir.

22. satırdaki üs fonksiyonunu değiştirin. Başkalarını deneyin: [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log) ve [`sqrt()`](../glossary/?search=sqrt). Bu fonksiyonlardan bazıları PI ile oynadığınızda daha ilginçtir. 8. satırda, `PI`'nin herhangi bir kullanımını `3.14159265359` değeriyle değiştirecek bir makro tanımladığımı görebilirsiniz.

### Step ve Smoothstep

GLSL'de donanım hızlandırmalı bazı benzersiz yerleşik enterpolasyon fonksiyonları da vardır.

[`step()`](../glossary/?search=step) enterpolasyonu iki parametre alır. Birincisi sınır veya eşik değeridir, ikincisi ise kontrol etmek veya geçirmek istediğimiz değerdir. Sınırın altındaki herhangi bir değer `0.0` döndürürken, sınırın üstündeki her şey `1.0` döndürür.

Aşağıdaki kodun 20. satırındaki bu eşik değerini değiştirmeyi deneyin.

<div class="codeAndCanvas" data="step.frag"></div>

Diğer benzersiz fonksiyon [`smoothstep()`](../glossary/?search=smoothstep) olarak bilinir. İki sayı aralığı ve bir değer verildiğinde, bu fonksiyon değeri tanımlanmış aralık arasında enterpolasyon yapar. İlk iki parametre geçişin başlangıcı ve sonu içindir, üçüncüsü ise enterpolasyon yapılacak değer içindir.

<div class="codeAndCanvas" data="smoothstep.frag"></div>

Önceki örnekte, 12. satırda, `plot()` fonksiyonunda yeşil çizgiyi çizmek için smoothstep kullandığımıza dikkat edin. *x* ekseni boyunca her konum için bu fonksiyon belirli bir *y* değerinde bir *tümsek* oluşturur. Nasıl mı? İki [`smoothstep()`](../glossary/?search=smoothstep)'i birbirine bağlayarak. Aşağıdaki fonksiyona bir bakın, yukarıdaki 20. satırın yerine koyun ve bunu dikey bir kesim olarak düşünün. Arka plan bir çizgiye benziyor, değil mi?

```glsl
float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
```

### Sinüs ve Kosinüs

Değerleri canlandırmak, şekillendirmek veya harmanlamak için biraz matematik kullanmak istediğinizde, sinüs ve kosinüsle arkadaş olmaktan daha iyi bir şey yoktur.

Bu iki temel trigonometrik fonksiyon, MacGyver'ın İsviçre çakısı kadar kullanışlı daireler oluşturmak için birlikte çalışır. Nasıl davrandıklarını ve hangi şekillerde birleştirilebileceklerini bilmek önemlidir. Özetle, bir açı (radyan cinsinden) verildiğinde, yarıçapı 1'e eşit olan bir dairenin kenarındaki bir noktanın *x* ([kosinüs](../glossary/?search=cos)) ve *y* ([sinüs](../glossary/?search=sin)) doğru konumunu döndürürler. Ancak normalize edilmiş değerleri (-1 ile 1 arasında değerler) bu kadar düzgün bir şekilde döndürmeleri, onları inanılmaz bir araç haline getirir.

![](sincos.gif)

Trigonometrik fonksiyonlar ve daireler arasındaki tüm ilişkileri tanımlamak zor olsa da, yukarıdaki animasyon bu ilişkileri görsel olarak özetleme konusunda harika bir iş çıkarıyor.

<div class="simpleFunction" data="y = sin(x);"></div>

Bu sinüs dalgasına dikkatle bakın. *y* değerlerinin +1 ile -1 arasında nasıl düzgün bir şekilde aktığını not edin. Önceki bölümdeki zaman örneğinde gördüğümüz gibi, [`sin()`](../glossary/?search=sin)'in bu ritmik davranışını özellikleri canlandırmak için kullanabilirsiniz. Bu örneği bir tarayıcıda okuyorsanız, dalganın nasıl değiştiğini izlemek için yukarıdaki formüldeki kodu değiştirebileceğinizi göreceksiniz. (Not: satırların sonundaki noktalı virgülü unutmayın.)

Aşağıdaki alıştırmaları deneyin ve ne olduğunu gözlemleyin:

* `sin`'i hesaplamadan önce *x*'e zaman (`u_time`) ekleyin. *x* boyunca bu **hareketi** içselleştirin.

* `sin`'i hesaplamadan önce *x*'i `PI` ile çarpın. İki fazın nasıl **küçüldüğünü** ve her döngünün her 2 tam sayıda bir tekrarladığını not edin.

* `sin`'i hesaplamadan önce zamanı (`u_time`) *x* ile çarpın. Fazlar arasındaki **frekansın** nasıl giderek daha sıkıştığını görün. u_time'ın zaten çok büyük olabileceğini ve grafiğin okunmasını zorlaştırabileceğini unutmayın.

* [`sin(x)`](../glossary/?search=sin)'e 1.0 ekleyin. Tüm dalganın nasıl yukarı **kaydığını** ve şimdi tüm değerlerin 0.0 ile 2.0 arasında olduğunu görün.

* [`sin(x)`](../glossary/?search=sin)'i 2.0 ile çarpın. **Genliğin** nasıl iki katına çıktığını görün.

* `sin(x)`'in mutlak değerini ([`abs()`](../glossary/?search=abs)) hesaplayın. **Zıplayan** bir topun izine benziyor.

* [`sin(x)`](../glossary/?search=sin) sonucunun sadece kesir kısmını ([`fract()`](../glossary/?search=fract)) çıkarın.

* [`sin(x)`](../glossary/?search=sin) sonucunun üst tam sayısını ([`ceil()`](../glossary/?search=ceil)) ve alt tam sayısını ([`floor()`](../glossary/?search=floor)) ekleyerek 1 ve -1 değerlerinden oluşan dijital bir dalga elde edin.

### Bazı ekstra faydalı fonksiyonlar

Son alıştırmanın sonunda bazı yeni fonksiyonlar tanıttık. Şimdi aşağıdaki satırları teker teker açarak her biriyle deney yapma zamanı. Bu fonksiyonları tanıyın ve nasıl davrandıklarını inceleyin. Biliyorum, merak ediyorsunuz... neden? "Generative art" (üretken sanat) için hızlı bir Google araması size söyleyecektir. Bu fonksiyonların bizim çitimiz olduğunu unutmayın. Tek boyutta harekete, yukarı ve aşağıya hakim oluyoruz. Yakında, iki, üç ve dört boyut zamanı gelecek!

![Anthony Mattox (2009)](anthony-mattox-ribbon.jpg)

<div class="simpleFunction" data="y = mod(x,0.5); // x'in 0.5'e göre modunu döndür
//y = fract(x); // sadece sayının kesir kısmını döndür
//y = ceil(x);  // x'e eşit veya büyük en yakın tam sayı
//y = floor(x); // x'e eşit veya küçük en yakın tam sayı
//y = sign(x);  // x'in işaretini çıkar
//y = abs(x);   // x'in mutlak değerini döndür
//y = clamp(x,0.0,1.0); // x'i 0.0 ile 1.0 arasında sınırla
//y = min(0.0,x);   // x ve 0.0'ın küçüğünü döndür
//y = max(0.0,x);   // x ve 0.0'ın büyüğünü döndür "></div>

### Gelişmiş şekillendirme fonksiyonları

[Golan Levin](http://www.flong.com/)'in olağanüstü derecede faydalı olan daha karmaşık şekillendirme fonksiyonları hakkında harika belgeleri var. Bunları GLSL'ye taşımak, kendi kod parçacığı kaynağınızı oluşturmaya başlamak için gerçekten akıllıca bir hamle.

* Polinom Şekillendirme Fonksiyonları: [www.flong.com/archive/texts/code/shapers_poly](http://www.flong.com/archive/texts/code/shapers_poly/)

* Üstel Şekillendirme Fonksiyonları: [www.flong.com/archive/texts/code/shapers_exp](http://www.flong.com/archive/texts/code/shapers_exp/)

* Dairesel & Eliptik Şekillendirme Fonksiyonları: [www.flong.com/archive/texts/code/shapers_circ](http://www.flong.com/archive/texts/code/shapers_circ/)

* Bezier ve Diğer Parametrik Şekillendirme Fonksiyonları: [www.flong.com/archive/texts/code/shapers_bez](http://www.flong.com/archive/texts/code/shapers_bez/)

<div class="glslGallery" data="160414041542,160414041933,160414041756" data-properties="clickRun:editor,hoverPreview:false"></div>

Baharat ve egzotik malzeme toplayan aşçılar gibi, dijital sanatçılar ve yaratıcı kodlayıcılar da kendi şekillendirme fonksiyonları üzerinde çalışmaya özel bir sevgi beslerler.

[Iñigo Quiles](http://www.iquilezles.org/)'in harika bir [kullanışlı fonksiyonlar](http://www.iquilezles.org/www/articles/functions/functions.htm) koleksiyonu var. [Bu makaleyi](http://www.iquilezles.org/www/articles/functions/functions.htm) okuduktan sonra, bu fonksiyonların GLSL'ye aşağıdaki çevirisine bir göz atın. Gereken küçük değişikliklere dikkat edin, kayan noktalı sayılara "." (nokta) koymak ve *C fonksiyonları* için GLSL adını kullanmak gibi; örneğin `powf()` yerine `pow()` kullanın:

<div class="glslGallery" data="05/impulse,05/cubicpulse,05/expo,05/expstep,05/parabola,05/pcurve" data-properties="clickRun:editor,hoverPreview:false"></div>

Motivasyonunuzu yüksek tutmak için, şekillendirme fonksiyonları karatesinde ustalaşmanın zarif bir örneği ([Danguafer](https://www.shadertoy.com/user/Danguafer) tarafından yapılmış):

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/XsXXDn?gui=true&t=10&paused=true" allowfullscreen></iframe>

*Sonraki >>* bölümde yeni hareketlerimizi kullanmaya başlayacağız. Önce renkleri karıştırarak, sonra şekiller çizerek.

#### Alıştırma

[Kynd](http://www.kynd.info/log/) tarafından yapılan aşağıdaki denklem tablosuna bir göz atın. Fonksiyonları ve özelliklerini birleştirerek 0.0 ile 1.0 arasındaki değerleri nasıl kontrol ettiğini görün. Şimdi bu fonksiyonları kopyalayarak pratik yapma zamanı. Unutmayın, ne kadar çok pratik yaparsanız karateniz o kadar iyi olacak.

![Kynd - www.flickr.com/photos/kynd/9546075099/ (2013)](kynd.png)

#### Araç kutunuz için

* [LYGIA](https://lygia.xyz/), projelerinize kolayca dahil edilebilen yeniden kullanılabilir fonksiyonlardan oluşan bir shader kütüphanesidir. Çok ayrıntılıdır, yeniden kullanılabilirlik, performans ve esneklik için tasarlanmıştır. Ve herhangi bir projeye ve framework'e kolayca eklenebilir. Farklı bölümlere ayrılmıştır ve [matematik işlemleri](https://lygia.xyz/math) için tam bir bölümü vardır.


* [GraphToy](http://www.iquilezles.org/apps/graphtoy/): yine [Iñigo Quilez](http://www.iquilezles.org) WebGL'de GLSL fonksiyonlarını görselleştirmek için bir araç yaptı.

![Iñigo Quilez - GraphToy (2010)](graphtoy.png)
