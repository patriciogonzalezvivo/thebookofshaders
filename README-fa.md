<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*by [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) and [Jen Lowe](http://jenlowe.net/)*

این یک راهنمای گام به گام برای ورود به دنیای انتزاعی و پیچیده فرگمنت شیدر هاست.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## فهرست

* [درباره این کتاب](00/)

* شروع
    * [شیدر چیست؟](01/)
    * [“Hello world!”](02/)
    * [یونیفرم ها](03/)
	* [اجرا کردن شیدر](04/)

* رسم الگوریتمی
    * [توابع شکلی](05/)
    * [رنگ ها](06/)
    * [شکل ها](07/)
    * [ماتریس ها](08/)
    * [الگو ها](09/)

* طراحی مولد
    * [رندوم](10/)
    * [نویز](11/)
    * [نویز سلولی](12/)
    * [حرکت براونی کسری](13/)
    * فراکتال

* پردازش تصویر
    * تکستچر ها
    * عملیات تصویری
    * پیچیدگی های هسته
    * فیلتر ها
    * دیگر افکت ها

* شبیه سازی
    * پینگ پنگ
    * Conway
    * موج دار
    * رنگ آب
    * انتشار واکنش

* گرافیک 3 بعدی
    * نور ها
    * نرمال مپ ها
    * بامپ مپ ها
    * Ray marching
    * مپ های محیطی
    * انعکاس و شکست

* [ضمیمه:](appendix/) راه های دیگر استفاده ازین کتاب
	* [چگونه بصورت آفلاین از این کتاب استفاده کنم؟](appendix/00/)
	* [چگونه روی رزبری پای مثال ها را اجرا کنم؟](appendix/01/)
	* [چگونه این کتاب را چاپ کنم؟](appendix/02/)
    * [چگونه مشارکت کنم؟](appendix/03/)
    * [مقدمه ای برای کسانی که از جاوا اسکریپت آمده اند.](appendix/04/) توسط [Nicolas Barradeau](http://www.barradeau.com/)

* [گالری مثال ها](examples/)

* [واژه نامه](glossary/)

## درباره نویسندگان

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentina) یک آرتیست و توسعه دهنده اهل نیویورک است. او فضا های بینابینی را جستجو می‌کند، بین ارگانیک و مصنوعی، بین آنالوگ و دیجیتال، بین فردی و اجتماعی. او از کد بعنوان یک زبان رسا برای توسعه بهتر در کار خود استفاده می‌کند.

او دانش آموخته روان درمانی و expressive art therapy است. همچنین دارای مدرک MFA در زمینه طراحی و فناوری از Parsons The new School هست و اکنون در آنجا تدریس می‌کند. هم اکنون بعنوان مهندس گرافیک در Mapzen مشغول ساخت ابزار نقشه برداری open Source هست. 

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) یک دانشمند و ارتباط دهنده داده مستقل در Datatelling است. جایی که افراد و اعداد و حروف را کنار هم جمع می‌کند. او همچنین طراحی SVA تدریس می‌کند، و هم بنیانگذار دانشکده محاسبات شاعرانه است. همچنین در SXSW و Eyeo سخنران است. کار های او توسط نیویورک تایمز و Fast Company پوشش داده شده است. تحقیق، نوشتار و گفتار او پیامد های داده و فناوری در جامعه را کاوش می‌کند. او دارای مدرک B.S در ریاضیات کاربردی و کارشناسی ارشد در علوم اطلاعات است. اغلب مخالف است و همیشه در کنار عشق.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## سپاس گذاری ها

ممنون از [Scott Murray](http://alignedleft.com/) برای الهام و مشاوره.

ممنون از [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/) برای کمک و پشتیبانی، همچنین ایده ها و کد خوب.

ممنون از [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) and [Sawako](https://twitter.com/sawakohome) برای [Japanese   (日本語訳)](?lan=jp)

ممنون از [Tong Li](https://www.facebook.com/tong.lee.9484) و [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) برای  [Chinese translation (中文版)](?lan=ch)

ممنون از [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) برای  Korean [translation (한국어)](?lan=kr)

ممنون از Nahuel Coppero (Necsoft) برای Spanish [translation (español)](?lan=es)

ممنون از [Raphaela Protásio](https://github.com/Rawphs) و [Lucas Mendonça](https://github.com/luuchowl) برای Portuguese [translation (portugues)](?lan=pt)

ممنون از [Nicolas Barradeau](https://twitter.com/nicoptere) و [Karim Naaji](http://karim.naaji.fr/) برای  French [translation (français)](?lan=fr)

ممنون از [Andrea Rovescalli](https://www.earove.info) برای  Italian [translation (italiano)](?lan=it)

ممنون از [Michael Tischer](http://www.mitinet.de) برای  German [translation (deutsch)](?lan=de)

ممنون از [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3) برای Russian [translation (russian)](?lan=ru)

ممنون از [Manoylov Andriy](https://twitter.com/ManoylovAC) برای Ukrainian [translation (українська)](?lan=ua)

ممنون از [Andy Stanton](https://andy.stanton.is/) برای اصلاح و بهبود [the pdf/epub export pipeline](https://thebookofshaders.com/appendix/02/)

ممنون از همه کسانی که به این پروژه ایمان داشتند و[در اصلاحات مشارکت کردند](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) و یا اهدا کردند.

## قسمت های جدید را دریافت کنید

برای اخبار و اطلاعات جدید ثبت نام کنید یا [در توییتر فالو کنید](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
