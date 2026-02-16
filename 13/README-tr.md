![Due East over Shadequarter Mountain - Matthew Rangel (2005) ](rangel.jpg)

## Fraktal Brown Hareketi

Gürültü, farklı insanlar için farklı şeyler ifade eder. Müzisyenler onu rahatsız edici sesler açısından düşünür, iletişimciler parazit olarak ve astrofizikçiler kozmik mikrodalga arka plan radyasyonu olarak. Bu kavramlar bizi çevremizdeki dünyadaki rastgeleliğin arkasındaki fiziksel nedenlere geri götürür. Ancak daha temel ve daha basit bir şeyle başlayalım: dalgalar ve özellikleri. Dalga, bazı özelliklerin zaman içindeki dalgalanmasıdır. Ses dalgaları hava basıncındaki dalgalanmalardır, elektromanyetik dalgalar elektrik ve manyetik alanlardaki dalgalanmalardır. Bir dalganın iki önemli özelliği genliği ve frekansıdır. Basit bir doğrusal (tek boyutlu) dalganın denklemi şöyle görünür:

<div class="simpleFunction" data="
float amplitude = 1.;
float frequency = 1.;
y = amplitude * sin(x * frequency);
"></div>

* Nasıl davrandıklarını anlamak için frekans ve genlik değerlerini değiştirmeyi deneyin.
* Şekillendirme fonksiyonlarını kullanarak genliği zamanla değiştirmeyi deneyin.
* Şekillendirme fonksiyonlarını kullanarak frekansı zamanla değiştirmeyi deneyin.

Son iki alıştırmayı yaparak bir sinüs dalgasını "modüle etmeyi" başardınız ve az önce AM (genlik modülasyonlu) ve FM (frekans modülasyonlu) dalgalar yarattınız. Tebrikler!

Dalgaların bir diğer ilginç özelliği, resmi olarak süperpozisyon olarak adlandırılan, toplanabilme yetenekleridir. Aşağıdaki satırları yorum yapın/yorumdan çıkarın ve ayarlayın. Farklı genliklere ve frekanslara sahip dalgaları bir araya getirdikçe genel görünümün nasıl değiştiğine dikkat edin.

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

* Ek dalgalar için frekans ve genliği değiştirerek denemeler yapın.
* İki dalganın birbirini iptal etmesi mümkün mü? Bu nasıl görünür?
* Dalgaları birbirini güçlendirecek şekilde eklemek mümkün mü?

Müzikte her nota belirli bir frekansla ilişkilendirilir. Bu notaların frekansları, gam adını verdiğimiz bir deseni izler; burada frekansın iki katına çıkması veya yarıya inmesi bir oktav atlamaya karşılık gelir.

Şimdi sinüs dalgası yerine Perlin gürültüsünü kullanalım! Perlin gürültüsü temel formunda sinüs dalgasıyla aynı genel görünüm ve histe sahiptir. Genliği ve frekansı bir ölçüde değişir, ancak genlik makul ölçüde tutarlı kalır ve frekans bir merkez frekans etrafında oldukça dar bir aralıkla sınırlıdır. Bir sinüs dalgası kadar düzenli değildir ve gürültünün birkaç ölçeklenmiş versiyonunu toplayarak rastgelelik görünümü oluşturmak daha kolaydır. Sinüs dalgalarının toplamını da rastgele göstermek mümkündür, ancak periyodik, düzenli doğalarını gizlemek için birçok farklı dalga gerekir.

Frekansları düzenli adımlarla (*lacunarity*) art arda artırdığımız ve **gürültünün** genliğini (*gain*) azalttığımız, gürültünün farklı yinelemelerini (*oktavlar*) ekleyerek daha ince bir ayrıntı düzeyi elde edebilir ve daha ince detaylar alabiliriz. Bu teknik "fraktal Brown hareketi" (*fBM*) veya basitçe "fraktal gürültüsü" olarak adlandırılır ve en basit formunda aşağıdaki kodla oluşturulabilir:

<div class="simpleFunction" data="// Özellikler
const int octaves = 1;
float lacunarity = 2.0;
float gain = 0.5;
//
// Başlangıç değerleri
float amplitude = 0.5;
float frequency = 1.;
//
// Oktav döngüsü
for (int i = 0; i < octaves; i++) {
&#9;y += amplitude * noise(frequency*x);
&#9;frequency *= lacunarity;
&#9;amplitude *= gain;
}"></div>

* Yinelenecek oktav sayısını 1'den 2, 4, 8 ve 10'a kademeli olarak değiştirin. Ne olduğunu görün.
* 4'ten fazla oktavınız olduğunda, lacunarity değerini değiştirmeyi deneyin.
* Yine 4'ten fazla oktavla, gain değerini değiştirin ve ne olduğunu görün.

Her ek oktavla eğrinin nasıl daha fazla detay kazandığına dikkat edin. Ayrıca daha fazla oktav eklendikçe öz-benzerliğe de dikkat edin. Eğriye yakınlaştırırsanız, daha küçük bir kısım bütünle aşağı yukarı aynı görünür ve her bölüm diğer herhangi bir bölümle aşağı yukarı aynı görünür. Bu, matematiksel fraktalların önemli bir özelliğidir ve biz döngümüzde bu özelliği simüle ediyoruz.

Aşağıdaki kod, fraktal görünümlü bir desen oluşturmak için fBm'nin iki boyutta nasıl uygulanabileceğinin bir örneğidir:

<div class='codeAndCanvas' data='2d-fbm.frag'></div>

* 37. satırdaki değeri değiştirerek oktav sayısını azaltın
* 47. satırda fBm'nin lacunarity'sini değiştirin
* 48. satırda gain'i değiştirerek keşfedin

Bu teknik genellikle prosedürel manzaralar oluşturmak için kullanılır. fBm'nin öz-benzerliği dağlar için mükemmeldir, çünkü dağları oluşturan erozyon süreçleri geniş bir ölçek aralığında bu tür bir öz-benzerlik veren bir şekilde çalışır. Bu kullanımla ilgileniyorsanız, [Inigo Quiles'in gelişmiş gürültü hakkındaki bu harika makalesini](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm) kesinlikle okumalısınız.

![Blackout - Dan Holdsworth (2010)](holdsworth.jpg)

Aşağı yukarı aynı tekniği kullanarak **türbülans** olarak bilinen başka efektler elde etmek de mümkündür. Özünde bir fBm'dir, ancak fonksiyonda keskin vadiler oluşturmak üzere işaretli gürültünün mutlak değerinden oluşturulmuştur.

```glsl
for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * abs(snoise(st));
    st *= 2.;
    amplitude *= .5;
}
```

<a href="../edit.php#13/turbulence.frag"><img src="turbulence-long.png"  width="520px" height="200px"></img></a>

Bu algoritma ailesinin bir diğer üyesi, keskin vadilerin bunun yerine keskin sırtlar oluşturmak üzere ters çevrildiği **sırt**tır (ridge):

```glsl
    n = abs(n);     // kıvrımlar oluştur
    n = offset - n; // kıvrımları üstte olacak şekilde ters çevir
    n = n * n;      // kıvrımları keskinleştir
```

<a href="../edit.php#13/ridge.frag"><img src="ridge-long.png"  width="520px" height="200px"></img></a>

Yararlı varyasyonlar oluşturabilecek bir diğer değişken, gürültü bileşenlerini toplamak yerine çarpmaktır. Sonraki gürültü fonksiyonlarını döngüdeki önceki terimlere bağlı bir şeyle ölçeklemek de ilginçtir. Böyle şeyler yaptığımızda, fraktalın katı tanımından uzaklaşıp nispeten bilinmeyen "multifraktal" alanına geçiyoruz.

### Alan Bükme (Domain Warping)

[Inigo Quiles bu diğer büyüleyici makaleyi yazdı](http://www.iquilezles.org/www/articles/warp/warp.htm), bir fBm'nin uzayını bir fBm ile bükmenin nasıl mümkün olduğu hakkında. Akıl patlatıcı, değil mi? Inception'daki rüyanın içindeki rüya gibi.

![ f(p) = fbm( p + fbm( p + fbm( p ) ) ) - Inigo Quiles (2002)](quiles.jpg)

Bu tekniğin daha az aşırı bir örneği, bulutlara benzer doku üretmek için kaydırmanın (wrap) kullanıldığı aşağıdaki koddur. Sonuçta öz-benzerlik özelliğinin hâlâ mevcut olduğuna dikkat edin.

<div class='codeAndCanvas' data='clouds.frag'></div>

Doku koordinatlarını bu şekilde gürültüyle kaydırmak çok faydalı, çok eğlenceli ve ustalaşması çok zor olabilir. Güçlü bir araçtır, ancak iyi kullanmak için oldukça fazla deneyim gerektirir. Bunun için faydalı bir araç, koordinatları gürültünün türevi (gradyanı) ile kaydırmaktır. [Ken Perlin ve Fabrice Neyret tarafından yazılan "flow noise" başlıklı ünlü makale](http://evasion.imag.fr/Publications/2001/PN01/) bu fikre dayanır.

#### Araç kutunuz için

* [LYGIA'nın üretken fonksiyonları](https://lygia.xyz/generative), GLSL'de desenler üretmek için yeniden kullanılabilir fonksiyonlar kümesidir. Üretken sanat yaratmak için rastgelelik ve gürültüyü nasıl kullanacağınızı öğrenmek için harika bir kaynaktır. Yeniden kullanılabilirlik, performans ve esneklik için tasarlanmış çok ayrıntılı bir kütüphanedir. Ve herhangi bir projeye ve framework'e kolayca eklenebilir.
