<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*[Патрицио Гонзалес Виво](http://patriciogonzalezvivo.com/) и [Джен Лав](http://jenlowe.net/)*

Пошаговое руководство по абстрактной и сложной вселенной фрагментных шейдеров.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Содержание

* [Об этой книге](00/?lan=ru)

* Введение
    * [Что такое шейдер?](01/?lan=ru)
    * [“Hello world!”](02/?lan=ru)
    * [Uniform-переменные](03/?lan=ru)
    * [Запуск шейдера](04/?lan=ru)

* Алгоритмическое рисование
    * [Формообразующие функции](05/?lan=ru)
    * [Цвета](06/?lan=ru)
    * [Фигуры](07/?lan=ru)
    * [Матрицы](08/?lan=ru)
    * [Узоры](09/?lan=ru)

* Генеративный дизайн
    * [Беспорядок](10/?lan=ru)
    * [Шум](11/?lan=ru)
    * [Клеточный шум](12/?lan=ru)
    * [Фрактальное броуновское движение](13/?lan=ru)
    * Фракталы

* Обработка изображений
    * Текстуры
    * Операции над изображениями
    * Свёртка с ядром
    * Фильтры
    * Другие эффекты

* Симуляция
    * Пинг-понг
    * Игра «Жизнь» Конвея
    * Рябь
    * Вода
    * Реакционно-диффузная модель

* 3D-графика
    * Освещение
    * Карты нормалей
    * Карты высот
    * Ray marching
    * Карты окружения (сферические и кубические)
    * Отражение и преломление

* [Приложение:](appendix/?lan=ru) Другие варианты использования этой книги
    * [Как читать книгу оффлайн?](appendix/00/?lan=ru)
    * [Как запустить примеры на Raspberry Pi?](appendix/01/?lan=ru)
    * [Как напечатать книгу?](appendix/02/?lan=ru)
    * [Как принять участие в создании книги?](appendix/03/?lan=ru)
    * [Введение для JavaScript-программистов](appendix/04/?lan=ru) ([Николя Баррадо](http://www.barradeau.com/))

* [Примеры](examples/?lan=ru)

* [Глоссарий](glossary/)

## Об авторах

[Патрицио Гонзалес Виво](http://patriciogonzalezvivo.com/) (1982, Буэнос Айрес, Аргентина) - художник и разработчик, живущий в Нью-Йорке. Он исследует многообразие пространств между природным и рукотворным, аналоговым и цифровым, индивидуальным и коллективным. В своей работе он использует код как средство выразительности, делая этот мир лучше.

Патрицио изучал и практиковал психотерапию и арт-терапию. Он получил степень магистра наук и искусств в области дизайна и технологии в Parsons The New School, где в настоящее время преподаёт. Сейчас он работает инженером по графике в Mapzen, где создаёт картографический инструментарий с открытым исходным кодом.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">Сайт</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Джен Лав](http://jenlowe.net/) собирает воедино людей, числа и слова, работая независимым исследователем данных в Datatelling. Она преподаёт в Нью-Йоркской школе изобразительного искусства по программе социальных инноваций, является соучредителем Школы поэтических коммуникаций, преподавала математику для художников в NYU ITP, занималась исследованиями в Лаборатории пространственного дизайна в Университете Колумбии, вносила предложения в офис Белого дома по науке и технологиям. Выступала на SXSW и Eyeo. Её работы освещались в The New York Times и Fast Company. Её исследования, публикации и доклады затрагивают перспективы и последствия развития технологий обработки данных для общества. Имеет степень бакалавра в области прикладной математики и степень магистра в области информатики.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">Сайт</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Благодарности

Спасибо [Скотту Мюррею](http://alignedleft.com/) за вдохновение и советы.

Спасибо [Кеничи Йонеде (Kynd)](https://twitter.com/kyndinfo), [Николя Баррадо](https://twitter.com/nicoptere) и [Кариму Нааджи](http://karim.naaji.fr/) за поддержку, хорошие идеи и код.

Спасибо [Кеничи Йонеде (Kynd)](https://twitter.com/kyndinfo) и [Савако](https://twitter.com/sawakohome) за [японский перевод (日本語訳)](?lan=jp)

Спасибо [Тонь Ли](https://www.facebook.com/tong.lee.9484) и [И Жань](https://www.facebook.com/archer.zetta?pnref=story) за [китайский перевод (中文版)](?lan=ch)

Спасибо [Ча Хьюн Ю](https://www.facebook.com/fkkcloud) за [корейский перевод (한국어)](?lan=kr)

Спасибо [Науэлю Копперо (Necsoft)](http://hinecsoft.com/) за [испанский перевод (español)](?lan=es)

Спасибо [Николя Баррадо](https://twitter.com/nicoptere) и [Кариму Нааджи](http://karim.naaji.fr/) за [французский перевод (français)](?lan=fr)

Спасибо [Андреа Ровескалли](https://www.earove.info) за [итальянский перевод (italiano)](?lan=it)

Спасибо [Майклу Тишеру](http://www.mitinet.de) за [немецкий перевод (deutsch)](?lan=de)

Спасибо [Сергею Карчевскому](https://www.facebook.com/sergey.karchevsky.3) за [русский перевод](?lan=ru)

Спасибо [Андрею Манойлову](https://twitter.com/ManoylovAC) за [украинский перевод](?lan=ua)

Спасибо всем кто поверил в этот проект и поддержал его [исправлениями](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) или пожертвованиями.

## Новые параграфы

Чтобы получать оповещение о новых параграфах, подпишитесь на почтовую рассылку или [Твиттер](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
