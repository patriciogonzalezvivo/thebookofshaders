# Başlarken
## Fragment shader nedir?

Önceki bölümde shader'ları, grafikler için Gutenberg matbaasının eşdeğeri olarak tanımlamıştık. Neden? Ve daha da önemlisi: shader nedir?

![Harf harf, Sağ: William Blades (1891). Sayfa sayfa, Sol: Rolt-Wheeler (1920).](print.png)

Bilgisayarla çizim yapma konusunda zaten deneyiminiz varsa, bu süreçte istediğiniz görüntüyü oluşturana kadar bir daire, sonra bir dikdörtgen, bir çizgi, bazı üçgenler çizdiğinizi bilirsiniz. Bu süreç, elle mektup veya kitap yazmaya çok benzer - birbiri ardına tek bir görevi yerine getiren talimatlar kümesidir.

Shader'lar da bir talimatlar kümesidir, ancak talimatlar ekrandaki her bir piksel için aynı anda yürütülür. Bu, yazdığınız kodun pikselin ekrandaki konumuna bağlı olarak farklı davranması gerektiği anlamına gelir. Bir matbaa baskısı gibi, programınız bir konum alan ve bir renk döndüren bir fonksiyon olarak çalışacak ve derlendiğinde olağanüstü hızlı çalışacaktır.

![Çin hareketli matbaası](typepress.jpg)

## Shader'lar neden hızlıdır?

Bunu cevaplamak için size *paralel işlemenin* mucizelerini sunuyorum.

Bilgisayarınızın CPU'sunu büyük bir endüstriyel boru ve her görevi de içinden geçen bir şey olarak hayal edin - bir fabrika hattı gibi. Bazı görevler diğerlerinden daha büyüktür, bu da onlarla başa çıkmak için daha fazla zaman ve enerji gerektirdiği anlamına gelir. Daha fazla işlem gücü gerektirdiklerini söyleriz. Bilgisayarların mimarisi nedeniyle işler bir seri halinde çalışmaya zorlanır; her işin teker teker bitirilmesi gerekir. Modern bilgisayarlar genellikle bu borular gibi çalışan dört işlemci grubuna sahiptir ve işlerin sorunsuz yürümesini sağlamak için görevleri birbiri ardına tamamlarlar. Her boru aynı zamanda bir *iş parçacığı* (thread) olarak da bilinir.

![CPU](00.jpeg)

Video oyunları ve diğer grafik uygulamaları, diğer programlardan çok daha fazla işlem gücü gerektirir. Grafik içerikleri nedeniyle çok sayıda piksel bazlı işlem yapmak zorundadırlar. Ekrandaki her bir pikselin hesaplanması gerekir ve 3D oyunlarda geometrilerin ve perspektiflerin de hesaplanması gerekir.

Borular ve görevler metaforumuza geri dönelim. Ekrandaki her piksel basit ve küçük bir görevi temsil eder. Bireysel olarak her piksel görevi CPU için bir sorun değildir, ancak (ve işte sorun burada) bu küçük görevin ekrandaki *her piksel* için yapılması gerekir! Bu, eski bir 800x600 ekranda kare başına 480.000 pikselin işlenmesi gerektiği, yani saniyede 14.400.000 hesaplama anlamına gelir! Evet! Bu, bir mikroişlemciyi aşırı yükleyecek kadar büyük bir sorundur. Saniyede 60 kare hızında çalışan modern bir 2880x1800 retina ekranda bu hesaplama saniyede 311.040.000 hesaplamaya ulaşır. Grafik mühendisleri bu sorunu nasıl çözüyor?

![](03.jpeg)

İşte bu noktada paralel işleme iyi bir çözüm haline gelir. Birkaç büyük ve güçlü mikroişlemciye veya *boruya* sahip olmak yerine, aynı anda paralel çalışan çok sayıda küçük mikroişlemciye sahip olmak daha akıllıcadır. Grafik İşlemci Birimi (GPU) işte budur.

![GPU](04.jpeg)

Küçük mikroişlemcileri bir boru masası ve her pikselin verisini bir ping pong topu olarak hayal edin. Saniyede 14.400.000 ping pong topu neredeyse her boruyu tıkayabilir. Ancak saniyede 480.000 piksellik 30 dalgayı alan 800x600 küçük borudan oluşan bir masa sorunsuz bir şekilde idare edilebilir. Bu, daha yüksek çözünürlüklerde de aynı şekilde çalışır - ne kadar çok paralel donanımınız varsa, o kadar büyük bir akışı yönetebilir.

GPU'nun bir diğer “süper gücü” de donanım üzerinden hızlandırılan özel matematik fonksiyonlarıdır, böylece karmaşık matematik işlemleri yazılım yerine doğrudan mikroçipler tarafından çözülür. Bu, ekstra hızlı trigonometrik ve matris işlemleri anlamına gelir - elektriğin gidebileceği kadar hızlı.

## GLSL nedir?

GLSL, OpenGL Shading Language (OpenGL Gölgelendirme Dili) anlamına gelir ve sonraki bölümlerde göreceğiniz shader programlarının özel standardıdır. Donanım ve İşletim Sistemlerine bağlı olarak başka shader türleri de vardır. Burada [Khronos Group](https://www.khronos.org/opengl/) tarafından düzenlenen OpenGL spesifikasyonlarıyla çalışacağız. OpenGL'in tarihini anlamak, garip kurallarının çoğunu anlamak için yararlı olabilir, bunun için şuna bir göz atmanızı öneririm: [openglbook.com/chapter-0-preface-what-is-opengl.html](http://openglbook.com/chapter-0-preface-what-is-opengl.html)

## Shader'lar neden meşhur derecede acı vericidir?

Ben Amca'nın dediği gibi “büyük güç büyük sorumluluk getirir” ve paralel hesaplama da bu kurala uyar; GPU'nun güçlü mimari tasarımı kendi kısıtlamaları ve sınırlamalarıyla birlikte gelir.

Paralel çalışabilmek için her borunun veya iş parçacığının diğer tüm iş parçacıklarından bağımsız olması gerekir. İş parçacıklarının diğer iş parçacıklarının ne yaptığına *kör* olduğunu söyleriz. Bu kısıtlama, tüm verilerin aynı yönde akması gerektiği anlamına gelir. Bu nedenle başka bir iş parçacığının sonucunu kontrol etmek, girdi verilerini değiştirmek veya bir iş parçacığının sonucunu başka bir iş parçacığına aktarmak imkansızdır. İş parçacıklarının birbirleriyle iletişim kurmasına izin vermek verilerin bütünlüğünü riske atar.

Ayrıca GPU, paralel mikro işlemcileri (boruları) sürekli meşgul tutar; serbest kalır kalmaz işlemek için yeni bilgiler alırlar. Bir iş parçacığının bir önceki anda ne yaptığını bilmesi imkansızdır. İşletim sisteminin arayüzünden bir düğme çiziyor, sonra bir oyunda gökyüzünün bir bölümünü oluşturuyor, sonra bir e-postanın metnini görüntülüyor olabilir. Her iş parçacığı sadece **kör** değil, aynı zamanda **hafızasızdır**. Konumuna bağlı olarak sonucu piksel piksel değiştiren genel bir fonksiyon kodlamak için gereken soyutlamanın yanı sıra, kör ve hafızasız kısıtlamalar shader'ları başlangıç seviyesindeki programcılar arasında pek popüler kılmaz.

Endişelenmeyin! Sonraki bölümlerde, basit gölgelendirme hesaplamalarından ileri seviye hesaplamalara adım adım nasıl geçileceğini öğreneceğiz. Bunu modern bir tarayıcıyla okuyorsanız, interaktif örneklerle oynamaktan keyif alacaksınız. Öyleyse eğlenceyi daha fazla ertelemeyelim ve koda atlamak için *Sonraki >>* düğmesine basalım!
