## JS'den gelenler için bir giriş
yazan [Nicolas Barradeau](http://www.barradeau.com/)


Eğer bir JavaScript geliştiricisiyseniz, bu kitabı okurken biraz şaşıracaksınız.
Aslında, üst düzey JS'yi manipüle etmek ile shader'larla uğraşmak arasında birçok fark var.
Yine de, altta yatan assembly diline kıyasla GLSL insan tarafından okunabilir ve eminim ki özelliklerini kabul ettikten sonra kısa sürede çalışmaya başlayacaksınız.

JavaScript hakkında önceden (yüzeysel de olsa) bir bilginiz olduğunu varsayıyorum, ama aynı zamanda Canvas API hakkında da.
Değilse, endişelenmeyin, bu bölümün çoğunu yine de anlayabileceksiniz.

Ayrıca çok fazla detaya girmeyeceğim ve bazı şeyler _yarı doğru_ olabilir, "kesin bir kılavuz" beklemeyin, daha çok

### BÜYÜK BİR KUCAKLAMA

JavaScript hızlı prototipleme için harikadır; bir yığın rastgele, tipsiz değişken ve metot fırlatırsınız, dinamik olarak sınıf üyelerini ekleyebilir ve kaldırabilirsiniz, sayfayı yenilersiniz ve çalışıp çalışmadığını görürsünüz,
buna göre değişiklikler yaparsınız, sayfayı yenilersiniz, tekrarlarsınız, hayat kolaydır.
Bu yüzden JavaScript ile GLSL arasındaki farkın ne olduğunu merak edebilirsiniz.
Sonuçta, ikisi de tarayıcıda çalışır, ikisi de ekranda bir sürü eğlenceli şey çizmek için kullanılır ve bu açıdan JS kullanımı daha kolaydır.

Asıl fark, JavaScript'in **yorumlanan** bir dil olması, GLSL'nin ise **derlenen** bir dil olmasıdır.
**Derlenen** bir program işletim sisteminde yerel olarak çalışır, düşük seviyelidir ve genellikle hızlıdır.
**Yorumlanan** bir program çalıştırılmak için bir [Sanal Makine](https://en.wikipedia.org/wiki/Virtual_machine) (VM) gerektirir, yüksek seviyelidir ve genellikle yavaştır.


Bir tarayıcı (_JavaScript **VM**'si_) bir JS parçasını **çalıştırdığında** veya **yorumladığında**, hangi değişkenin ne olduğu ve hangi fonksiyonun ne yaptığı hakkında hiçbir fikri yoktur (dikkate değer istisna **TypedArrays**).
Bu nedenle _önceden_ hiçbir şeyi optimize edemez, bu yüzden kodunuzu okumak, değişkenlerinizin ve metotlarınızın türlerini **çıkarmak** (kullanımdan türetmek) için biraz zaman alır
 ve mümkün olduğunda, kodunuzun _bir kısmını_ çok daha hızlı çalışacak assembly koduna dönüştürür.

Yavaş, zahmetli ve çılgınca karmaşık bir süreçtir, detaylarla ilgileniyorsanız, [Chrome'un V8 motorunun nasıl çalıştığını](https://developers.google.com/v8/) izlemenizi öneririm.
En kötüsü, her tarayıcının JS'yi kendi yöntemiyle optimize etmesidir ve süreç sizden _gizlenir_; çaresizsiniz.

**Derlenen** bir program yorumlanmaz; işletim sistemi onu çalıştırır, program geçerliyse çalışır.
Bu büyük bir değişiklik; satır sonundaki noktalı virgülü unutursanız, kodunuz geçersizdir, derlenmez: kodunuz hiçbir şekilde programa dönüşmez.

Bu soğuktur ama bir **shader** budur: _GPU üzerinde çalıştırılan derlenmiş bir program_.
Korkmayın! Kodunuzun geçerli olduğundan emin olan bir **derleyici** en iyi arkadaşınız olacak.
Bu kitabın örnekleri ve [eşlikçi editör](http://editor.thebookofshaders.com/) çok kullanıcı dostudur.
Programınızın nerede ve neden derlenemediğini söylerler, ardından düzeltmeniz gerekir ve shader derlenmeye hazır olduğunda anında görüntülenir.
Bu, çok görsel olduğu ve gerçekten hiçbir şeyi bozamayacağınız için öğrenmenin harika bir yoludur.

Son not, bir **shader** 2 programdan oluşur: **vertex shader** ve **fragment shader**.
Kısaca, **vertex shader**, birinci program, girdi olarak bir *geometri* alır ve onu **piksel** (veya *fragment*) serilerine dönüştürür, ardından bunları
**fragment shader**'a, ikinci programa teslim eder, bu da pikselleri hangi renge boyayacağına karar verir.
Bu kitap ağırlıklı olarak ikincisine odaklanır, tüm örneklerde geometri tüm ekranı kaplayan basit bir dörtgendir.

PEKALA! hazır mısınız?

başlayalım!

### Güçlü tipler
![Google Görseller'de 'strong type' için ilk arama sonucu, 2016/05/20](strong_type.jpg)

JS veya herhangi bir tipsiz dilden geliyorsanız, değişkenlerinizi **tiplemek** yabancı bir kavramdır, bu da **tiplemeyi** GLSL'ye doğru atılacak en zor adım yapar.
**Tipleme**, adından da anlaşılacağı gibi, değişkenlerinize (ve tabii ki fonksiyonlarınıza) bir **tip** vereceğiniz anlamına gelir.
Bu temelde **`var`** kelimesinin artık var olmadığı anlamına gelir.
GLSL düşünce polisi onu ortak dilden sildi ve siz onu söyleyemezsiniz çünkü, şey... var olmuyor.

Sihirli **`var`** kelimesini kullanmak yerine, _kullandığınız her değişkenin tipini açıkça belirtmeniz_ gerekecek, sonra derleyici yalnızca nasıl verimli bir şekilde ele alacağını bildiği nesneleri ve temel türleri görecektir.
**`var`** anahtar kelimesini kullanamadığınızda ve _her şeyi belirtmeniz_ gerektiğinde dezavantaj, tüm değişkenlerin tipini bilmeniz ve onları iyi bilmeniz gerektiğidir.
Emin olun, sayıları az ve oldukça basitler (GLSL bir Java framework'ü değildir).

Kulağa korkutucu gelebilir ama sonuçta, JavaScript kodlarken yaptığınızdan çok farklı değil; bir değişken `boolean` ise, `true` veya `false` saklamasını beklersiniz ve başka bir şey değil.
Bir değişken `var uid = XXX;` olarak adlandırılmışsa, büyük olasılıkla içinde bir tam sayı değeri saklayacaksınız ve `var y = YYY;` bir kayan noktalı değere referans _olabilir_.
Daha da iyisi, **güçlü tipler** ile `X == Y` mi (yoksa `typeof X == typeof Y` mi? .. yoksa `typeof X !== null && Y...` ... neyse) diye zaman kaybetmezsiniz; sadece *bilirsiniz* ve bilmezseniz, derleyici bilir.

İşte GLSL'de kullanabileceğiniz **skaler tipler** (bir **skaler** bir miktarı tanımlar): `bool` (Boolean), `int`(Tam sayı), `float`(kayan noktalı Sayı).
Başka tipler de var ama sakin olalım, aşağıdaki snippet GLSL'de **`var`**'ların (evet, yasak kelimeyi söyledim) nasıl tanımlanacağını gösterir:
```glsl
//bir Boolean değeri:
JS: var b = true;               GLSL: bool b = true;

//bir Tam sayı değeri
JS: var i = 1;                  GLSL: int i = 1;

//bir Float değeri (bir Sayı)
JS: var f = 3.14159;            GLSL: float f = 3.14159;
```
Çok zor değil, değil mi? yukarıda belirtildiği gibi, verilen bir değişkenin tipini kontrol etmekle zaman kaybetmediğiniz için işleri kolaylaştırır bile.
Şüpheye düştüğünüzde, bunu programınızın JS'den çok daha hızlı çalışması için yaptığınızı hatırlayın.

#### void
Kabaca `null`'a karşılık gelen bir `void` tipi vardır, hiçbir şey döndürmeyen bir metodun dönüş tipi olarak kullanılır.
Bir değişkene atayamazsınız.

#### boolean
Bildiğiniz gibi, Boolean'lar çoğunlukla koşullu testlerde kullanılır; `if( myBoolean == true ){}else{}`.
Koşullu dallanma CPU'da geçerli bir seçenek olsa da, GLSL'nin [paralel doğası](http://thebookofshaders/01/) bunu daha az doğru kılar.
Koşullu ifadelerin kullanımı çoğu zaman önerilmez bile, kitap bunu çözmek için birkaç alternatif teknik açıklar.

#### tip dönüştürme
[Boromir](https://en.wikipedia.org/wiki/Boromir)'in dediği gibi, "İnsan Tiplenmiş temel türleri kolayca birleştiremez". JavaScript'in aksine, GLSL farklı tipteki değişkenler arasında işlem yapmanıza izin vermez.

Örneğin:
```glsl
int     i = 2;
float   f = 3.14159;

//bir tam sayıyı bir float değerle çarpmaya çalışmak
float   r = i * f;
```
düzgün çalışmayacaktır çünkü bir **_kedi_** ile bir **_zürafayı_** çaprazlamaya çalışıyorsunuz.
Bunun çözümü **tip dönüştürme** kullanmaktır; bu, *`i`*'nin aslında tipini değiştirmeden _derleyicinin `i`'nin `float` tipinde olduğuna inanmasını sağlar_.
```glsl
//'i' tam sayı değişkeninin tipini float'a dönüştürme
float   r = float( i ) * f;
```

Bu, bir **_kediyi_** **_zürafa kostümüne_** sokmakla kesinlikle eşdeğerdir ve beklendiği gibi çalışacaktır ( `r`, `i` x `f`'nin sonucunu saklayacaktır).

Yukarıdaki tiplerin herhangi birini başka herhangi bir tipe **dönüştürmek** mümkündür, `float`'ı `int`'e dönüştürmenin `Math.floor()` gibi davranacağını, kayan noktadan sonraki değerleri kaldıracağını not edin.
 Bir `float` veya `int`'i `bool`'a dönüştürmek, değişken sıfıra eşit değilse `true` döndürür.

#### yapıcı
Değişken **tipleri** aynı zamanda kendi **sınıf yapıcılarıdır**; aslında bir `float` değişkeni, bir _`Float`_ sınıfının _`örneği`_ olarak düşünülebilir.

Bu tanımlamalar eşit derecede geçerlidir:

```glsl
int     i = 1;
int     i = int( 1 );
int     i = int( 1.9995 );
int     i = int( true );
```
Bu, `skaler` tipler için çok anlam ifade etmeyebilir, **tip dönüştürmeden** çok farklı değildir, ancak *aşırı yükleme* bölümüne değinirken mantıklı olacaktır.

Tamam, bunlar 3 `temel tür`, onsuz yaşayamayacağınız şeyler ama elbette GLSL'nin sunacağı daha fazlası var.

### Vektörler
![Google Görseller'de 'vector villain' için ilk arama sonucu, 2016/05/20](vector.jpg)

JavaScript'te olduğu gibi GLSL'de de verileri işlemenin daha karmaşık yollarına ihtiyacınız olacak, işte burada **`vektörler`** devreye girer.
JavaScript'te bir `x` ve `y` değerini bir arada tutmak için bir `Point` sınıfı kodladığınızı varsayıyorum, bunun kodu şöyle olurdu:
```glsl
// 'sınıf' tanımı:
var Point = function( x, y ){
    this.x = x || 0;
    this.y = y || 0;
}

//ve şöyle örneklendirirdiniz:
var p = new Point( 100,100 );
```

Az önce gördüğümüz gibi, bu PEKÇOK seviyede ÇOK yanlış! Bir kere o **`var`** anahtar kelimesi, sonra korkunç **`this`**, sonra yine **tipsiz** `x` ve `y` değerleri...
Hayır, bu shader dünyasında işe yaramayacak.

Bunun yerine, GLSL verileri bir arada tutmak için yerleşik veri yapıları sunar:

 * `bvec2`: 2B Boolean vektör, `bvec3`: 3B Boolean vektör, `bvec4`: 4B Boolean vektör
 * `ivec2`: 2B Tam sayı vektör, `ivec3`: 3B Tam sayı vektör, `ivec4`: 4B Tam sayı vektör
 * `vec2`: 2B Float vektör, `vec3`: 3B Float vektör, `vec4`: 4B Float vektör

Her temel tür için bir tür **vektör** olduğunu hemen fark ettiniz, zeki tavşan.
Az önce gördüklerimizden, bir `bvec2`'nin iki `bool` tipi değer ve bir `vec4`'ün dört `float` değer tutacağını çıkarabilirsiniz.

Vektörlerin tanıttığı bir diğer şey **boyut** sayısıdır, bu 2B grafik render ederken 2B vektör ve 3B yaparken 3B vektör kullanıldığı anlamına gelmez.
O zaman 4B vektör neyi temsil eder? (aslında buna tesseract veya hiperküp denir)

Hayır, **boyutlar** **vektörde** saklanan **bileşenlerin** veya **değişkenlerin** sayısını ve tipini temsil eder:
```glsl
// bir 2B Boolean vektör oluşturalım
bvec2 b2 = bvec2 ( true, false );

// bir 3B Tam sayı vektör oluşturalım
ivec3 i3 = ivec3( 0,0,1 );

// bir 4B Float vektör oluşturalım
vec4 v4 = vec4( 0.0, 1.0, 2.0, 1. );
```
`b2` iki farklı boolean değer, `i3` 3 farklı tam sayı değer ve `v4` 4 farklı float değer saklar.

ama bu değerleri nasıl alırız?
`skalerler` durumunda, cevap açıktır; `float f = 1.2;` ile, `f` değişkeni `1.2` değerini tutar.
**Vektörlerle** biraz farklı ve oldukça güzeldir.

#### erişimciler
Değerlere erişmenin farklı yolları var
```glsl
// bir 4B Float vektör oluşturalım
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );
```
4 değeri almak için şunları yapabilirsiniz:
```glsl
float x = v4.x;     // x = 0.0
float y = v4.y;     // y = 1.0
float z = v4.z;     // z = 2.0
float w = v4.w;     // w = 3.0
```
güzel ve kolay; ama aşağıdakiler de verilerinize erişmenin eşit derecede geçerli yollarıdır:
```glsl
float x =   v4.x    =   v4.r    =   v4.s    =   v4[0];     // x = 0.0
float y =   v4.y    =   v4.g    =   v4.t    =   v4[1];     // y = 1.0
float z =   v4.z    =   v4.b    =   v4.p    =   v4[2];     // z = 2.0
float w =   v4.w    =   v4.a    =   v4.q    =   v4[3];     // w = 3.0
```

Ve zeki tavşan olarak zaten üç şeyi fark ettiniz:
   * `X`, `Y`, `Z` & `W` 3B programlarda 3B vektörleri temsil etmek için kullanılır
   * `R`, `G`, `B` & `A` renkleri ve alfa değerini kodlamak için kullanılır
   * `[0]`, `[1]`, `[2]` & `[3]` rastgele erişimli bir değer dizimiz olduğu anlamına gelir

Yani 2B veya 3B koordinatları, alfa değeri olan veya olmayan bir rengi veya sadece bazı rastgele değişkenleri manipüle etmenize bağlı olarak, en uygun **vektör** tipini ve boyutunu seçebilirsiniz.
Tipik olarak 2B koordinatlar ve vektörler (geometrik anlamda) `vec2`, `vec3` veya `vec4` olarak, renkler opaklığa ihtiyacınız varsa `vec3` veya `vec4` olarak saklanır, ancak vektörlerin nasıl kullanılacağı konusunda kısıtlama yoktur.
Örneğin, bir `bvec4`'te sadece bir boolean değer saklamak isterseniz, mümkündür, sadece bellek israfıdır.

**not**: bir shader'da, renk değerleri (`R`, `G`, `B` & `A`) normalleştirilmiştir, 0 ile 1 arasında değişirler, 0 ile 0xFF arasında değil, bu yüzden onları saklamak için Tam sayı `ivec4` yerine Float `vec4` kullanmanız daha iyi olur.

Güzel, ama daha fazlası var!

#### swizzle

Aynı anda birden fazla değer döndürmek mümkündür; diyelim ki bir `vec4`'ün sadece `X` ve `Y` değerlerine ihtiyacınız var, JavaScript'te şöyle bir şey yazmanız gerekirdi:
```glsl
var needles = [0, 1]; // veri yapımızdaki 'x' & 'y'nin konumu
var a = [ 0,1,2,3 ]; // 'vec4' veri yapımız
var b = a.filter( function( val, i, array ) {
return needles.indexOf( array.indexOf( val ) ) != -1;
});
// b = [ 0, 1 ]

//veya daha gerçek anlamda:
var needles = [0, 1];
var a = [ 0,1,2,3 ]; // 'vec4' veri yapımız
var b = [ a[ needles[ 0 ] ], a[ needles[ 1 ] ] ]; // b = [ 0, 1 ]
```
Çirkin. GLSL'de şöyle alabilirsiniz:
```glsl
// bir 4B Float vektör oluştur
vec4 v4 = vec4( 0.0, 1.0, 2.0, 3.0 );

//ve sadece X & Y bileşenlerini al
vec2 xy =   v4.xy; //   xy = vec2( 0.0, 1.0 );
```
Ne oldu?! **Erişimcileri birleştirdiğinizde**, GLSL zarif bir şekilde istediğiniz değerlerin bir alt kümesini en uygun **vektör** formatında döndürür.
Gerçekten, vektör isterseniz JavaScript'teki bir dizi gibi **rastgele erişimli** bir veri yapısıdır.
Yani sadece verilerinizin bir alt kümesini almakla kalmaz, aynı zamanda ihtiyacınız olan **sırayı** da belirtebilirsiniz, bu bir vektörün bileşenlerinin değerlerini ters çevirecektir:
```glsl
// bir 4B Float vektör oluştur: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

//ve renk bileşenlerini A,B,G,R sırasında al
vec4 backwards = color.abgr; // backwards = vec4( 1.0, 0.0, 0.8, 0.2 );
```
Ve tabii ki aynı bileşeni birden fazla kez isteyebilirsiniz:
```glsl
// bir 4B Float vektör oluştur: R,G,B,A
vec4 color = vec4( 0.2, 0.8, 0.0, 1.0 );

//ve rengin G & A kanallarına dayalı bir GAG vec3 al
vec3 GAG = color.gag; // GAG = vec4( 0.8, 1.0, 0.8 );
```

Bu, vektörlerin parçalarını birleştirmek, bir RGBA rengin sadece rgb kanallarını çıkarmak vb. için son derece kullanışlıdır.


#### her şeyi aşırı yükle!

Tipler bölümünde **yapıcı** hakkında bir şey söylemiştim ve bu yine GLSL'nin harika bir özelliği; **aşırı yükleme**.
Bilmeyenler için, bir operatörü veya fonksiyonu **aşırı yüklemek** kabaca şu anlama gelir: _'söz konusu operatörün veya fonksiyonun davranışını operandlara/argümanlara göre değiştirmek'_.
JavaScript'te aşırı yüklemeye izin verilmez, bu yüzden başta biraz tuhaf gelebilir ama eminim alıştıktan sonra JS'de neden uygulanmadığını merak edeceksiniz (kısa cevap, *tipleme*).

Operatör aşırı yüklemenin en temel örneği şöyledir:

```glsl
vec2 a = vec2( 1.0, 1.0 );
vec2 b = vec2( 1.0, 1.0 );
//aşırı yüklenmiş toplama
vec2 c = a + b;     // c = vec2( 2.0, 2.0 );
```
NE? Yani sayı olmayan şeyleri toplayabilir misiniz?!

Evet, kesinlikle. Tabii ki bu tüm operatörler (`+`, `-`, `*` & `/`) için geçerlidir ama bu sadece başlangıç.
Aşağıdaki parçayı düşünün:
```glsl
vec2 a = vec2( 0.0, 0.0 );
vec2 b = vec2( 1.0, 1.0 );
//aşırı yüklenmiş yapıcı
vec4 c = vec4( a , b );         // c = vec4( 0.0, 0.0, 1.0, 1.0 );
```
İki `vec2`'den bir `vec4` oluşturduk, bunu yaparken yeni `vec4`, `a.x` ve `a.y`'yi `c`'nin `X`, `Y` bileşenleri olarak kullandı.
Sonra `b.x` ve `b.y`'yi aldı ve `c`'nin `Z` ve `W` bileşenleri olarak kullandı.

Bu, bir **fonksiyonun** farklı argümanları kabul etmek üzere aşırı yüklenmesidir, bu durumda `vec4` **yapıcısı**.
Bu, aynı metodun farklı imzalara sahip birçok **versiyonunun** aynı programda bir arada var olabileceği anlamına gelir, örneğin aşağıdaki tanımlamaların hepsi geçerlidir:
```glsl
vec4 a = vec4(1.0, 1.0, 1.0, 1.0);
vec4 a = vec4(1.0);// x, y, z, w hepsi 1.0'a eşit
vec4 a = vec4( v2, float, v4 );// vec4( v2.x, v2.y, float, v4.x );
vec4 a = vec4( v3, float );// vec4( v3.x, v3.y, v3.z, float );
vb.
```
Dikkat etmeniz gereken tek şey, **vektörünüzü** beslemek için yeterli argüman sağlamaktır.

Son olarak, programınızda yerleşik fonksiyonları, tasarlanmadıkları argümanları alacak şekilde aşırı yüklemenize izin verilir (yine de bu çok sık olmamalıdır).

#### diğer tipler
Vektörler eğlencelidir, shader'ınızın eti sütüdür.
Matrisler ve Doku örnekleyicileri gibi başka temel türler de vardır, bunlar kitapta daha sonra ele alınacaktır.

Diziler de kullanabiliriz. Elbette tipli olmaları gerekir ve bazı *tuhaflıklar* vardır:
 * sabit boyutludurlar
 * push(), pop(), splice() vb. yapamazsınız ve ```length``` özelliği yoktur
 * değerlerle hemen başlatılamazlar
 * değerleri tek tek ayarlamanız gerekir

bu çalışmayacaktır:
```glsl
int values[3] = [0,0,0];
```
ama bu çalışacaktır:
```glsl
int values[3];
values[0] = 0;
values[1] = 0;
values[2] = 0;
```
Verilerinizi bildiğinizde veya küçük değer dizileriniz olduğunda bu iyidir.
Daha ifade edici bir değişken tanımlama yolu istiyorsanız,
bir de ```struct``` tipi var. Bunlar metotları olmayan _nesneler_ gibidir;
aynı nesne içinde birden fazla değişkeni saklamaya ve erişmeye izin verirler
```glsl
struct ColorStruct {
    vec3 color0;
    vec3 color1;
    vec3 color2;
}
```
ardından _colors_ değerlerini şu şekilde ayarlayabilir ve alabilirsiniz:
```glsl
//yapıyı bazı değerlerle başlat
ColorStruct sandy = ColorStruct( 	vec3(0.92,0.83,0.60),
                                    vec3(1.,0.94,0.69),
                                    vec3(0.95,0.86,0.69) );

//yapıdan bir değere eriş
sandy.color0 // vec3(0.92,0.83,0.60)
```
Bu sözdizimi şekeridir ama daha temiz, en azından daha aşina olduğunuz kod yazmanıza yardımcı olabilir.

#### ifadeler & koşullar

Veri yapıları kendi başlarına güzeldir ama bir noktada yinelememiz veya koşullu testler yapmamız _gerekebilir_.
Neyse ki, sözdizimi JavaScript'e çok yakındır.
Bir koşul şöyledir:
```glsl
if( condition ){
    //doğru
}else{
    //yanlış
}
```
Bir for döngüsü genellikle:
```glsl
const int count = 10;
for( int i = 0; i <= count; i++){
    //bir şey yap
}
```
veya float yineleyici ile:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    //bir şey yap
}
```
```count```'un bir ```sabit``` olarak tanımlanması gerektiğini not edin.
Bu, tipin önüne bir ```const``` **niteleyicisi** eklemek anlamına gelir, bunu bir saniye içinde ele alacağız.

ayrıca ```break``` ve ```continue``` ifadelerimiz var:
```glsl
const float count = 10.;
for( float i = 0.0; i <= count; i+= 1.0 ){
    if( i < 5. )continue;
    if( i >= 8. )break;
}
```
Bazı donanımlarda ```break```'in beklendiği gibi çalışmadığını ve döngünün erken çıkmadığını unutmayın.

Genel olarak, yineleme sayısını mümkün olduğunca düşük tutmak ve döngülerden ve koşullu ifadelerden mümkün olduğunca kaçınmak isteyeceksiniz.


#### niteleyiciler

Değişken tiplerinin üstüne, GLSL **niteleyiciler** kullanır.
Kısaca, niteleyiciler derleyicinin hangi değişkenin ne olduğunu bilmesine yardımcı olur.
Örneğin bazı veriler yalnızca CPU'dan GPU'ya sağlanabilir, bunlara **attribute** ve **uniform** denir.
**Attribute**'ler vertex shader'lar için ayrılmıştır, **uniform**'lar hem vertex hem de fragment shader'larda kullanılabilir.
Ayrıca vertex ve fragment shader arasında değişken geçirmek için kullanılan bir ```varying``` niteleyicisi de vardır.

Burada çok fazla detaya girmeyeceğim çünkü ağırlıklı olarak **fragment shader**'a odaklanıyoruz ama kitapta daha sonra şöyle bir şey göreceksiniz:
```glsl
uniform vec2 u_resolution;
```
Burada ne yaptığımızı görüyor musunuz? Değişkenin tipinden önce bir ```uniform``` niteleyicisi koyduk
Bu, üzerinde çalıştığımız tuvalin çözünürlüğünün CPU'dan shader'a geçirildiği anlamına gelir.
Tuvalin genişliği x'te ve yüksekliği 2B vektörün y bileşeninde saklanır.

Derleyici bu niteleyicinin önünde bir değişken gördüğünde, çalışma zamanında bu değerleri *ayarlayamayacağınızdan* emin olacaktır.

Aynı şey ```for``` döngümüzün sınırı olan ```count``` değişkenimiz için de geçerlidir:
```glsl
const float count = 10.;
for( ... )
```
Bir ```const``` niteleyicisi kullandığımızda, derleyici değişkenin değerini yalnızca bir kez ayarlamamızı sağlayacaktır, aksi takdirde sabit değildir.

Fonksiyon imzalarında kullanılan 3 ek niteleyici vardır: ```in```, ```out``` ve ```inout```.
JavaScript'te, bir fonksiyona skaler argümanlar geçirdiğinizde, değerleri salt okunurdur ve fonksiyonun içinde değerlerini değiştirirseniz,
değişiklikler fonksiyonun dışındaki değişkene uygulanmaz.
```glsl
function banana( a ){
    a += 1;
}
var value = 0;
banana( value );
console.log( value );// > 0 ; değişiklikler fonksiyonun dışında hesaba katılmaz
```

Argüman niteleyicileri ile argümanların davranışını belirtebilirsiniz:
  * ```in``` salt okunur olacaktır ( varsayılan )
  * ```out```  salt yazılır: bu argümanın değerini okuyamazsınız ama ayarlayabilirsiniz
  * ```inout```  okuma-yazma: bu değişkenin değerini hem alabilir hem de ayarlayabilirsiniz

GLSL'de banana metodunu yeniden yazmak şöyle görünür
```glsl
void banana( inout float a ){
    a += 1.;
}
float A = 0.;
banana( A ); //artık A = 1.;
```
Bu JS'den çok farklı ve oldukça güçlüdür ama imza niteleyicilerini belirtmek zorunda değilsiniz (varsayılan salt okunurdur).

#### uzay & koordinatlar

Son not, DOM ve Canvas 2D'de Y ekseninin 'aşağı' yönünü göstermesine alışığızdır.
Bu, bir web sayfasının açılma şeklini takip ettiğinden DOM bağlamında mantıklıdır; navigasyon çubuğu üstte, içerik alta doğru genişler.
WebGL tuvalinde Y ekseni ters çevrilmiştir: Y 'yukarı' yönünü gösterir.

Bu, orijinin, (0,0) noktasının, bir 2B Tuvalin sol üst köşesinde olduğu gibi değil, bir WebGL bağlamının sol alt köşesinde yer aldığı anlamına gelir.
Doku koordinatları bu kuralı takip eder ve başlangıçta sezgisel olmayabilir.

## Ve bitti!
Elbette çeşitli kavramların daha derinlerine inebilirdik ama daha önce belirtildiği gibi, bu yeni gelenlere BÜYÜK BİR KUCAKLAMA vermeyi amaçlıyor.
Sindirmesi gereken epeyce şey var ama sabır ve pratikle, bu giderek daha doğal hale gelecektir.

Umarım bunların bir kısmını faydalı bulmuşsunuzdur, şimdi kitaptaki yolculuğunuza başlamaya ne dersiniz?
