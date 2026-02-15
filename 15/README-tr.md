# Görüntü işleme

## Dokular

![](01.jpg)

Grafik kartları (GPU'lar), görüntüler için özel bellek türlerine sahiptir. Genellikle CPU'larda görüntüler bayt dizileri olarak depolanır, ancak GPU'lar görüntüleri kayan nokta vektörlerinin tablosu (veya matrisi) gibi olan ```sampler2D``` olarak depolar. Daha ilginç olarak, bu vektörler *tablosunun* değerleri süreklidir. Bu, pikseller arasındaki değerlerin düşük seviyede enterpolasyon yapıldığı anlamına gelir.

Bu özelliği kullanmak için önce görüntüyü CPU'dan GPU'ya *yüklememiz*, ardından dokunun ```id```'sini doğru [```uniform```](../05)'a geçirmemiz gerekir. Tüm bunlar shader'ın dışında gerçekleşir.

Doku yüklenip geçerli bir ```uniform sampler2D```'ye bağlandıktan sonra, [```texture2D()```](index.html#texture2D.md) fonksiyonunu kullanarak belirli koordinatlarda ([```vec2```](index.html#vec2.md) değişkeni olarak formatlanmış) belirli renk değerini isteyebilirsiniz, bu da [```vec4```](index.html#vec4.md) değişkeni olarak formatlanmış bir renk döndürecektir.

```glsl
vec4 texture2D(sampler2D texture, vec2 coordinates)
```

Hokusai'nin Dalgası'nı (1830) ```uniform sampler2D u_tex0``` olarak yüklediğimiz ve tuvalin içindeki her pikselini çağırdığımız aşağıdaki kodu kontrol edin:

<div class="codeAndCanvas" data="texture.frag" data-textures="hokusai.jpg"></div>

Dikkat ederseniz, doku koordinatlarının normalize edildiğini fark edeceksiniz! Ne sürpriz, değil mi? Doku koordinatları gördüğümüz diğer şeylerle tutarlıdır ve koordinatları, kullandığımız normalize edilmiş uzay koordinatlarıyla mükemmel şekilde eşleşen 0.0 ile 1.0 arasındadır.

Artık bir dokuyu doğru şekilde nasıl yükleyeceğimizi gördüğünüze göre, onunla ne yapabileceğimizi keşfetmek için deney yapma zamanı:

* Önceki dokuyu yarıya ölçekleyin.
* Önceki dokuyu 90 derece döndürün.
* Fare konumunu koordinatlara bağlayarak hareket ettirin.

Dokular hakkında neden heyecanlanmalısınız? Her şeyden önce kanal başına üzücü 255 değeri unutun; görüntünüz ```uniform sampler2D```'ye dönüştürüldüğünde 0.0 ile 1.0 arasındaki tüm değerlere sahip olursunuz (```precision```'a ne ayarladığınıza bağlı olarak). Bu yüzden shader'lar gerçekten güzel son işleme efektleri yapabilir.

İkincisi, [```vec2()```](index.html#vec2.md), pikseller arasında bile değerler elde edebileceğiniz anlamına gelir. Daha önce söylediğimiz gibi dokular bir sürekliliktir. Bu, dokunuzu doğru ayarlarsanız, görüntünüzün yüzeyi boyunca değerler isteyebileceğiniz ve değerlerin pikselden piksele atlamalar olmadan yumuşak bir şekilde değişeceği anlamına gelir!

Son olarak, görüntünüzü kenarlarda tekrarlanacak şekilde ayarlayabilirsiniz, bu nedenle normalize edilmiş 0.0 ve 1.0'ın üstünde veya altında değerler verirseniz, değerler baştan sarılacaktır.

Tüm bu özellikler görüntülerinizi daha çok sonsuz bir kumaş gibi yapar. Dokunuzu, orijinal olarak oluşturuldukları bayt ızgarasını veya sonlarını fark etmeden esnetebilir ve küçültebilirsiniz. Bunu deneyimlemek için [zaten yaptığımız gürültü fonksiyonunu](../11/) kullanarak bir dokuyu bozdurduğumuz aşağıdaki koda bakın.

<div class="codeAndCanvas" data="texture-noise.frag" data-textures="hokusai.jpg"></div>

## Doku çözünürlüğü

Yukarıdaki örnekler her iki tarafın eşit olduğu ve kare tuvalimizle eşleştiği kare görüntülerle iyi çalışır. Ancak kare olmayan görüntüler için işler biraz daha karmaşık olabilir ve ne yazık ki yüzyıllarca süren resim sanatı ve fotoğrafçılık, göze kare olmayan oranların daha hoş geldiğini keşfetmiştir.

![Joseph Nicéphore Niépce (1826)](nicephore.jpg)

Bu sorunu nasıl çözebiliriz? Dokuyu orijinal [*en-boy oranına*](http://en.wikipedia.org/wiki/Aspect_ratio) sahip olacak şekilde doğru germek için görüntünün orijinal oranlarını bilmemiz gerekir. Bunun için dokunun genişliği ve yüksekliği shader'a ```uniform``` olarak geçirilir, örnek framework'ümüzde dokunun adıyla aynı adlı ```uniform vec2```'ler ```Resolution``` son ekiyle geçirilir. Bu bilgiyi shader'da elde ettikten sonra, doku çözünürlüğünün ```genişliğini``` ```yüksekliğine``` bölerek en-boy oranını elde edebiliriz. Son olarak, bu oranı ```y```'deki koordinatlarla çarparak bu ekseni orijinal oranlara uyacak şekilde küçülteceğiz.

Bunu uygulamada görmek için aşağıdaki kodun 21. satırının yorumunu kaldırın.

<div class="codeAndCanvas" data="texture-resolution.frag" data-textures="nicephore.jpg"></div>

* Bu görüntüyü ortalamak için ne yapmamız gerekir?

## Dijital döşeme

![](03.jpg)

Bunun gereksiz yere karmaşık olduğunu düşünüyor olabilirsiniz... ve muhtemelen haklısınız. Ayrıca görüntülerle çalışmanın bu yolu, farklı hileler ve yaratıcı numaralar için yeterli alan bırakır. Bir döşemeci olduğunuzu ve bir yapı üzerinde kumaşı gererek ve katlayarak daha iyi ve yeni desenler ve teknikler yaratabileceğinizi hayal edin.

![Eadweard'ın Muybridge hareket çalışması](muybridge.jpg)

Bu zanaatkarlık seviyesi, şimdiye kadar yapılmış ilk optik deneylerin bazılarına bağlıdır. Örneğin oyunlarda *sprite animasyonları* çok yaygındır ve [fenakistoskop](https://en.wikipedia.org/wiki/Phenakistiscope), [zeotrop](https://en.wikipedia.org/wiki/Zoetrope) ve [praksiskop](https://en.wikipedia.org/wiki/Praxinoscope) anımsatmalarını görmek kaçınılmazdır.

Bu basit görünebilir ama doku koordinatlarını değiştirme olanakları muazzamdır. Örneğin:

<div class="codeAndCanvas" data="texture-sprite.frag" data-textures="muybridge.jpg"></div>

Şimdi sıra sizde:

* Öğrendiklerimizle bir kaleydoskop yapabilir misiniz?

<canvas id="custom" class="canvas" data-fragment-url="texture-kaleidoscope.frag" data-textures="hokusai.jpg" width="300px" height="300px"></canvas>

* [Oculus](https://en.wikipedia.org/wiki/Oculus_Rift) veya [Google Cardboard](https://en.wikipedia.org/wiki/Google_Cardboard)'dan çok önce, stereoskopik fotoğrafçılık büyük bir şeydi. Bu güzel görüntüleri yeniden kullanmak için basit bir shader kodlayabilir misiniz?

![](texture-stereo-00.jpg)
![](texture-stereo-01.jpg)
![](texture-stereo-03.jpg)

* Dokular kullanarak başka hangi optik oyuncakları yeniden yaratabilirsiniz?

Sonraki bölümlerde shader'lar kullanarak bazı görüntü işleme yapmayı öğreneceğiz. Shader'ın karmaşıklığının nihayet mantıklı olduğunu göreceksiniz, çünkü geniş anlamda bu tür işlemleri yapmak için tasarlanmıştır. Bazı görüntü operasyonları yapmaya başlayacağız!
