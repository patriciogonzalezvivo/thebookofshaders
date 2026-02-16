<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) ve [Jen Lowe](http://jenlowe.net/) tarafından*

Bu, Fragment Shader'ların soyut ve karmaşık evrenine adım adım, nazik bir rehberdir.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## İçindekiler

* [Bu kitap hakkında](00/?lan=tr)

* Başlarken
    * [Shader nedir?](01/?lan=tr)
    * [“Merhaba dünya!”](02/?lan=tr)
    * [Uniform'lar](03/?lan=tr)
	* [Shader'ınızı çalıştırma](04/?lan=tr)

* Algoritmik çizim
    * [Şekillendirme fonksiyonları](05/?lan=tr)
    * [Renkler](06/?lan=tr)
    * [Şekiller](07/?lan=tr)
    * [Matrisler](08/?lan=tr)
    * [Desenler](09/?lan=tr)

* Üretken tasarımlar
    * [Rastgelelik (Random)](10/?lan=tr)
    * [Gürültü (Noise)](11/?lan=tr)
    * [Hücresel gürültü](12/?lan=tr)
    * [Fraktal Brownian hareketi](13/?lan=tr)
    * Fraktallar

* Görüntü işleme
    * Dokular (Textures)
    * Görüntü işlemleri
    * Kernel konvolüsyonları
    * Filtreler
    * Diğer efektler

* Simülasyon
    * Pingpong
    * Conway
    * Dalgalanmalar
    * Suluboya
    * Reaksiyon difüzyonu

* 3D grafikler
    * Işıklar
    * Normal haritaları
    * Kabartma haritaları (Bump-maps)
    * Işın yürütme (Ray marching)
    * Çevresel haritalar (küresel ve küp)
    * Yansıma ve kırılma

* [Ek:](appendix/?lan=tr) Bu kitabı kullanmanın diğer yolları
	* [Bu kitapta çevrimdışı nasıl gezinebilirim?](appendix/00/?lan=tr)
	* [Örnekleri bir Raspberry Pi üzerinde nasıl çalıştırırım?](appendix/01/?lan=tr)
	* [Bu kitabı nasıl yazdırırım?](appendix/02/?lan=tr)
    * [Nasıl katkıda bulunabilirim?](appendix/03/?lan=tr)
    * [JS'den gelenler için bir giriş](appendix/04/?lan=tr) - [Nicolas Barradeau](http://www.barradeau.com/) tarafından

* [Örnekler Galerisi](examples/)

* [Sözlük](glossary/)

## Yazarlar Hakkında

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Arjantin), New York merkezli bir sanatçı ve geliştiricidir. Organik ve sentetik, analog ve dijital, bireysel ve kolektif arasındaki ara alanları keşfeder. Çalışmalarında kodu, birlikte daha iyi bir gelecek geliştirme niyetiyle etkileyici bir dil olarak kullanır.

Patricio psikoterapi ve dışavurumcu sanat terapisi okumuş ve uygulamıştır. Parsons The New School'dan Tasarım ve Teknoloji alanında yüksek lisans derecesine sahiptir ve şu anda orada ders vermektedir. Halen Mapzen'de açık kaynak haritalama araçları yapan bir Grafik Mühendisi olarak çalışmaktadır.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">Web Sitesi</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/), insanları + sayıları + kelimeleri bir araya getirdiği Datatelling'de bağımsız bir veri bilimcisi ve veri iletişimcisidir. SVA'nın Sosyal İnovasyon için Tasarım programında ders vermekte, School for Poetic Computation'ın kurucu ortaklığını yapmış, NYU ITP'de Sanatçılar için Matematik dersi vermiş, Columbia Üniversitesi'ndeki Uzamsal Bilgi Tasarım Laboratuvarı'nda araştırmalar yapmış ve Beyaz Saray Bilim ve Teknoloji Politikası Ofisi'nde fikirlere katkıda bulunmuştur. SXSW ve Eyeo'da konuşmalar yapmıştır. Çalışmaları The New York Times ve Fast Company tarafından ele alınmıştır. Araştırmaları, yazıları ve konuşmaları verinin ve teknolojinin toplumdaki vaatlerini ve etkilerini araştırmaktadır. Uygulamalı Matematik alanında lisans ve Bilgi Bilimi alanında yüksek lisans derecesine sahiptir. Genellikle muhalif olsa da, her zaman sevgiden yanadır.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">Web Sitesi</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Teşekkürler

İlham ve tavsiyeler için [Scott Murray](http://alignedleft.com/)'ye teşekkürler.

Destekleri, iyi fikirleri ve kod katkıları için [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/)'ye teşekkürler.

[Japonca çeviri (日本語訳)](?lan=jp) için [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) ve [Sawako](https://twitter.com/sawakohome)'ya teşekkürler.

[Çince çeviri (中文版)](?lan=ch) için [Tong Li](https://www.facebook.com/tong.lee.9484) ve [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story)'a teşekkürler.

Korece [çeviri (한국어)](?lan=kr) için [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) ve [June Kim](https://github.com/rlawns324)'e teşekkürler.

İspanyolca [çeviri (español)](?lan=es) için Nahuel Coppero (Necsoft)'ya teşekkürler.

Portekizce [çeviri (portugues)](?lan=pt) için [Raphaela Protásio](https://github.com/Rawphs) ve [Lucas Mendonça](https://github.com/luuchowl)'ya teşekkürler.

Fransızca [çeviri (français)](?lan=fr) için [Nicolas Barradeau](https://twitter.com/nicoptere) ve [Karim Naaji](http://karim.naaji.fr/)'ye teşekkürler.

İtalyanca [çeviri (italiano)](?lan=it) için [Andrea Rovescalli](https://www.earove.info)'ye teşekkürler.

Almanca [çeviri (deutsch)](?lan=de) için [Michael Tischer](http://www.mitinet.de)'e teşekkürler.

Rusça [çeviri (russian)](?lan=ru) için [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3)'ye teşekkürler.

Vietnamca [çeviri (Tiếng Việt)](?lan=vi) için [Vu Phuong Hoang](https://www.facebook.com/vuphuonghoang88)'a teşekkürler.

Lehçe [çeviri (polski)](?lan=pl) için [Wojciech Pachowiak](https://github.com/WojtekPachowiak)'a teşekkürler.

Ukraynaca [çeviri (український переклад)](?lan=ua) için [Manoylov Andriy](https://twitter.com/ManoylovAC)'ye teşekkürler.

Türkçe [çeviri (Türkçe)](?lan=tr) için [Batuhan Dev](https://batudev.framer.website/portfolio)'e teşekkürler.

[PDF/epub dışa aktarma hattını](https://thebookofshaders.com/appendix/02/?lan=tr) düzelttiği ve geliştirdiği için [Andy Stanton](https://andy.stanton.is/)'a teşekkürler.

Bu projeye inanan ve [düzeltmelerle](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) veya bağışlarla katkıda bulunan herkese teşekkürler.

## Yeni bölümleri alın

Haber bültenine kaydolun veya [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) üzerinden takip edin.

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>

## LİSANS

Telif Hakkı (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
Tüm hakları saklıdır.
