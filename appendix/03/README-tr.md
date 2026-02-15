## Bu kitaba nasıl katkıda bulunabilirim?

Katkıda bulunmaya istekli olduğunuz için teşekkürler! Birçok yol var:

- İçerik çevirisi
- [```glossary/``` bölümünü](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary) iyileştirme
- İçerik düzenleme
- Shader örneklerinizi [çevrimiçi editör](http://editor.thebookofshaders.com/) aracılığıyla paylaşma

### İçerik çevirisi

Bu kitap [Markdown dilinde](https://daringfireball.net/projects/markdown/syntax) yazılmıştır, bu yüzden düzenlemesi ve üzerinde çalışması çok kolaydır.

1. [```github.com/patriciogonzalezvivo/thebookofshaders``` adresindeki GitHub deposuna](https://github.com/patriciogonzalezvivo/thebookofshaders) giderek başlayın. İçindeki dosya ve klasörlere göz atın. İçeriğin ```README.md``` ve ```TITLE.md```, ```SUMMARY.md``` gibi büyük harfli diğer dosyalarda olduğunu göreceksiniz. Ayrıca çevirilerin, hedef dile referans veren iki harfle biten dosya adlarında barındırıldığını not edin, örn: ```README-jp.md```, ```README-es.md```, vb.

2. Depoyu forklayın ve bilgisayarınıza klonlayın.

3. Çevirmek istediğiniz dosyaların içeriğini çoğaltın. Çevirdiğiniz dile referans veren iki harfi üzerinde çalışacağınız dosyalara eklemeyi unutmayın.

4. İçeriği satır satır çevirin (bkz. **Çeviri notları**).

5. Test edin (bkz. **Test etme**).

6. Kendi GitHub fork'unuza push edin ve ardından bir [Pull Request](https://help.github.com/articles/using-pull-requests/) yapın

#### Çeviri notları

Şöyle görünen gömülü örnekleri silmeyin veya değiştirmeyin:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

veya

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Test etme

Yerel depo klasörünün içinde yerel bir PHP sunucusu çalıştırmaya başlayın:

```bash
php -S localhost:8000
```

Ardından tarayıcınızda ```localhost:8000``` arayın, çevirdiğiniz bölüme gidin ve ```?lan=``` ardından çevirdiğiniz dili işaretlemek için kullandığınız iki harfi ekleyin.

Örneğin, ```03``` bölümünü Fransızca'ya çeviriyorsanız ```03/README-fr.md``` dosyasıyla çalışmış olacaksınız ve şu adrese giderek test edebilirsiniz: ```http://localhost:8000/03/?lan=fr```

### Sözlük bölümünü iyileştirme

Bu bölüm geliştirme aşamasındadır. Onu herkes için kullanıcı dostu bir araç yapma hakkındaki fikirlerinizi duymaktan mutluluk duyarız. Bize [@bookofshaders](https://twitter.com/bookofshaders) adresinden mesaj gönderin.

### İçerik düzenleme

Hepimiz insanız. Bir şey görürseniz bir şey söyleyin ve bir Pull Request yapın veya bir sorun açın. Teşekkürler!

### Shader örneklerinizi paylaşma

[Çevrimiçi editöre](http://editor.thebookofshaders.com/) ve gömülü örneklerine birçok bağlantı göreceksiniz.
Sizi gururlandıran bir şey kodladığınızda, "Dışa Aktar" (veya ```⇪``` simgesi) düğmesine tıklayın ve ardından "Koda URL..."yi kopyalayın. [@bookofshaders](https://twitter.com/bookofshaders) veya [@kyndinfo](https://twitter.com/kyndinfo) adresine gönderin. Görmeyi ve [örnek galeri bölümüne](https://thebookofshaders.com/examples/) eklemeyi dört gözle bekliyoruz.
