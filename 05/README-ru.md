# Алгоритмическое рисование
## Формообразующие функции

Эта глава могла бы называться «Урок с забором от мистера Мияги». Ранее мы отобразили нормализованные координаты *x* и *y* в красный и зелёный цветовые каналы. По сути, мы сделали функцию, которая принимает двумерный вектор (x и y) и возвращает четырёхмерный вектор (r, g, b и а). Но прежде чем мы погрузимся глубже в трансформацию данных между измерениями, не помешает начать с более простых вещей. То есть с понимания способов конструирования одномерных функций. Чем больше времени и энергии вы потратите на освоение этого материала, тем сильнее будет ваше шейдерное карате.

![Парень-каратист (1984)](mr_miyagi.jpg)

Следующий код будет нашим забором. В нём мы визуализируем нормированное значение координаты *x* (`st.x`) двумя способами: с помощью яркости (обратите внимание на градиент от чёрного к белому) и путём построения зелёной линии поверх (в этом случае значение *x* записывается напрямую в *y*). Вы можете пока не вникать в функцию построения графика. Она будет детально рассмотрена далее.

<div class="codeAndCanvas" data="linear.frag"></div>

**На заметку**: Конструктор типа `vec3` «понимает», что вы хотите присвоить одно и то же значение всем трём каналам, а `vec4` понимает, что четырёхмерный вектор нужно собрать из трёхмерного вектора и одного числа. Это число в данном случае отвечает за альфа канал, или прозрачность. Примеры этого поведения вы можете видеть в строках 19 и 25.

Этот код - это ваш забор; важно видеть и понимать его. Вы раз за разом будете возвращаться в пространство между *0.0* и *1.0*. Вы изучите искусство смешивания и формирования линий.

Такое отображение один-в-один между *x* и *y* (или яркостью) называется *линейной интерполяцией*. Начиная с этого момента, мы можем использовать математические функции для придания *формы* линии. Например, мы можем возвести *x* в пятую степень, чтобы получить *кривую* линию.

<div class="codeAndCanvas" data="expo.frag"></div>

Интересно, правда? Попробуйте различные степени в 22 строке, например 20.0, 2.0, 1.0, 0.0, 0.2 и 0.02. Понимание соотношения между числом и его степенью будет очень полезным. Использование математических функций такого типа даст вам мощное выразительное средство, позволяющее тонко управлять потоком значений.

[`pow()`](../glossary/?search=pow) - одна из многих встроенных функций языка GLSL. Большинство из них ускорены на аппаратном уровне, а значит при их правильном и осмотрительном использовании ваш код станет быстрее.

Замените функцию степени в строке 22 на какую-нибудь другую. Попробуйте [`exp()`](../glossary/?search=exp), [`log()`](../glossary/?search=log) и [`sqrt()`](../glossary/?search=sqrt). Некоторые из этих функций более интересны при использовании числа Пи. В восьмой строке я определил макрос, заменяющий любое упоминание `PI` на `3.14159265359`.

### Step и Smoothstep

В GLSL так же есть несколько уникальных функций интерполяции с аппаратным ускорением.

Функция [`step()`](../glossary/?search=step) (ступенька) принимает два параметра. Первый параметр задаёт значение порога, а второй - точку, в которой мы хотим вычислить функцию. В любой точке до порога функция возвращает `0.0`, а в любой точке после него - `1.0`.

Попробуйте изменить значение порога в 20 строке в следующем коде.

<div class="codeAndCanvas" data="step.frag"></div>

Ещё одна уникальная функция называется [`smoothstep()`](../glossary/?search=smoothstep) (гладкая ступенька). Эта функция гладко интерполирует аргумент в интервале между двумя заданными числами. Первые два параметра задают начало и конец переходного интервала, а третий - точку, в которой нужно интерполировать.

<div class="codeAndCanvas" data="smoothstep.frag"></div>

В строке 12 приведённого выше кода мы используем smoothstep для рисования зелёной линии в функции `plot()`. Для каждой точки вдоль оси *x* эта функция делает *всплеск* при нужно значении *y*. Как? Через соединение двух [`smoothstep()`](../glossary/?search=smoothstep). Рассмотрите следующую функцию, вставьте её вместо строки 20 в коде выше и вообразите, что это вертикальный разрез. Фон выглядит как линия, не так ли?

```glsl
float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
```

### Синус и косинус

Синус и косинус - ваши лучшие друзья, когда вы используете математику для анимации, построения фигур или смешивания значений.

Эти две базовые тригонометрические функции при построении кругов удобны, как швейцарский армейский нож, и обычно они используются в паре. Очень важно знать как они себя ведут и какими способами могут быть скомбинированны. Вкратце, они принимают угол в радианах и возвращают координаты *x* ([косинус](../glossary/?search=cos)) и *y* ([синус](../glossary/?search=sin)) точки на окружности единичного радиуса. Тот факт, что они возвращают нормализованные значения (между -1 и 1) и при этом являются достаточно гладкими, делает их незаменимым инструментом.

![](sincos.gif)

Описать все взаимоотношения между кругами и тригонометрическими функциями довольно трудно, но анимация выше отлично их демонстрирует.

<div class="simpleFunction" data="y = sin(x);"></div>

Внимательно присмотритесь к этой синусоидальной волне. Обратите внимание на плавное изменение значения *y* между -1 и 1. Как мы видели в примере со временем в предыдущем параграфе, это ритмичное поведение синуса [`sin()`](../glossary/?search=sin) можно использовать в анимациях. Если вы читаете этот пример в браузере, вы можете поизменять формулу выше и пронаблюдать как изменяется волна. Не забывайте ставить точку с запятой в конце строки.

Попробуйте проделать следующие действия и посмотрите что происходит:

* Прибавьте время (`u_time`) к *x* перед вычислением синуса. Вы увидите *движение* вдоль *x*.

* Домножьте *x* на Пи перед вычислением синуса. Обратите внимание на сужение графика, так что теперь волна повторяется каждые два отсчёта по горизонтальной оси.

* Умножьте `u_time` на *x* перед вычислением синуса. Вы увидите, как *частота* волн увеличивается со временем. Возможно, `u_time` к этому времени будет слишком большой, что затруднит восприятие графика.

* Прибавьте 1.0 к [`sin(x)`](../glossary/?search=sin). Вся волна *сдвинется* вверх и займёт область значений от 0.0 до 2.0.

* Умножьте [`sin(x)`](../glossary/?search=sin) на 2.0. *Амплитуда* увеличится вдвое.

* Вычислите абсолютное значение синуса с помощью [`abs()`](../glossary/?search=abs). График станет похожим на траекторию подпрыгивающего мячика.

* Возьмите дробную часть от [`sin(x)`](../glossary/?search=sin) с помощью [`fract()`](../glossary/?search=fract).

* Сложите результаты вычисления синуса, округлённые до целого в большую ([`ceil()`](../glossary/?search=ceil)) и в меньшую ([`floor()`](../glossary/?search=floor)) стороны. Получится «цифровой» прямоугольный сигнал со значениями 1 и -1.

### Другие полезные функции

В конце предыдущего упражнения мы затронули несколько новых функций. Теперь давайте поэкспериментируем. Попробуйте раскомментировать строки в коде ниже по одной. Запомните эти функции и изучите их поведение. Возможно, вы спросите, зачем это нужно? Быстрый поиск в google по запросу «generative art» даст ответ. Помните, что пока мы осваиваем перемещение в одном измерении, вверх и вниз. Но скоро мы перейдём к двум, трём и даже четырём измерениям!

![Anthony Mattox (2009)](anthony-mattox-ribbon.jpg)

<div class="simpleFunction" data="y = mod(x,0.5); // x по модулю 0.5
//y = fract(x); // возвращает дробную часть аргумента
//y = ceil(x);  // ближайшее целое, большее либо равное x
//y = floor(x); // ближайшее целое, меньшее либо равное x
//y = sign(x);  // знак x
//y = abs(x);   // абсолютное значение x
//y = clamp(x,0.0,1.0); // ограничение x промежутком от 0.0 до 1.0
//y = min(0.0,x);   // меньшее из x и 0.0
//y = max(0.0,x);   // большее из x и 0.0 "></div>

### Продвинутые функции

[Голан Левин](http://www.flong.com/) написал отличный учебник по более сложным функциям, которые могут понадобиться. Начните собирать вашу собственную библиотеку полезных кусочков кода с портирования этих функций на GLSL.

* Полиномиальные функции: [www.flong.com/archive/texts/code/shapers_poly](http://www.flong.com/archive/texts/code/shapers_poly/)

* Экспоненциальные функции: [www.flong.com/archive/texts/code/shapers_exp](http://www.flong.com/archive/texts/code/shapers_exp/)

* Круги и эллипсы: [www.flong.com/archive/texts/code/shapers_circ](http://www.flong.com/archive/texts/code/shapers_circ/)

* Сплайны Безье и другие параметрические функции: [www.flong.com/archive/texts/code/shapers_bez](http://www.flong.com/archive/texts/code/shapers_bez/)

<div class="glslGallery" data="160414041542,160414041933,160414041756" data-properties="clickRun:editor,hoverPreview:false"></div>

Подобно поварам, собирающим специи и экзотические ингридиенты, цифровые художники уделяют особое внимание работе над своими собственными формообразующими функциями.

[Иниго Квилес](http://www.iquilezles.org/) собрал хорошую коллекцию [полезных функций](http://www.iquilezles.org/www/articles/functions/functions.htm). После прочтения [статьи](http://www.iquilezles.org/www/articles/functions/functions.htm) посмотрите на реализацию этих функций на GLSL. Обратите внимание на незначительность потребовавшихся изменений. Например, пришлось использовать точку в числах с плавающей точкой и заменить функций из *C* на их GLSL-аналоги: `pow()` вместо `powf()` и т.п.

<div class="glslGallery" data="05/impulse,05/cubicpulse,05/expo,05/expstep,05/parabola,05/pcurve" data-properties="clickRun:editor,hoverPreview:false"></div>

Для поддержания вашего вдохновения, посмотрите на элегантный пример использования одномерных функций, написанный автором [Danguafer](https://www.shadertoy.com/user/Danguafer) на ShaderToy.

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/XsXXDn?gui=true&t=10&paused=true" allowfullscreen></iframe>

В следующей главе мы сделаем ещё один шаг. Сначала мы посмешиваем цвета, а затем перейдём к рисованию фигур.

#### Упражнение

Рассмотрите таблицу с формулами, созданную автором [Kynd](http://www.kynd.info/log/). Он комбинирует функции и их свойства, чтобы контролировать значения между 0.0 и 1.0. Попробуйте воспроизвести эти функции самостоятельно. Помните, что чем больше вы тренируетесь, тем сильнее станет ваше карате.

![Kynd - www.flickr.com/photos/kynd/9546075099/ (2013)](kynd.png)

#### Инструментарий

Здесь собраны ссылки на инструменты, которые упростят визуализацию одномерных функций.

* [GraphToy](http://www.iquilezles.org/apps/graphtoy/): уже знакомый нам [Иниго Квилес](http://www.iquilezles.org) написал инструмент для визуализации GLSL-функций в WebGL.

![Иниго Квилес - GraphToy (2010)](graphtoy.png)

* [LYGIA Shader Library](https://lygia.xyz/) a shader library of reusable functions that can be include easily on your projects. It's very granular, designed for reusability, performance and flexibility. And can be easily be added to any projects and frameworks.

