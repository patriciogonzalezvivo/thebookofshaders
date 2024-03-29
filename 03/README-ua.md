## Uniforms

Раніше ми побачили, яким чином графічний процесор керує великою кількістю паралельних потоків, кожен з яких відповідає за призначення кольору частці загального зображення. Хоча кожен паралельний потік закритий для інших, ми повинні мати можливість надсилати деякі вхідні дані від CPU до всіх потоків. Через архітектуру відеокарти ці вхідні дані будуть однаковими (*uniform* - *уніфікованими*, *однорідними*) для всіх потоків і доступними *лише для читання*. Іншими словами, кожен потік отримує ті ж самі дані, які він може читати, але не може змінювати.

Ці вхідні дані називаються `uniform` та мають більшість підтримуваних типів: `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D` і `samplerCube `. Uniform-змінні визначаються з відповідним типом у верхній частині шейдера відразу після встановлення точності для float-значень.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Розмір полотна (ширина, висота)
uniform vec2 u_mouse;       // Положення курсору на екрані
uniform float u_time;       // Час у секундах з моменту запуску коду
```

Ви можете уявити uniform-змінні як маленькі містки між CPU та GPU. Назви для змінних можуть відрізнятися від реалізації до реалізації, але в цій серії прикладів я завжди передаю: `u_time` (час у секундах із моменту запуску шейдера), `u_resolution` (розмір зображення де застосовується шейдер) і `u_mouse` (положення курсору всередині зображення, що вимірюється у пікселях). Я дотримуюся конвенції з префіксом `u_` перед назвою uniform-змінних, щоб чітко означити природу таких змінних, але насправді ви можете зустріти різні назви. Наприклад, [ShaderToy.com](https://www.shadertoy.com/) використовує ті ж самі змінні, але з наступними назвами:

```glsl
uniform vec3 iResolution;   // роздільна здатність області зображення, у пікселях (viewport resolution)
uniform vec4 iMouse;        // піксельні координати курсору. xy - поточні, zw - клік
uniform float iTime;        // час роботи шейдера (у секундах)
```

Досить розмов, подивимося на уніформи в дії. У наведеному нижче коді ми використовуємо `u_time` — кількість секунд із моменту запуску шейдера — разом із синус-функцією, щоб анімувати зміни у кількості червоного кольору на екрані.

<div class="codeAndCanvas" data="time.frag"></div>

Як ви бачите, GLSL має ще багато сюрпризів. GPU має апаратне прискорення для кутових, тригонометричних та експоненціальних функцій. Ось деякі з цих функцій: [`sin()`](../glossary/?lan=ua&search=sin), [`cos()`](../glossary/?lan=ua&search=cos), [`tan()`](../glossary/?lan=ua&search=tan), [`asin()`](../glossary/?lan=ua&search=asin), [`acos()`](../glossary/?lan=ua&search=acos), [`atan()`](../glossary/?lan=ua&search=atan), [`pow()`](../glossary/?lan=ua&search=pow), [`exp()`](../glossary/?lan=ua&search=exp), [`log()`](../glossary/?lan=ua&search=log), [`sqrt()`](../glossary/?lan=ua&search=sqrt), [`abs()`](../glossary/?lan=ua&search=abs), [`sign()`](../glossary/?lan=ua&search=sign), [`floor()`](../glossary/?lan=ua&search=floor), [`ceil()`](../glossary/?lan=ua&search=ceil), [`fract()`](../glossary/?lan=ua&search=fract), [`mod()`](../glossary/?lan=ua&search=mod), [`min()`](../glossary/?lan=ua&search=min), [`max()`](../glossary/?search=max) and [`clamp()`](../glossary/?lan=ua&search=clamp).

Настав час знову пограти з наведеним вище кодом.

* Уповільнюйте частоту, щоб зміна кольору стала майже непомітною.

* Пришвидшуйте, поки не побачите один колір без мерехтіння.

* Пограйтеся із RGB-каналами та різними частотами для них, щоб отримати якусь цікаву поведінку.

## gl_FragCoord

Подібно до того як GLSL, за замовчуванням, дає нам вихідні дані `vec4 gl_FragColor`, він також дає нам вхідні дані за замовчуванням, `vec4 gl_FragCoord`, що містять екранні координати *пікселя* або *фрагменту екрана*, з якими працює активний потік. За допомогою `vec4 gl_FragCoord` ми знаємо, де саме працює поточний потік всередині зображення. У цьому випадку ми не називаємо його `uniform`, тому що він буде відрізнятися від потоку до потоку, натомість `gl_FragCoord` називається *varying* (змінливим).

<div class="codeAndCanvas" data="space.frag"></div>

У наведеному вище коді ми *нормалізуємо* координати фрагмента, розділивши їх на роздільну здатність зображення. У результаті цього отримані значення будуть змінюватися у діапазоні від `0.0` до `1.0`, що полегшує зіставлення X і Y значень з ЧЕРВОНИМ і ЗЕЛЕНИМ каналами.

У світі шейдерів ми не маємо зручних інструментів для зневаджування програми, тому інколи доводиться призначати змінним якісь яскраві кольори, щоб за їх допомогою спробувати дістати потрібну інформацію. Ви виявите, що кодування на GLSL іноді дуже схоже на розміщення корабля у пляшку. Це однаково важко, красиво і захопливо.

![](08.png)

Тепер настав час перевірити наше розуміння цього коду.

* Чи можете ви сказати, де знаходиться координата `(0.0, 0.0)` на нашому полотні?

* А як щодо `(1.0, 0.0)`, `(0.0, 1.0)`, `(0.5, 0.5)` і `(1.0, 1.0)`?

* Чи можете ви зрозуміти, як використати змінну `u_mouse`, знаючи, що її значення вказані в пікселях і НЕ нормалізовані? Чи зможете за її допомогою і руху курсору змінювати кольори?

* Чи можете ви вигадати цікавий спосіб для зміни кольорів за допомогою координат `u_time` і `u_mouse`?

Після виконання цих вправ ви можете поставити собі питання: де ще можна спробувати можливості шейдерів. У наступному розділі ми розглянемо, як створити власні шейдерні інструменти у three.js, Processing і openFrameworks.
