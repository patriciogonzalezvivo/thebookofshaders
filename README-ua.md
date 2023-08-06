<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*автори: [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) і [Jen Lowe](http://jenlowe.net/)*

Легкий покроковий провідник через абстрактний і складний всесвіт фрагментних шейдерів.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Зміст

* [Про книгу](00/?lan=ua)

* Вступ
    * [Що таке шейдер?](01/?lan=ua)
    * [“Hello world!”](02/?lan=ua)
    * [Uniforms](03/?lan=ua)
    * [Запуск шейдера](04/?lan=ua)

* Алгоритмічне малювання
    * [Формотворчі функції](05/?lan=ua)
    * [Кольори](06/?lan=ua)
    * [Фігури](07/?lan=ua)
    * [Матриці](08/?lan=ua)
    * [Патерни](09/?lan=ua)

* Генеративний дизайн
    * [Випадковість](10/?lan=ua)
    * [Шум](11/?lan=ua)
    * [Клітинний шум](12/?lan=ua)
    * [Фрактальний броунівський рух](13/?lan=ua)
    * Фрактали

* Обробка зображень
    * Текстури
    * Операції із зображеннями
    * Згортка ядра
    * Фільтри
    * Інші ефекти

* Симуляції
    * Пінг-понг
    * Conway
    * Брижі води
    * Акварель
    * Реакційно-дифузійна система

* 3D-графіка
    * Освітлення
    * Карти нормалей
    * Карти висот
    * Ray marching
    * Карти оточення (сферичні та кубічні)
    * Відображення та заломлення

* [Додаток:](appendix/?lan=ua) Інші способи використання цієї книги
    * [Як можна переглядати книгу офлайн?](appendix/00/?lan=ua)
    * [Як запустити приклади на Raspberry Pi?](appendix/01/?lan=ua)
    * [Як надрукувати книгу?](appendix/02/?lan=ua)
    * [Як прийняти участь у розвитку книги?](appendix/03/?lan=ua)
    * [Вступ для тих, хто прийшов із JS](appendix/04/?lan=ua) від [Nicolas Barradeau](http://www.barradeau.com/)

* [Галерея прикладів](examples/?lan=ua)

* [Глосарій](glossary/?lan=ua)

## Про авторів

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Буенос-Айрес, Аргентина) — митець і розробник із Нью-Йорка. Досліджує інтерстиціальний простір між органічним і синтетичним, аналоговим і цифровим, індивідуальним і колективним. У своїй роботі він використовує код як виразну мову з метою створення кращого разом.

Патрісіо вивчав і практикував психотерапію та арттерапію. Він здобув ступінь магістра мистецтва в галузі дизайну та технологій у Parsons The New School, де зараз і викладає. Наразі він працює як графічний інженер в компанії Mapzen, розробляючи open-source інструменти для картографування.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) - незалежна наукова фахівчиня у галузі обробки та передачі даних в компанії Datatelling, де вона поєднує людей, числа та слова. Вона викладає у SVA Design для програми соціальних інновацій, співзасновниця School for Poetic Computation, викладала математику для художників в NYU ITP, проводила дослідження в Лабораторії просторового інформаційного дизайну у Колумбійському університеті та допомагала з ідеями в Білому домі стосовно управління науки та технологічної політики. Вона виступала на конференціях SXSW та Eyeo. Її роботи висвітлювалися в The New York Times та Fast Company.  У своїх дослідженнях, публікаціях та виступах вона досліджує перспективи та наслідки використання даних і технологій у суспільстві. Має ступінь бакалавра з прикладної математики та магістра інформаційних наук. Часто займаючи опозиційну позицію, вона завжди на боці любові.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Подяки

Дякую [Scott Murray](http://alignedleft.com/) за натхнення та поради.

Дякую [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/) за підтримку, гарні ідеї та код.

Дякую [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) і [Sawako](https://twitter.com/sawakohome) за [японський переклад (日本語訳)](?lan=jp)

Дякую [Tong Li](https://www.facebook.com/tong.lee.9484) і [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) за [китайський переклад (中文版)](?lan=ch)

Дякую [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) і [June Kim](https://github.com/rlawns324) за [корейський переклад (한국어)](?lan=kr)

Дякую Nahuel Coppero (Necsoft) за [іспанський переклад (español)](?lan=es)

Дякую [Raphaela Protásio](https://github.com/Rawphs) і [Lucas Mendonça](https://github.com/luuchowl) за [португальський переклад (portugues)](?lan=pt)

Дякую [Nicolas Barradeau](https://twitter.com/nicoptere) і [Karim Naaji](http://karim.naaji.fr/) за [французький переклад (français)](?lan=fr)

Дякую [Andrea Rovescalli](https://www.earove.info) за [італійський переклад (italiano)](?lan=it)

Дякую [Michael Tischer](http://www.mitinet.de) за [німецький переклад (deutsch)](?lan=de)

Дякую [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3) за [російський переклад](?lan=ru)

Дякую [Vu Phuong Hoang](https://www.facebook.com/vuphuonghoang88) за [в'єтнамський переклад (Tiếng Việt)](?lan=vi)

Дякую [Wojciech Pachowiak](https://github.com/WojtekPachowiak) за [польський переклад (polski)](?lan=pl)

Дякую [Манойлову Андрію](https://twitter.com/ManoylovAC) за [український переклад](?lan=ua)

Дякую [Andy Stanton](https://andy.stanton.is/) за виправлення та вдосконалення [the pdf/epub export pipeline](https://thebookofshaders.com/appendix/02/?lan=ua)

Дякую всім, хто повірив у цей проект і [підтримував його виправленнями](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) або пожертвуваннями.

## Нові розділи

Для оповіщення про нові розділи, підпишіться на поштову розсилку або на [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone)

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>

## LICENSE

Copyright (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
All rights reserved.
