## Örnekleri Raspberry Pi'da nasıl çalıştırırım?

Birkaç yıl önce, herkesin grafik işlem birimine sahip bir bilgisayarı olduğunu varsaymak çok iddialıydı. Artık çoğu bilgisayarın GPU'su var, ama yine de bir atölye veya sınıf için yüksek bir gereksinim.

[Raspberry Pi Vakfı](http://www.raspberrypi.org/) sayesinde yeni nesil küçük ve ucuz bilgisayarlar (her biri yaklaşık 35$) sınıflara girmiştir. Bu kitabın amaçları açısından daha da önemli olarak, [Raspberry Pi](http://www.raspberrypi.org/) konsoldan doğrudan erişilebilen düzgün bir Broadcom GPU ile birlikte gelir. Bu kitaptaki tüm örnekleri çalıştıran [**glslViewer** adlı esnek bir GLSL canlı kodlama aracı](https://github.com/patriciogonzalezvivo/glslViewer) yaptım. Bu program ayrıca kullanıcı kodunda bir değişiklik kaydettiğinde otomatik olarak güncelleme yapabilir. Bu ne anlama geliyor? Shader'ı düzenleyebilirsiniz ve her kaydettiğinizde shader yeniden derlenecek ve sizin için render edilecektir.

Bu kitabın deposunun yerel bir kopyasını yaparak (yukarıdaki bölüme bakın) ve [`glslViewer` yükleyerek](https://github.com/patriciogonzalezvivo/glslViewer), kullanıcılar örnekleri `glslviewer` ile çalıştırabilir. `-l` bayrağını kullanarak, örneği herhangi bir metin editörüyle (`nano`, `pico`, `vi`, `vim` veya `emacs` gibi) değiştirirken ekranın bir köşesinde render edebilirler. Bu, kullanıcı ssh/sftp üzerinden bağlıysa da çalışır.

Raspberry Pi'da [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) yükledikten ve giriş yaptıktan sonra tüm bunları kurmak ve ayarlamak için aşağıdaki komutları yazın:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git-core glslviewer
cd ~
git clone https://github.com/patriciogonzalezvivo/thebookofshaders.git
cd thebookofshaders
```
