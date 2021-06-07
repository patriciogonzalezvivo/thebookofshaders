![Alice Hubbard, Providence, United States, ca. 1892. Photo: Zindman/Freemont.](froebel.jpg)

## 도형

드디어! 우리는 이 순간을 위해 기술을 쌓아왔다! 대부분의 GLSL 기초이론, 자료형 및 함수들을 배웠다. 다양항 쉐이핑 함수들을 반복해서 연습했다. 
이제 이 모든 것을 종합해야 할 때 이므로 도전해보아라!  
이 챕터에서는 간단한 도형을 병렬/절차적 방식으로 그리는 방법에 대해 알아볼 것이다.

### 직사각형

우리에게 정사각형을 그리는 숙제가 주어졌고, 수학수업에서 사용했던 모눈 종이를 갖고있다고 상상해보자.  
용지 크기는 10x10이고 정사각형은 8x8이어야 한다. 어떻게 할 것인가?  
![](grid_paper.jpg)

첫 번째 행과 마지막 행, 첫 번째 열과 마지막 열을 제외한 모든 것을 칠할 것이다. 그렇지 않은가?  
이것이 쉐이더와 어떤 관계가 있나? 그리드 용지의 각각의 작은 정사각형은 쓰레드(픽셀)이다. 각각의 작은 사각형은 체스판의 좌표처럼 자신의 위치를 알고 있다. 이전 챕터에서는 *x*와 *y*를 *빨간색*과 *녹색* 컬러 채널에 매핑하고 0.0과 1.0 사이의 좁은 2차원 영역을 사용하는 방법을 배웠다. 어떻게 이걸 이용해서 빌보드 중앙에 있는 정사각형을 그릴 수 있는가?

먼저, 전 영역에 걸치는 `if` 문 의사 코드를 작성해보자. 이를 위한 원리는 그리드 페이퍼 시나리오에 대한 우리의 생각과 매우 유사하다.

```glsl
if ( (X GREATER THAN 1) AND (Y GREATER THAN 1) )
    paint white
else
    paint black
```

이제 이 방법이 어떻게 작동하는지 더 잘 이해했으므로, `if` 문을 [`step()`](../glossary/?search=step)으로 바꾸고 10x10을 사용하는 대신 0.0과 1.0 사이의 정규화된 값을 사용해보자:

```glsl
uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Each result will return 1.0 (white) or 0.0 (black).
    float left = step(0.1,st.x);   // Similar to ( X greater than 0.1 )
    float bottom = step(0.1,st.y); // Similar to ( Y greater than 0.1 )

    // The multiplication of left*bottom will be similar to the logical AND.
    color = vec3( left * bottom );

    gl_FragColor = vec4(color,1.0);
}
```

[`step()`](../glossary/?search=step) 함수는 0.1 미만의 모든 픽셀을 검은색(`vec3(0.0)`)으로, 나머지 픽셀을 흰색(`vec3(1.0`)으로 바꾼다.  
`left`와 `bottom`의 곱셈은 논리 `AND` 연산으로 작동하며, 둘 다 1.0이어야 1.0을 반환한다.  
이렇게 하면 캔버스의 아래쪽과 왼쪽에 두 개의 검은색 선이 그려지게 된다.

![](rect-01.jpg)

위 코드에서는 각 축(왼쪽 및 아래쪽)이 서로 중복되는 부분이 있다.  
다음과 같이 두 개의 값을 [`step()`](../glossary/?search=step)으로 직접 한번에 전달함으로써 더 짧은 코드를 작성할 수 있다. 그 코드는 다음과 같다.  
 
```glsl
vec2 borders = step(vec2(0.1),st);
float pct = borders.x * borders.y;
```

지금까지, 직사각형의 두 테두리(왼쪽 아래)만 그렸다. 나머지 두 개(오른쪽 위)를 그려보자. 다음 코드를 확인해보아라.

<div class="codeAndCanvas" data="rect-making.frag"></div>

*21-22 번째 줄*의 주석을 제거하고, `st` 좌표를 반전시켜 동일한 [`step()`](../glossary/?search=step) 함수를 반복하는 방법을 확인해보아라.  
이렇게 하면 `vec2(0.0, 0.0)`가 오른쪽 상단 모서리에 있게 된다.  
이것은 페이지를 넘기고 이전 절차를 반복하는 것과 동일한 디지털 방법이다.

![](rect-02.jpg)

`18,22 번째 줄`에서 모든 면이 함께 곱된다는 점에 유의하시오. 이는 다음과 같다.

```glsl
vec2 bl = step(vec2(0.1),st);       // bottom-left
vec2 tr = step(vec2(0.1),1.0-st);   // top-right
color = vec3(bl.x * bl.y * tr.x * tr.y);
```

흥미롭지 않은가? 이 기법은 [`step()`](.../glossary/?)과 곱셈을 사용하여 논리 연산을 수행하고 좌표를 뒤집는 기술이다.

계속하기 전에 다음 연습을 해보아라.  

* 사각형의 크기 및 비율을 변경해보시오.

* 동일한 코드로 실험하되 [`step()`](../glossary/?search=step) 대신 [`smoothstep()`](../glossary/?search=smoothstep)를 사용해보시오.  
값을 변경함으로써 흐릿한 가장자리에서 우아하고 부드러운 경계선으로 바뀔 것 이다.

* [`floor()`](../glossary/?search=floor)를 사용해서 동일하게 구현해보시오.

* 가장 마음에 드는 구현체를 향후 재사용할 수 있도록 함수로 만드시오.  
  함수를 유연하고 효율적으로 설계하시오.
  
* 직사각형의 외곽선만 그리는 다른 함수를 만들어보시오.

* 어떻게 같은 평면에 다른 직사각형을 배치하고 움직일 수 있다고 생각하는가?  
그 방법을 알게 된다면, [Piet Mondrian](http://en.wikipedia.org/wiki/Piet_Mondrian) 그림을 닮은 직사각형과 색을 구성하여 실력을 뽐내보시오.

![Piet Mondrian - Tableau (1921)](mondrian.jpg)

### 원

격자 종이에 정사각형을 그리는것과 데카르트 좌표 위에 직사각형을 그리는 것은 쉽지만, 원은 "픽셀 단위" 알고리즘이 필요하기 때문에 다른 접근법이 필요히다.  
한 가지 방법은, 공간 좌표를 *다시 매핑*하고 [`step()`](../glossary/?search=step) 함수를 사용하여 원을 그릴 수 있다.

어떻게? 먼저, 수학 시간의 격자 종이를 다시 떠올리며 컴퍼스를 원하는 반지름만큼 열고 간단한 회전으로 원의 가장자리를 추적하여 그려보자.

![](compass.jpg)

이 상황을 쉐이더로 해석해보면, 그리드 용지의 각 네모칸은 픽셀이고, 이는 각 픽셀(또는 쓰레드)이 원의 영역 내에 있는지 *묻는 것*을 의미한다. 각 픽셀에서 원의 중심까지의 거리를 계산함으로써 이를 계산할 수 있다.

![](circle.jpg)

거리를 계산하는 방법에는 여러 가지가 있는데, 가장 쉬운 방법은 두 점(이 경우는 픽셀좌표들과 캔버스의 중심)의 차이의 [`length()`](../glossary/?search=length)를 내부적으로 계산하는 [`distance()`](../glossary/?search=distance) 함수를 사용하는 것이다.  
[`length()`](../glossary/?search=length) 함수는 특별한것은 없고, 내부적으로 제곱근([`sqrt()`](../glossary/?search=sqrt))을 사용하는 빗변 방정식일 뿐이다.

![](hypotenuse.png)

[`distance()`](../glossary/?search=distance), [`length()`](../glossary/?search=length) 또는 [`sqrt()`](../glossary/?search=sqrt)를 사용하여 평면의 중앙까지의 거리를 계산할 수 있다.  
아래 코드는 이 세 가지 함수가 정확히 동일한 결과를 반환한다는 당연한 사실을 포함하고 있다.

* 주석을 설정/해제 해보면서 동일한 결과를 얻기 위한 다양한 방법을 시도해 보시오

<div class="codeAndCanvas" data="circle-making.frag"></div>

위 예제는 중앙까지의 거리를 픽셀의 색 밝기에 대입한다. 픽셀이 중앙에 가까울수록 어두워진다.  
중심(`vec2(0.5, 0.5)`)에서 최대 거리가 0.5를 거의 넘지 않기 때문에 값이 너무 높아지지 않는다.  
이 예제를 깊게 고민해 보시오.

* 무엇을 추론할 수 있는가?

* 이걸 이용해서 어떻게 원을 그릴 수 있는가?

* 전체 원형 그라데이션이 나타나도록 위 코드를 수정해보시오.

### 거리장

위의 예를 경사도라고 생각해보면, 어두운 것은 더 높은것을 의미한다.
경사도는 원뿔에 의해 만들어진 패턴과 비슷하다는것을 보여준다.
여러분이 그 원뿔의 꼭대기에 있다고 상상해 보아라. 원뿔 가장자리까지의 수평 거리는 0.5 다. 이는 모든 방향에서 일정할 것이다.
어디를 "자를지"에 따라 더 크거나 더 작은 원형 표면을 얻을 수 있다.

![](distance-field.jpg)

기본적으로 우리는 모양을 만들기 위해 공간(중앙까지의 거리 기준)을 재해석 한다.
이 기술은 "거리장"으로 알려져 있으며 폰트외곽선부터 3D 그래픽에 이르기까지 다양한 방식으로 응용된다.
 
다음 예제들을 시도해보시오:

* [`step()`](../glossary/?search=step) 를 사용하여 0.5 이상은 흰색으로, 미만은 0.0으로 만들어보시오.
  
* 후경과 전경의 색을 반전시켜 보시오.

* [`smoothstep()`](../glossary/?search=smoothstep) 를 사용하여 여러분의 원에 멋지고 부드러운 경계를 만들어보시오.
  
* 구현이 만족스러우면, 나중에 재사용할 수 있도록 함수로 만들어보아라.

* 원에 색을 추가해 보시오.

* 뛰는 심장처럼, 원이 확대/축소하는 애니메이션을 만들 수 있는가?(앞 장의 애니메이션 부분으로부터 영감을 얻을 수 있을 것이다.)

* 이 원을 움직이려면 어떻게 해야되나? 한 평면에 이 원을 움직이고 다른 원들을 추가로 배치할 수 있는가?
  
* 다른 함수 및 연산과 거리장을 조합해보면 어떻게 되나?

```glsl
pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
```

* 위 기술을 사용하여 세 가지 구성을 만들어보아라. 애니메이션까지 된다면, 훨씬 더 좋을 것이다.

#### 도구상자

연산량 측면에서 제곱근([`sqrt()`](../glossary/?search=sqrt)) 함수와 이에 의존하는 모든 함수는 비용이 많이 들 수 있다. 다음은 내적([`dot()`](../glossary/?search=dot))을 사용하여 거리장을 만드는 또 다른 방법이다.

<div class="codeAndCanvas" data="circle.frag"></div>

### 거리장의 유용한 속성

![Zen garden](zen-garden.jpg)

거리장은 거의 모든 것을 그리는 데 사용될 수 있다. 당연히 더 복잡한 형태일수록 방정식도 복잡해질것이지만, 일단 특정한 모양의 거리장을 만드는 공식을 갖게 되면, 매끄러운 가장자리나 다중 윤곽선과 같은 효과들과 조합하거나 응용할 수 있을 것이다. 그것들에 결합하거나 효과를 적용하기가 매우 쉽다. 이 때문에 다음 사례들에서 알 수 있듯, 거리장은 글꼴 렌더링에 널리 사용된다.  
[Mapbox GL Labels](https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817), [Matt DesLauriers](https://twitter.com/mattdesl), [Material Design Fonts](http://mattdesl.svbtle.com/material-design-on-the-gpu), [O'Reilly - iPhone 3D Programming 7장의 일부](http://chimera.labs.oreilly.com/books/1234000001814/ch07.html#ch07_id36000921). 

다음 코드를 살펴 보십시오.

<div class="codeAndCanvas" data="rect-df.frag"></div>

위치값을 -1과 1 사이의 값으로 재배치하기 위해 좌표계를 중심으로 이동하고   반으로 축소한다. 또한 *24번째 줄*에서는 거리장이 만드는 패턴을 쉽게 보기위해 [`fract()`](.../glossary/?search=https)함수를 이용하여 거리장 값을 시각화한다. 거리장 패턴은 마치 젠가든의 고리처럼 계속해서 반복된다.

*19번째 줄*의 거리장 공식을 살펴보자. 여기서 모든 4개의 사분면 안에 있는 `(.3,.3)` 또는 `vec3(.3)` 까지의 거리를 계산하고 있다(바로 그게 [`abs()`](../glossary/?search=abs)가 하는일이다).

*20번재 줄*의 주석을 해제하면 [`min()`](../glossary/?search=min)을 사용하여 이 네 지점까지의 거리를 0으로 결합하는 것을 알 수 있다. 
그 결과는 흥미롭고 새로운 패턴을 만들어낸다.

이제 *21번째 줄*을 주석 해제 해보아라. 동일한 작업을 수행하지만 [`max()`](../glossary/?search=max) 함수를 사용한다. 그 결과는 모서리가 둥근 직사각형이다. 거리장의 고리가 중심에서 멀어질수록 어떻게 매끄러워지는지 확인해보아라.

거리장 패턴의 다양한 용도를 이해하기 위해 *27~29번째 줄*의 주석을 차례로 해제해보며 마친다.

### 극 도형

![Robert Mangold - Untitled (2008)](mangold.jpg)

색에 관한 장에서는 다음 공식을 사용하여 각 픽셀의 *반지름* 과 *각도*를 계산하여 데카르트 좌표를 극좌표에 매핑하는것을 배웠다.

```glsl
vec2 pos = vec2(0.5)-st;
float r = length(pos)*2.0;
float a = atan(pos.y,pos.x);
```
이 장의 시작부분에서, 이 공식의 일부를 사용하여 원을 그린다. [`length()`](../glossary/?search=length)를 사용하여 중심까지의 거리를 계산했다. 이제는  거리장에 대해 알았으니, 극좌표를 이용하여 도형을 그리는 또 다른 방법을 배울 수 있다.

이 기법은 약간 제한적이지만 매우 간단하다. 이것은 여러가지 도형을 얻기 위해 각도에 따라 원의 반지름을 바꾸는 것으로 구성되어 있다. 어떻게 조절하는가? 그렇다, 쉐이핑 함수를 사용하는 것이다!

아래 예시에 데카르트 그래프와 극좌표 쉐이더 예제(*21~25번째 줄 사이*)에서 동일한 함수가 보일것이다. 한 좌표계와 다른 좌표계 사이의 관계에 유의하면서 함수를 하나씩 주석 처리해보자.

<div class="simpleFunction" data="y = cos(x*3.);
//y = abs(cos(x*3.));$$
//y = abs(cos(x*2.5))*0.5+0.3;
//y = abs(cos(x*12.)*sin(x*3.))*.8+.1;
//y = smoothstep(-.5,1., cos(x*10.))*0.2+0.5;"></div>

<div class="codeAndCanvas" data="polar.frag"></div>

시도해 볼것:

* 이 도형들을 움직여봐라.
* 다양한 쉐이핑 함수를 조합하여 *구멍을 뚫고*, 꽃,눈송이,기어를 만들어 보아라.
* *쉐이핑 함수 장*에서 사용하던 `plot()` 함수를 사용하여 윤곽선만 그려보아라.

### Combining powers

이제 다양한 도형을 그리기 위해 [`atan()`](../glossary/?search=atan)을 사용하여 각도에 따라 원의 반지름을 계산하는 방법을 배웠으므로, 거리장에서 `atan()`을 사용하는 방법을 배울 수 있고, 거리장에서 가능한 모든 트릭과 효과를 적용할 수 있다.

이 트릭은 폴리곤의 모서리의 갯수를 사용하여 사용하여 극좌표 거리장을 구성한다.
[Andrew Baldwin](https://twitter.com/baldand) 의 [예제 코드](http://thndl.com/square-shaped-shaders.html) 를 확인해 보아라.

<div class="codeAndCanvas" data="shapes.frag"></div>

* 이 예제를 사용하여 원하는 도형의 모서리 위치와 갯수를 입력하고 거리장을 반환하는 함수를 만들어보자.
  
* [`min()`](../glossary/?search=min), [`max()`](../glossary/?search=max) 함수를 사용하여 거리장들을 조합해보자.

* 거리장을 사용하여 복제해볼 만한 기하학적인 로고를 골라보자.

축하드린다! 여러분은 힘든 부분을 잘 헤쳐왔다! 잠시 쉬면서 이러한 개념들을 정착시켜라 - Processing에서 간단한 도형을 그리는 것은 쉽지만 여기서는 그렇지 않다. 쉐이더-랜드에서의 도형그리기는 복잡하고, 새로운 패러다임의 코딩에 적응하는것은 약간 지칠 수도 있다.

이 장의 끝부분에는 [PixelSpirit Deck](https://patriciogonzalezvivo.github.io/PixelSpiritDeck/)에 대한 링크가 소개 돼있다. 이 자료는 새로운 SDF 기능을 학습하고 여러분만의 디자인으로 구성하고 쉐이더를 사용하는데에 도움이 될 것이다. 이 자료에는 점진적인 학습 곡선이 있기 때문에, 하루 한 장의 카드를 공부한다면 여러분의 스킬은 도전을 통해 몇 달 동안 발전할 것이다. 

이제 도형을 그릴 줄 알았으니 새로운 아이디어가 떠오를 거라고 확신한다. 다음 장에서는 도형을 이동, 회전 및 축소하는 방법에 대해 알아 볼 것이다. 그럼 또 새로운 구성을 할 수 있게 될 것이다!