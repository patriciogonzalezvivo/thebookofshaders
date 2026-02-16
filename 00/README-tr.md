# Giriş

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Yukarıdaki görüntüler farklı şekillerde oluşturuldu. İlki, Van Gogh'un eliyle katman katman boya uygulayarak yapıldı. Saatlerini aldı. İkincisi ise saniyeler içinde, piksellerden oluşan dört matrisin kombinasyonuyla üretildi: biri camgöbeği (cyan), biri macenta (magenta), biri sarı (yellow) ve biri siyah (black) için. Temel fark, ikinci görüntünün seri olmayan bir şekilde (yani adım adım değil, hepsi aynı anda) üretilmesidir.

Bu kitap, dijital olarak üretilen görüntüleri bir sonraki seviyeye taşıyan devrim niteliğindeki hesaplama tekniği olan *fragment shader*'lar hakkındadır. Bunu grafikler için Gutenberg'in matbaasının eşdeğeri olarak düşünebilirsiniz.

![Gutenberg'in matbaası](gutenpress.jpg)

Fragment shader'lar, ekranda işlenen pikseller üzerinde süper hızlı bir şekilde tam kontrol sağlar. Bu nedenle, cep telefonlarındaki video filtrelerinden inanılmaz 3D video oyunlarına kadar her türlü durumda kullanılırlar.

![That Game Company'den Journey](journey.jpg)

İlerleyen bölümlerde bu tekniğin ne kadar inanılmaz derecede hızlı ve güçlü olduğunu ve bunu profesyonel ve kişisel çalışmalarınıza nasıl uygulayacağınızı keşfedeceksiniz.

## Bu kitap kimin için?

Bu kitap, kodlama deneyimi olan, temel lineer cebir ve trigonometri bilgisine sahip ve çalışmalarını heyecan verici yeni bir grafik kalitesi seviyesine taşımak isteyen yaratıcı kodlayıcılar, oyun geliştiricileri ve mühendisler için yazılmıştır. (Eğer kodlamayı öğrenmek istiyorsanız, [Processing](https://processing.org/) ile başlamanızı ve kendinizi rahat hissettiğinizde daha sonra buraya geri dönmenizi şiddetle tavsiye ederim.)

Bu kitap size shader'ları projelerinize nasıl kullanacağınızı ve entegre edeceğinizi, performanslarını ve grafik kalitelerini nasıl artıracağınızı öğretecektir. GLSL (OpenGL Gölgelendirme Dili) shader'ları çeşitli platformlarda derlenip çalıştığından, burada öğrendiklerinizi OpenGL, OpenGL ES veya WebGL kullanan herhangi bir ortama uygulayabileceksiniz. Başka bir deyişle, bilginizi [Processing](https://processing.org/) eskizleri, [openFrameworks](http://openframeworks.cc/) uygulamaları, [Cinder](http://libcinder.org/) interaktif kurulumları, [Three.js](http://threejs.org/) web siteleri veya iOS/Android oyunları ile uygulayabilir ve kullanabilirsiniz.

## Bu kitap neyi kapsıyor?

Bu kitap GLSL piksel shader'larının kullanımına odaklanacaktır. Önce shader'ların ne olduğunu tanımlayacağız; sonra onlarla prosedürel şekiller, desenler, dokular ve animasyonlar yapmayı öğreneceğiz. Gölgelendirme dilinin temellerini öğrenecek ve bunu daha yararlı senaryolara uygulayacaksınız: görüntü işleme (görüntü operasyonları, matris konvolüsyonları, bulanıklaştırma, renk filtreleri, arama tabloları ve diğer efektler) ve simülasyonlar (Conway'in hayat oyunu, Gray-Scott'ın reaksiyon-difüzyonu, su dalgalanmaları, suluboya efektleri, Voronoi hücreleri, vb.). Kitabın sonuna doğru Ray Marching'e dayalı bir dizi ileri teknik göreceğiz.

*Her bölümde oynamanız için interaktif örnekler bulunmaktadır.* Kodu değiştirdiğinizde, değişiklikleri hemen göreceksiniz. Kavramlar soyut ve kafa karıştırıcı olabilir, bu nedenle interaktif örnekler materyali öğrenmenize yardımcı olmak için çok önemlidir. Kavramları ne kadar hızlı harekete geçirirseniz öğrenme süreci o kadar kolay olacaktır.

Bu kitabın kapsamadığı konular:

* Bu bir OpenGL veya webGL kitabı *değildir*. OpenGL/webGL, GLSL veya fragment shader'lardan daha büyük bir konudur. OpenGL/webGL hakkında daha fazla bilgi edinmek için şunlara göz atmanızı öneririm: [OpenGL Introduction](https://open.gl/introduction), [OpenGL Programming Guide'ın 8. baskısı](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (kırmızı kitap olarak da bilinir) veya [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* Bu bir matematik kitabı *değildir*. Cebir ve trigonometri anlayışına dayanan bir dizi algoritma ve tekniği ele alacak olsak da, bunları ayrıntılı olarak açıklamayacağız. Matematik ile ilgili sorularınız için şu kitaplardan birini yakınınızda bulundurmanızı öneririm: [Mathematics for 3D Game Programming and Computer Graphics 3. Baskı](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) veya [Essential Mathematics for Games and Interactive Applications 2. Baskı](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## Başlamak için neye ihtiyacınız var?

Fazla bir şeye değil! WebGL yapabilen modern bir tarayıcınız (Chrome, Firefox veya Safari gibi) ve bir internet bağlantınız varsa, başlamak için bu sayfanın sonundaki “Sonraki” Bölüm düğmesine tıklayın.

Alternatif olarak, sahip olduklarınıza veya bu kitaptan neye ihtiyacınız olduğuna bağlı olarak şunları yapabilirsiniz:

- [Bu kitabın çevrimdışı bir sürümünü yapın](https://thebookofshaders.com/appendix/00/?lan=tr)

- [Örnekleri tarayıcı olmadan bir Raspberry Pi üzerinde çalıştırın](https://thebookofshaders.com/appendix/01/?lan=tr)

- [Kitabın yazdırılabilir bir PDF'ini oluşturun](https://thebookofshaders.com/appendix/02/?lan=tr)

- Sorunları çözmeye yardımcı olmak ve kod paylaşmak için bu kitabın [GitHub deposunu](https://github.com/patriciogonzalezvivo/thebookofshaders) kontrol edin.
