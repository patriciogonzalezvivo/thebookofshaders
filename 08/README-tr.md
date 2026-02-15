## 2B Matrisler

<canvas id="custom" class="canvas" data-fragment-url="matrix.frag"  width="700px" height="200px"></canvas>

### Öteleme (Translate)

Önceki bölümde bazı şekiller yapmayı öğrendik — bu şekilleri hareket ettirmenin püf noktası koordinat sisteminin kendisini hareket ettirmektir. Bunu, her bir fragmanın konumunu içeren ```st``` değişkenine basitçe bir vektör ekleyerek başarabiliriz. Bu, tüm uzay koordinat sisteminin hareket etmesine neden olur.

![](translate.jpg)

Bunu açıklamaktansa görmek daha kolaydır; kendiniz görmek için:

* Uzayın kendisinin nasıl hareket ettiğini görmek için aşağıdaki kodun 35. satırının yorumunu kaldırın.

<div class="codeAndCanvas" data="cross-translate.frag"></div>

Şimdi aşağıdaki alıştırmayı deneyin:

* ```u_time``` ile birlikte şekillendirme fonksiyonlarını kullanarak küçük artıyı ilginç bir şekilde hareket ettirin. İlgilendiğiniz belirli bir hareket kalitesi arayın ve artıyı aynı şekilde hareket ettirmeye çalışın. Önce "gerçek dünyadan" bir şey kaydetmek faydalı olabilir — dalgaların gelişi ve gidişi, bir sarkaç hareketi, zıplayan bir top, hızlanan bir araba, duran bir bisiklet gibi.

### Döndürme

Nesneleri döndürmek için tüm uzay sistemini hareket ettirmemiz de gerekir. Bunun için bir [matris](http://en.wikipedia.org/wiki/Matrix_%28mathematics%29) kullanacağız. Matris, sütun ve satırlar halinde düzenlenmiş bir sayı kümesidir. Vektörler, vektörün değerlerini belirli bir şekilde değiştirmek için kesin kurallar izlenerek matrislerle çarpılır.

[![Matris için Vikipedi sayfası](matrixes.png)](https://en.wikipedia.org/wiki/Matrix)

GLSL'de iki, üç ve dört boyutlu matrisler için yerleşik destek vardır: [```mat2```](../glossary/?search=mat2) (2x2), [```mat3```](../glossary/?search=mat3) (3x3) ve [```mat4```](../glossary/?search=mat4) (4x4). GLSL ayrıca matris çarpımını (```*```) ve matrise özgü fonksiyonu ([```matrixCompMult()```](../glossary/?search=matrixCompMult)) da destekler.

Matrislerin davranışlarına dayanarak, belirli davranışlar üretmek için matrisler oluşturulabilir. Örneğin bir vektörü ötelemek için matris kullanabiliriz:

![](3dtransmat.png)

Daha ilginç olarak, koordinat sistemini döndürmek için bir matris kullanabiliriz:

![](rotmat.png)

2B döndürme matrisi oluşturan bir fonksiyon için aşağıdaki koda bakın. Bu fonksiyon, koordinatları ```vec2(0.0)``` noktası etrafında döndürmek için iki boyutlu vektörler için yukarıdaki [formülü](http://en.wikipedia.org/wiki/Rotation_matrix) izler.

```glsl
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
```

Şekilleri çizme şeklimize göre, bu tam olarak istediğimiz şey değildir. Artı şeklimiz ```vec2(0.5)``` konumuna karşılık gelen tuvalin merkezinde çizilmiştir. Bu yüzden, uzayı döndürmeden önce şekli `merkez`den ```vec2(0.0)``` koordinatına taşımamız, uzayı döndürmemiz ve sonunda orijinal yerine geri taşımamız gerekir.

![](rotate.jpg)

Bu şöyle görünür:

<div class="codeAndCanvas" data="cross-rotate.frag"></div>

Aşağıdaki alıştırmaları deneyin:

* Yukarıdaki kodun 45. satırının yorumunu kaldırın ve ne olduğuna dikkat edin.

* Döndürme öncesi ve sonrasındaki ötellemeleri (37 ve 39. satırlar) yorum satırı yapın ve sonuçları gözlemleyin.

* Öteleme alıştırmasında simüle ettiğiniz animasyonu iyileştirmek için döndürmeleri kullanın.

### Ölçekleme

Matrislerin uzaydaki nesneleri ötelemek ve döndürmek için nasıl kullanıldığını gördük. (Daha doğrusu, nesneleri döndürmek ve taşımak için koordinat sistemini dönüştürmek.) 3D modelleme yazılımı veya Processing'deki push ve pop matris fonksiyonlarını kullandıysanız, matrislerin bir nesnenin boyutunu ölçeklemek için de kullanılabileceğini bilirsiniz.

![](scale.png)

Önceki formülü izleyerek, 2B ölçekleme matrisinin nasıl yapılacağını anlayabiliriz:

```glsl
mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
```

<div class="codeAndCanvas" data="cross-scale.frag"></div>

Bunun nasıl çalıştığını daha derinden anlamak için aşağıdaki alıştırmaları deneyin.

* Uzay koordinatının ölçeklendiğini görmek için yukarıdaki kodun 42. satırının yorumunu kaldırın.

* Ölçeklemeden önceki ve sonraki ötellemeleri (37 ve 39. satırlar) yorum satırı yaparsanız ne olduğunu görün.

* Bir döndürme matrisini bir ölçekleme matrisiyle birleştirmeyi deneyin. Sıranın önemli olduğuna dikkat edin. Önce matris ile çarpın, sonra vektörleri çarpın.

* Artık farklı şekilleri çizmeyi, taşımayı, döndürmeyi ve ölçeklemeyi bildiğinize göre, güzel bir kompozisyon yapma zamanı. Sahte bir [UI veya HUD (heads up display)](https://www.pinterest.com/patriciogonzv/huds/) tasarlayın ve inşa edin. İlham ve referans için [Ndel](https://www.shadertoy.com/user/ndel) tarafından yapılan aşağıdaki ShaderToy örneğini kullanın.

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/4s2SRt?gui=true&t=10&paused=true" allowfullscreen></iframe>

### Matrisler için diğer kullanımlar: YUV renk

[YUV](http://en.wikipedia.org/wiki/YUV), fotoğraf ve videoların analog kodlaması için kullanılan ve krominans bileşenlerinin bant genişliğini azaltmak için insan algısının aralığını dikkate alan bir renk uzayıdır.

Aşağıdaki kod, renkleri bir moddan diğerine dönüştürmek için GLSL'de matris işlemlerini kullanmanın ilginç bir fırsatıdır.

<div class="codeAndCanvas" data="yuv.frag"></div>

Gördüğünüz gibi, renkleri matrislerle çarparak vektörler olarak ele alıyoruz. Bu şekilde değerleri "hareket ettiriyoruz".

Bu bölümde vektörleri taşımak, döndürmek ve ölçeklemek için matris dönüşümlerini nasıl kullanacağımızı öğrendik. Bu dönüşümler, önceki bölümde öğrendiğimiz şekillerden kompozisyonlar yapmak için gerekli olacaktır. Bir sonraki bölümde öğrendiğimiz her şeyi güzel prosedürel desenler yapmak için uygulayacağız. Tekrarlama ve çeşitleme kodlamanın heyecan verici bir pratik olabileceğini göreceksiniz.

#### Araç kutunuz için

* [LYGIA'nın uzay fonksiyonları](https://lygia.xyz/space), GLSL'de uzayı manipüle etmek için yeniden kullanılabilir fonksiyonlar kümesidir. Matrisleri uzayı manipüle etmek için nasıl kullanacağınızı öğrenmek için harika bir kaynaktır. Yeniden kullanılabilirlik, performans ve esneklik için tasarlanmış çok ayrıntılı bir kütüphanedir. Ve herhangi bir projeye ve framework'e kolayca eklenebilir.
