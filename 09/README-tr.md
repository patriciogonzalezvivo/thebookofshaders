## Desenler

Shader programları piksel piksel çalıştırıldığından, bir şekli ne kadar tekrarlarsanız tekrarlayın hesaplama sayısı sabit kalır. Bu, fragment shader'larını döşeme desenleri için özellikle uygun kılar.

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

Bu bölümde şimdiye kadar öğrendiklerimizi uygulayacak ve tuval boyunca tekrarlayacağız. Önceki bölümlerde olduğu gibi, stratejimiz uzay koordinatlarını (0.0 ile 1.0 arasında) çarpmaya dayanacaktır; böylece 0.0 ile 1.0 arasında çizdiğimiz şekiller bir ızgara oluşturmak üzere tekrarlanacaktır.

*"Izgara, insan sezgisi ve icadının çalışabileceği ve altüst edebileceği bir çerçeve sağlar. Doğanın kaosunun içinde desenler bir karşıtlık ve düzen vaadi sunar. Çömleklerdeki erken desenlerden Roma hamamlarındaki geometrik mozaiklere kadar, insanlar yaşamlarını süsleme ile zenginleştirmek için uzun süredir ızgaralar kullanmaktadır."* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

Önce [```fract()```](../glossary/?search=fract) fonksiyonunu hatırlayalım. Bir sayının kesir kısmını döndürür, yani ```fract()``` özünde birin modülosudur ([```mod(x,1.0)```](../glossary/?search=mod)). Başka bir deyişle, [```fract()```](../glossary/?search=fract) ondalık noktadan sonraki sayıyı döndürür. Normalize edilmiş koordinat sistemi değişkenimiz (```st```) zaten 0.0'dan 1.0'a gittiğinden şunu yapmak mantıklı olmaz:

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
    st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

Ama normalize edilmiş koordinat sistemini yukarı ölçeklersek — diyelim ki üçle — 0-1 arasında üç doğrusal enterpolasyon dizisi elde ederiz: birincisi 0-1 arasında, ikincisi 1-2 arasındaki kayan noktalar için ve üçüncüsü 2-3 arasındaki kayan noktalar için.

<div class="codeAndCanvas" data="grid-making.frag"></div>

Şimdi 27. satırın yorumunu kaldırarak her alt uzayda bir şeyler çizme zamanı. (x ve y'de eşit olarak çarptığımız için uzayın en-boy oranı değişmez ve şekiller beklendiği gibi olur.)

Daha derin bir anlayış elde etmek için aşağıdaki alıştırmalardan bazılarını deneyin:

* Uzayı farklı sayılarla çarpın. Kayan nokta değerleriyle ve ayrıca x ve y için farklı değerlerle deneyin.

* Bu döşeme numarasından yeniden kullanılabilir bir fonksiyon yapın.

* Uzayı 3 satır ve 3 sütuna bölün. İş parçacığının hangi sütun ve satırda olduğunu bilmenin bir yolunu bulun ve bunu görüntülenen şekli değiştirmek için kullanın. Bir tic-tac-toe maçı oluşturmaya çalışın.

### Desenler içinde matris uygulama

Her alt bölüm veya hücre, daha önce kullandığımız normalize edilmiş koordinat sisteminin daha küçük bir versiyonu olduğundan, uzayı içeride ötelemek, döndürmek veya ölçeklemek için bir matris dönüşümü uygulayabiliriz.

<div class="codeAndCanvas" data="checks.frag"></div>

* Bu deseni canlandırmanın ilginç yollarını düşünün. Rengi, şekilleri ve hareketi canlandırmayı düşünün. Üç farklı animasyon yapın.

* Farklı şekilleri birleştirerek daha karmaşık desenler yeniden oluşturun.


[![](diamondtiles-long.png)](../edit.php#09/diamondtiles.frag)

* Kendi [İskoç Tartan Desenlerinizi](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns) oluşturmak için farklı desen katmanlarını birleştirin.

[ ![Vector Pattern Scottish Tartan By Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### Ofset desenler

Diyelim ki bir tuğla duvarı taklit etmek istiyoruz. Duvara bakıldığında, her diğer satırda x'te yarım tuğla ofseti görülebilir. Bunu nasıl yapabiliriz?

![](brick.jpg)

İlk adım olarak iş parçacığımızın satırının çift mi yoksa tek sayı mı olduğunu bilmemiz gerekir, çünkü bunu o satırda x'i ofsetlememiz gerekip gerekmediğini belirlemek için kullanabiliriz. Bunun için [```mod()```](../glossary/?search=mod) of ```2.0```'ı kullanacak ve sonucun ```1.0```'ın altında olup olmadığına bakacağız. Aşağıdaki formüle bakın ve son iki satırın yorumunu kaldırın.

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div>

Gördüğünüz gibi, [```mod()```](../glossary/?search=mod) of ```2.0```'ın ```1.0```'ın altında olup olmadığını kontrol etmek için bir [üçlü operatör](https://en.wikipedia.org/wiki/%3F:) kullanabiliriz (ikinci satır) veya benzer şekilde aynı işlemi yapan ama daha hızlı olan [```step()```](../glossary/?search=step) fonksiyonunu kullanabiliriz. Neden? Her grafik kartının kodu nasıl optimize ettiğini ve derlediğini bilmek zor olsa da, yerleşik fonksiyonların yerleşik olmayanlardan daha hızlı olduğunu varsaymak güvenlidir. Bir yerleşik fonksiyon kullanabildiğiniz her yerde, kullanın!

Artık tek sayı formülümüz olduğuna göre, döşemelerimize *tuğla* efekti vermek için tek satırlara bir ofset uygulayabiliriz. Aşağıdaki kodun 14. satırı, fonksiyonu tek satırları "algılamak" ve onlara ```x```'te yarım birim ofset vermek için kullandığımız yerdir. Çift satırlar için fonksiyonumuzun sonucunun ```0.0``` olduğunu ve ```0.0```'ın ```0.5``` ofsetiyle çarpılmasının ```0.0``` ofset verdiğini not edin. Ancak tek satırlarda fonksiyonumuzun sonucunu, ```1.0```'ı, ```0.5``` ofsetiyle çarpıyoruz, bu da koordinat sisteminin ```x``` eksenini ```0.5``` kadar hareket ettiriyor.

Şimdi 32. satırın yorumunu kaldırmayı deneyin — bu, "modern tuğla" görünümünü taklit etmek için koordinat sisteminin en-boy oranını uzatır. 40. satırın yorumunu kaldırarak koordinat sisteminin kırmızı ve yeşile nasıl eşlendiğini görebilirsiniz.

<div class="codeAndCanvas" data="bricks.frag"></div>

* Ofseti zamana göre hareket ettirerek bunu canlandırmayı deneyin.

* Çift satırların sola ve tek satırların sağa hareket ettiği başka bir animasyon yapın.

* Bu efekti sütunlarla tekrarlayabilir misiniz?

* Şöyle bir şey elde etmek için ```x``` ve ```y``` ekseninde bir ofseti birleştirmeyi deneyin:

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Truchet Döşemeleri

Artık hücremizin çift mi yoksa tek satır veya sütunda mı olduğunu söylemeyi öğrendiğimize göre, konumuna bağlı olarak tek bir tasarım öğesini yeniden kullanmak mümkündür. Tek bir tasarım öğesinin dört farklı şekilde sunulabildiği [Truchet Döşemeleri](http://en.wikipedia.org/wiki/Truchet_tiles) durumunu düşünün:

![](truchet-00.png)

Döşemeler arasında deseni değiştirerek, sonsuz sayıda karmaşık tasarım oluşturmak mümkündür.

![](truchet-01.png)

```rotateTilePattern()``` fonksiyonuna yakından bakın; uzayı dört hücreye böler ve her birine bir dönme açısı atar.

<div class="codeAndCanvas" data="truchet.frag"></div>

* Yeni tasarımlar oluşturmak için 69-72 arası satırları yorum yapın, yorumdan çıkarın ve çoğaltın.

* Siyah beyaz üçgeni başka bir öğeyle değiştirin: yarım daireler, döndürülmüş kareler veya çizgiler gibi.

* Öğelerin konumlarına göre döndürüldüğü diğer desenleri kodlayın.

* Öğelerin konumuna göre diğer özellikleri değiştiren bir desen yapın.

* Bu bölümdeki prensipleri uygulayabileceğiniz, mutlaka bir desen olmayan başka bir şey düşünün. (Ör: I Ching hegzagramları)

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## Kendi kurallarınızı oluşturma

Prosedürel desenler yapmak, minimal yeniden kullanılabilir öğeler bulmaya yönelik zihinsel bir egzersizdir. Bu pratik eskidir; bir tür olarak tekstilleri, zeminleri ve nesnelerin kenarlarını süslemek için uzun süredir ızgaralar ve desenler kullanıyoruz: antik Yunan'daki meander desenlerinden Çin kafes tasarımlarına kadar, tekrarlama ve çeşitlemenin verdiği zevk hayal gücümüzü yakalar. [Dekoratif](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [desenlere](https://www.pinterest.com/patriciogonzv/paterns/) bakarak zaman ayırın ve sanatçılar ile tasarımcıların düzenin öngörülebilirliği ile çeşitleme ve kaosun sürprizi arasındaki ince çizgide uzun bir gezinme geçmişine sahip olduğunu görün. Arap geometrik desenlerinden muhteşem Afrika kumaş tasarımlarına kadar, öğrenilecek kocaman bir desenler evreni var.

![Franz Sales Meyer - A handbook of ornament (1920)](geometricpatters.png)

Bu bölümle Algoritmik Çizim bölümünü bitiriyoruz. Sonraki bölümlerde shader'larımıza biraz entropi getirmeyi ve üretken tasarımlar üretmeyi öğreneceğiz.
