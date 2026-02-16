## Merhaba Dünya

Genellikle "Merhaba dünya!" örneği yeni bir dili öğrenmenin ilk adımıdır. Hevesli bir karşılama mesajı veren ve önünüzdeki fırsatları ilan eden basit, tek satırlık bir programdır.

GPU diyarında metin render etmek (ekrana çizdirmek) ilk adım için aşırı karmaşık bir görevdir, bunun yerine hevesimizi haykırmak için parlak bir karşılama rengi seçeceğiz!

<div class="codeAndCanvas" data="hello_world.frag"></div>

Bu kitabı bir tarayıcıda okuyorsanız, önceki kod bloğu interaktiftir. Yani keşfetmek istediğiniz kodun herhangi bir yerine tıklayıp değiştirebilirsiniz. Değişiklikler, shader'ları *anında* derleyen ve değiştiren GPU mimarisi sayesinde hemen güncellenecektir. 8. satırdaki değerleri değiştirerek deneyin.

Bu basit kod satıraları çok gibi görünmese de, onlardan önemli bilgiler çıkarabiliriz:

1. Shader Dili, sonunda bir renk döndüren tek bir `main` fonksiyonuna sahiptir. Bu C'ye benzer.

2. Son piksel rengi, ayrılmış global değişken `gl_FragColor`'a atanır.

3. Bu C-tadındaki dil, yerleşik *değişkenlere* (`gl_FragColor` gibi), *fonksiyonlara* ve *türlere* sahiptir. Bu durumda, kayan nokta hassasiyetli dört boyutlu bir vektör anlamına gelen `vec4` ile tanıştık. Daha sonra `vec3` ve `vec2` gibi türleri ve popüler olanları göreceğiz: `float`, `int` ve `bool`.

4. `vec4` türüne yakından bakarsak, dört argümanın KIRMIZI (RED), YEŞİL (GREEN), MAVİ (BLUE) ve ALFA (ALPHA) kanallarına yanıt verdiğini çıkarabiliriz. Ayrıca bu değerlerin *normalize* edildiğini, yani `0.0` ile `1.0` arasında gittiklerini görebiliriz. Daha sonra, değerleri normalize etmenin değişkenler arasında değerleri *eşlemeyi* (map) nasıl kolaylaştırdığını öğreneceğiz.

5. Bu örnekte görebileceğimiz bir diğer önemli *C özelliği* de önişlemci makrolarının varlığıdır. Makrolar, derleme öncesi bir adımın parçasıdır. Onlarla global değişkenleri `#define` etmek ve bazı temel koşullu işlemleri (`#ifdef` ve `#endif` ile) yapmak mümkündür. Tüm makro komutları bir hashtag (`#`) ile başlar. Derleme öncesi işlem, derlemeden hemen önce gerçekleşir ve tüm `#defines` çağrılarını kopyalar ve `#ifdef` (tanımlıysa) ve `#ifndef` (tanımlı değilse) koşullarını kontrol eder. Yukarıdaki "merhaba dünya!" örneğimizde, 2. satırı yalnızca `GL_ES` tanımlıysa ekliyoruz; bu da çoğunlukla kod mobil cihazlarda ve tarayıcılarda derlendiğinde olur.

6. Float türleri shader'larda hayati önem taşır, bu nedenle *hassasiyet* (precision) seviyesi çok önemlidir. Düşük hassasiyet daha hızlı render anlamına gelir, ancak kalite pahasına. Seçici olabilir ve kayan nokta kullanan her değişkenin hassasiyetini belirleyebilirsiniz. İkinci satırda (`precision mediump float;`) tüm float'ları orta hassasiyete ayarlıyoruz. Ancak bunları düşük (`precision lowp float;`) veya yüksek (`precision highp float;`) olarak ayarlamayı da seçebiliriz.

7. Son ve belki de en önemli ayrıntı, GLSL spesifikasyonlarının değişkenlerin otomatik olarak dönüştürüleceğini (cast) garanti etmemesidir. Bu ne anlama geliyor? Üreticilerin grafik kartı işlemlerini hızlandırmak için farklı yaklaşımları vardır ancak minimum spesifikasyonları garanti etmek zorundadırlar. Otomatik dönüştürme bunlardan biri değildir. "Merhaba dünya!" örneğimizde `vec4` kayan nokta hassasiyetine sahiptir ve bu nedenle kendisine `float` atanmasını bekler. İyi ve tutarlı bir kod yazmak ve beyaz ekranlarda hata ayıklamak için saatler harcamak istemiyorsanız, float'larınıza nokta (`.`) koymaya alışın. Bu tür bir kod her zaman çalışmayacaktır:

```glsl
void main() {
    gl_FragColor = vec4(1,0,0,1);	// HATA
}
```

"Merhaba dünya!" programımızın en alakalı unsurlarını tanımladığımıza göre, kod bloğuna tıklayıp öğrendiklerimizi zorlamaya başlamanın zamanı geldi. Hatalarda programın derlenemeyeceğini ve beyaz bir ekran göstereceğini fark edeceksiniz. Denenecek bazı ilginç şeyler var, örneğin:

* Float'ları tam sayılarla (integer) değiştirmeyi deneyin, grafik kartınız bu davranışı tolere edebilir veya etmeyebilir.

* 8. satırı yoruma almayı ve fonksiyona herhangi bir piksel değeri atamamayı deneyin.

* Belirli bir renk döndüren ayrı bir fonksiyon yapmayı ve bunu `main()` içinde kullanmayı deneyin. İpucu olarak, işte kırmızı bir renk döndüren bir fonksiyonun kodu:

```glsl
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```

* `vec4` türlerini oluşturmanın birden fazla yolu vardır, diğer yolları keşfetmeye çalışın. Aşağıdakilerden biri bunlardan biridir:

```glsl
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```

Bu örnek çok heyecan verici olmasa da, en temel örnektir - tuvalin (canvas) içindeki tüm pikselleri aynı tam renge değiştiriyoruz. Sonraki bölümde, piksel renklerini iki tür girdi kullanarak nasıl değiştireceğimizi göreceğiz: uzay (pikselin ekrandaki yeri) ve zaman (sayfa yüklendiğinden beri geçen saniye sayısı).
