# مقدمه

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

عکس های بالا بطور گوناگون ساخته شده اند. مورد اول توسط ون گوگ با استفاده از لایه های رنگ ساخته شده . ساعت ها وقتش را گرفته. تصویر دومی در عرض ثانیه ای با ترکیب چهار ماتریس تولید شده: یکی برای فیروزه ای دیگری سرخابی، دیگری زرد و در آخر سیاه . تفاومت اصلی این است که تصویر دومی به صورت همزمان(غیر سریالی) تولید می‌شود (یعنی مرحله به مرحله نیست و همه در یک زمان تولید می‌شود).

این کتاب در مورد روش محاسباتی *fragment shaders* است که انقلابی بر پا کرد. این روش تولید تصاویر دیجیتالی را به سطح دیگری برد. می‌توان آن را مانند پرس گوتنبرگ برای گرافیک تصور کرد. 

![Gutenberg's press](gutenpress.jpg)

شیدر های فرگمنت به شما امکان کنترل سریع پیکسل ها را ارائه می‌دهند. به همین دلیل آن ها در موارد مختلف و زیادی استفاده می‌شوند از فیلتر های ویدئویی  تلفن های هوشنمد تا بازی های سه بعدی جذاب. 

![Journey by That Game Company](journey.jpg)

در فصل های بعد خواهید فهمید این تکنیک فوق العاده سریع و قدرمتند را چگونه می‌توانید در کار های حرفه ای و شخصی خود استفاده کنید.

## این کتاب برای چه کسانی است؟

این کتاب برای کد نویسان خلاق، توسعه دهنده های بازی و کسانی که با برنامه نویسی آشنا هستند و و دانش اولیه از جبر خطی و مثلثات دارند مناسب است, و کسانی که میخواهند سطح کار خود را یک مرحله از نظر گرافیکی و هیجان انگیز بودن بالا بببرند. (اگر می‌خواهید کد نویسی یاد بگیرید, پیشنهاد می‌کنم با [Processing](https://processing.org/) شروع کنید و وقتی با کار کردن با آن اشنا شدید، برگردید)

 این کتاب به شما نحوه استفاده و ادغام شیدر ها در پروژه ها را  یاد می‌دهد. چون GLSL (OpenGL Shading Language) روی پلتفرم های مختلفی اجرا می‌شوند, هرآنچه در اینجا یاد بگیرید رو هر محیطی که از OpenGl استفاده می‌کند می‌توانید اجرا کنید . به عبارت دیگر, با استفاده از دانش خود می‌توانید از محیط های مقابل استفاده کنید: [Processing](https://processing.org/) sketches, [openFrameworks](http://openframeworks.cc/) applications, [Cinder](http://libcinder.org/) interactive installations, [Three.js](http://threejs.org/) websites یا iOS/Android games.

## این کتاب چه چیز هایی را پوشش می‌دهد؟

این کتاب روی شیدر های پیکسلی GLSL تمرکز دارد. در مرحله اول شیدر را تعریف می‌کنیم; بعد یاد می‌گیریم چگونه شیدر های مولد(procedural) بسازیم, همچنین الگو ها تکستچر ها و انیمیشن آن ها. شما اصول شیدر را یاد خواهید گرفت و آن را در سناریو های زیر می‌توانید استفاده کنید: پردازش تصویر (عملیات تصویری، پیچیدگی های ماتریس، بلور، فیلتر های رنگی، جداول جستجو و غیره) و شبیه سازی (بازی زندگی, واکنش انتشار  Gray-Scott, موج آب, افکت های آبرنگی, سلول های Voronoi , و غیره.). در اواخر کتاب مجموعه ای از تکنیک های پیشرفته مبتنی بر Ray Marching را مشاهده خواهیم کرد.

*هر قسمت شامل مثال های تعاملی نیز هست که می‌توانید با آن ها کار کنید* وقتی کد را عوض کنید، تغییرات را بلافاصله مشاهده می‌کنید. مفاهیم شیدر گاهی انتزاعی و گیج کننده هستند، بنابراین این مثال های تعاملی برای کمک به شما بسیار مفید و ضروری هستند. هرچه سریعتر مفاهیم را اجرا کنید، فرایند یادگیری بهتر خواهد بود.

این کتاب شامل چه چیز هایی نمی‌شود:

* این یک کتاب در مورد OpenGl یا WebGl نیست، این دو مباحث وسیع تری نسبت به شیدر ها هستند. برای یادگیری بیشتر آن دو پیشنهادم این است:  [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (also known as the red book) or [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl)

* این یک کتاب ریاضی هم نیست. اگرچه تعدادی از تکنیک ها و الگوریتم ها مبتنی بر جبر و مثلثات را پوشش خواهیم داد, خیلی وارد جزئیات آنان نمی‌شویم. برای سوالات در زمینه ریاضیات توصیه می‌کنم کتاب زیر را در نظر بگیرید: [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) or [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## برای شروع به چه چیز هایی احتیاج دارید؟

چیز خاصی نیست فقط یک مرورگر مدرن و دسترسی به اینترنت, روی کلید قسمت بعد بزن تا شروع کنیم.

همینطور می‌توانید:

- [ساخت نسخه آفلاین ازین کتاب](https://thebookofshaders.com/appendix/00/)

- [اجرای مثال ها روی رزبری پای بدون مرورگر](https://thebookofshaders.com/appendix/01/)

- [ساخت پی دی اف از این کتاب](https://thebookofshaders.com/appendix/02/)

- [سر زدن به مخزن گیت هاب](https://github.com/patriciogonzalezvivo/thebookofshaders) 
