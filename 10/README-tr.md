# Üretken tasarımlar

Bu kadar tekrarlama ve düzenden sonra yazarın biraz kaos getirmeye zorlanması sürpriz değil.

## Rastgelelik (Random)

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

Rastgelelik, entropinin maksimal ifadesidir. Görünüşte öngörülebilir ve katı kod ortamında nasıl rastgelelik üretebiliriz?

Aşağıdaki fonksiyonu analiz ederek başlayalım:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Yukarıda bir sinüs dalgasının kesir içeriğini çıkarıyoruz. ```-1.0``` ile ```1.0``` arasında dalgalanan [```sin()```](../glossary/?search=sin) değerleri kayan noktanın arkasında kesildi ve ```0.0``` ile ```1.0``` arasında tüm pozitif değerleri döndürüyor. Bu etkiyi, bu sinüs dalgasını daha küçük parçalara "kırarak" bazı sözde rastgele değerler elde etmek için kullanabiliriz. Nasıl mı? [```sin(x)```](../glossary/?search=sin) sonucunu daha büyük sayılarla çarparak. Devam edin, yukarıdaki fonksiyona tıklayın ve sıfırlar eklemeye başlayın.

```100000.0```'a ulaştığınızda (ve denklem şöyle görünüyorsa: ```y = fract(sin(x)*100000.0)```) artık sinüs dalgasını ayırt edemezsiniz. Kesir kısmının ayrıntı düzeyi sinüs dalgasının akışını sözde rastgele kaosa dönüştürdü.

## Kaosu kontrol etme

Rastgele kullanmak zor olabilir; hem çok kaotiktir hem de bazen yeterince rastgele değildir. Aşağıdaki grafiğe bakın. Bunu yapmak için, yukarıda tanımladığımız gibi uygulanan bir ```rand()``` fonksiyonu kullanıyoruz.

Daha yakından bakıldığında, [```sin()```](../glossary/?search=sin) dalgasının ```-1.5707``` ve ```1.5707```'de tepe yaptığını görebilirsiniz. Şimdi nedenini anladığınıza bahse girerim — sinüs dalgasının maksimum ve minimumunun oluştuğu yer burasıdır.

Rastgele dağılıma yakından bakarsanız, kenarlara kıyasla ortada bir miktar yoğunlaşma olduğunu not edeceksiniz.

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

Bir süre önce [Pixelero](https://pixelero.wordpress.com), [rastgele dağılım hakkında ilginç bir makale](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) yayınladı. Kullandığı fonksiyonlardan bazılarını önceki grafiğe ekledim, oynayıp dağılımın nasıl değişebileceğini görmeniz için. Fonksiyonların yorumunu kaldırın ve ne olduğunu görün.

[Pixelero'nun makalesini](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) okursanız, ```rand()``` fonksiyonumuzun determinist bir rastgele, yani sözde rastgele olduğunu aklınızda tutmak önemlidir. Bu, örneğin ```rand(1.)```'in her zaman aynı değeri döndüreceği anlamına gelir. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/), determinist olmayan ActionScript fonksiyonu ```Math.random()```'a referans verir; her çağrı farklı bir değer döndürür.

## 2B Rastgelelik

Artık rastgeleliği daha iyi anladığımıza göre, bunu iki boyutta, hem ```x``` hem de ```y``` eksenine uygulamanın zamanı geldi. Bunun için iki boyutlu bir vektörü tek boyutlu bir kayan nokta değerine dönüştürmenin bir yoluna ihtiyacımız var. Bunu yapmanın farklı yolları vardır, ancak [```dot()```](../glossary/?search=dot) fonksiyonu bu durumda özellikle faydalıdır. İki vektörün hizalamasına bağlı olarak ```0.0``` ile ```1.0``` arasında tek bir float değer döndürür.

<div class="codeAndCanvas" data="2d-random.frag"></div>

13-15 arası satırlara bakın ve ```vec2 st```'yi başka bir iki boyutlu vektörle (```vec2(12.9898,78.233)```) nasıl karşılaştırdığımıza dikkat edin.

* 14 ve 15. satırlardaki değerleri değiştirmeyi deneyin. Rastgele desenin nasıl değiştiğini görün ve bundan ne öğrenebileceğimizi düşünün.

* Bu rastgele fonksiyonu fare etkileşimine (```u_mouse```) ve zamana (```u_time```) bağlayarak nasıl çalıştığını daha iyi anlayın.

## Kaosu kullanma

İki boyuttaki rastgelelik TV gürültüsüne çok benziyor, değil mi? Görüntü oluşturmak için kullanılması zor bir ham malzeme. Nasıl kullanacağımızı öğrenelim.

İlk adımımız ona bir ızgara uygulamaktır; [```floor()```](../glossary/?search=floor) fonksiyonunu kullanarak bir tam sayı hücre tablosu oluşturacağız. Özellikle 22 ve 23. satırlara dikkat ederek aşağıdaki koda bakın.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

Uzayı 10'la ölçekledikten sonra (21. satırda), koordinatların tam sayılarını kesir kısmından ayırıyoruz. Bu son işleme aşinayız çünkü ```0.0```'dan ```1.0```'a giden daha küçük hücrelere bölmek için kullanıyorduk. Koordinatın tam sayı kısmını elde ederek, tek bir hücre gibi görünecek bir piksel bölgesi için ortak bir değer izole ederiz. Sonra o alan için rastgele bir değer elde etmek üzere ortak tam sayıyı kullanabiliriz. Rastgele fonksiyonumuz determinist olduğundan, döndürülen rastgele değer o hücredeki tüm pikseller için sabit olacaktır.

Kayan kısmı sakladığımızı görmek için 29. satırın yorumunu kaldırın, böylece her hücrenin içinde şeyler çizmek için bunu hâlâ bir koordinat sistemi olarak kullanabiliriz.

Bu iki değeri birleştirmek — koordinatın tam sayı kısmı ve kesir kısmı — çeşitleme ve düzeni karıştırmanıza olanak tanır.

Ünlü ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` labirent oluşturucusunun GLSL portuna bir bakın.

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

Burada önceki bölümdeki ```truchetPattern()``` fonksiyonunu (41-47 arası satırlar) kullanarak hücrelerin rastgele değerlerini bir yönde veya diğerinde bir çizgi çizmek için kullanıyorum.

50-53 arası satırların yorumunu kaldırarak başka bir ilginç desen elde edebilir, veya 35 ve 36. satırların yorumunu kaldırarak deseni canlandırabilirsiniz.

## Rastgelelikte Ustalık

Japon elektronik besteci ve görsel sanatçı [Ryoji Ikeda](http://www.ryojiikeda.com/), rastgelelik kullanımında ustalaşmıştır; çalışmalarından etkilenmemek ve hipnotize olmamak zordur. Ses ve görsel ortamda rastgelelik kullanımı o şekilde işlenmiştir ki, rahatsız edici bir kaos değil, teknolojik kültürümüzün karmaşıklığının bir aynasıdır.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[Ikeda](http://www.ryojiikeda.com/)'nın çalışmalarına bakın ve aşağıdaki alıştırmaları deneyin:

* Rastgele değerlerle hareket eden hücre satırları yapın (zıt yönlerde). Sadece daha parlak değerlere sahip hücreleri gösterin. Satırların hızının zaman içinde dalgalanmasını sağlayın.

<a href="../edit.php#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Benzer şekilde birçok satır yapın ama her biri farklı hız ve yönde olsun. Hangi hücrelerin gösterileceğinin eşiğini farenin konumuna bağlayın.

<a href="../edit.php#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Başka ilginç efektler oluşturun.

<a href="../edit.php#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Rastgeleliği estetik olarak kullanmak sorunlu olabilir, özellikle doğal görünümlü simülasyonlar yapmak istiyorsanız. Rastgelelik basitçe çok kaotiktir ve gerçek hayatta çok az şey ```random()``` gibi görünür. Bir yağmur desenine veya borsa grafiğine bakarsanız, ikisi de oldukça rastgeledir, bunlar bu bölümün başında yaptığımız rastgele desene hiç benzemez. Neden? Rastgele değerlerin birbirleriyle hiçbir korelasyonu yoktur, ancak çoğu doğal desen önceki durumun bir hafızasına sahiptir.

Bir sonraki bölümde, hesaplamalı kaos yaratmanın düzgün ve *doğal görünümlü* yolu olan gürültüyü (noise) öğreneceğiz.

#### Araç kutunuz için

* [LYGIA'nın üretken fonksiyonları](https://lygia.xyz/generative), GLSL'de desenler üretmek için yeniden kullanılabilir fonksiyonlar kümesidir. Üretken sanat yaratmak için rastgelelik ve gürültüyü nasıl kullanacağınızı öğrenmek için harika bir kaynaktır. Yeniden kullanılabilirlik, performans ve esneklik için tasarlanmış çok ayrıntılı bir kütüphanedir. Ve herhangi bir projeye ve framework'e kolayca eklenebilir.
