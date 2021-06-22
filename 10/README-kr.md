# 제너러티브 디자인

많은 반복과 질서가 있고 난 후에 작가는 약간의 혼란을 느낄 수 밖에 없다.

## 랜덤

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

랜덤은 엔트로피의 최대 표현이다. 어떻게 하면 예측 가능하고 엄격한 코드 환경 내에서 무작위성을 생성할 수 있을까?

먼저, 다음 함수를 분석해보자:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

위 함수는 사인파의 소수점이하를 추출하고 있다. `-1.0` 에서 `1.0` 사잇값을 갖는 [`sin()`](../glossary/?search=sin)의 소수점이하를 자르면 `0.0` 에서 `1.0` 사이의 양의 값이 반환된다. 이 현상을 이용하여 이 사인파를 더 작은 조각으로 "분할"함으로써 의사난수를 얻을 수 있다. 어떻게? [`sin(x)`](../glossary/?search=sin)의 결과에 더 큰 숫자를 곱한다. 위에 있는 함수를 클릭하고 0을 추가해보아라.

`100000.0`에 도달할 때 쯤이면(식은 다음과 같을 것:`y = fract(sin(x)*100000.0)`), 사인파를 더 이상 구분할 수 없게된다. 사인파의 흐름이 부분 부분 세분화로 인해 혼돈의 카오스가 되어버렸다.

## 카오스 제어

랜덤을 사용하는것은 어려울 수 있다 - 지나치게 혼란스럽거나, 충분히 무작위적이지 않을 수 있기 때문이다. 다음 그래프를 보아라. 이를 위해 위에서 설명한 대로 정확히 구현된 `rand()`함수를 사용하고 있다.

자세히 보면 `-1.5707` 및 `1.5707`에서 [`sin()`](../glossary/?search=sin)파의 마루를 볼 수 있다.  
이제 이해했을 것이다 - 그곳이 바로 사인파의 최대와 최소가 발생하는 곳 이다.

랜덤 분포를 자세히 살펴보면, 가장자리에 비해 중간주위가 더 집중되어 있다는 것을 알 수 있다. 

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

얼마 전 [Pixelero](https://pixelero.wordpress.com)는 [랜덤 분포에 대한 흥미로운 글](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)을 출판했다. 이전 그래프에서 그가 사용하는 기능 중 일부를 추가해 여러분이 가지고 놀 수 있도록 했고, 분포가 어떻게 바뀔 수 있는지 알아보도록 했다. 함수의 주석을 해제해보며 어떻게 되는지 확인해보아라.

[Pixelero's article](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)를 읽어보면, `rand()`함수는, 결정론적 난수(의사난수라고도 알려진)임을 강조한다. 즉, 예를 들어 `rand(1.)`는 항상 동일한 값을 반환한다. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/)는 모든 호출에 다른 값을 반환하는 비결정론적인 ActionScript 함수 `Math.random()`을 참고한다.

## 2차원 랜덤

이제 무작위성을 더 잘 이해했으니 `x`축과 `y`축 모두에 2차원으로 적용해야 할 때이다. 그러기 위해서는 2차원 벡터를 1차원 부동 소수점 값으로 변환하는 방법이 필요하다. 다양한 방법이 존재하지만, 이 경우 [`dot()`](../glossary/?search=dot) 함수가 특히 도움이 된다. 두 벡터의 정렬에 따라 `0.0`에서 `1.0` 사이의 단일 부동 소수점 값을 반환한다.

<div class="codeAndCanvas" data="2d-random.frag"></div>

13~15번째 줄을 보면서 `vec2 st`를 또 다른 2차원 벡터(`vec2(12.9898,78.233`)와 어떻게 비교하고 있는지 알아보자.

* 14행과 15행의 값을 변경해 보시오. 무작위 패턴이 어떻게 변하는지 보고 여기서 무엇을 배울 수 있는지 생각해 보시오.

* 이 랜덤 함수를 마우스 상호 작용(`u_mouse`)과 시간(`u_time`)에 연결하여 작동 방식을 더 잘 이해할 수 있도록 해보자.

## 카오스 이용

2차원 랜덤은 TV의 노이즈와 많이 닮았다. 그렇지 않은가?  
이것은 이미지를 합성하는 데에는 사용하기 어려운 원료다. 이를 활용하는 방법을 배워보자.

첫 번째 단계는 그리드를 이것에 적용하는 것이다; [`floor()`](.../glossary/?)search=floor) 함수를 사용하여 셀의 정수 표를 생성할 것이다. 다음 코드, 특히 22번과 23번째 줄을 보시오.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

공간을 10배 확대한 후(21번째 줄에서), 좌표의 정수와 소수 부분을 분리한다. 우리는 이 마지막 작업에 익숙하다. 왜냐하면 공간을 `0.0`~`1.0`의 더 작은 셀로 세분화하기 위해서 이 방법을 사용해왔기 때문이다. 좌표의 정수를 구함으로써 단일 셀처럼 보이는 픽셀 영역에 대한 공통 값을 분리할 수 있다. 그런 다음 공통 정수를 사용하여 해당 영역에 대한 임의의 값을 얻을 수 있다. 랜덤 함수는 결정론적이기 때문에 반환되는 랜덤 값은 해당 셀의 모든 픽셀에 대해 일정하다.

29번째 줄의 주석을 해제해보면 좌표의 소수 부분을 보존하는 것을 알 수 있고, 그 값을  각 셀 안에 있는 것들을 그리기 위한 좌표계로 사용할 수 있다.

이 두 값(정수 부분과 좌표의 소수 부분)을 조합해보면 다양성과 질서를 혼합할 수 있다.

다음은 유명한 `10 PRINT CHR$(205.5+RND(1);: GOTO 10` 미로 생성기의 GLSL 포팅 버전이다.

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

앞 장(41~47번째 줄)의 `truchetPattern()` 함수를 사용하여 셀의 임의의 값을 사용하여 한 방향으로 선을 그린다.

50~53행의 블럭을 주석 처리하여 또 다른 흥미로운 패턴을 얻을 수도 있고, 35와 36행에 주석을 해제함으로써 패턴을 애니메이션화할 수도 있다.

## 랜덤 마스터

일본의 전자 작곡가이자 시각 예술가인 [Ryoji Ikeda](http://www.ryojiikeda.com/)는 랜덤 사용을 마스터했다. 그의 작품에 감동하고 매료되지 않는 것은 어렵다. 그가 시청각 매체에서 랜덤을 사용하는 것은 성가신 혼란이 아니라 우리 기술 문화의 복잡성의 거울이 되는 방식으로 만들어졌다.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[Ikeda](http://www.ryojiikeda.com/)의 작업을 살펴보고 다음 연습에 도전하십시오:

* 랜덤 값으로 움직이는 셀(반대 방향)의 행을 만들어 보아라. 더 밝은 셀만 표시하여라. 행의 속도가 시간에 따라 변화하도록 하여라.

<a href="../edit.php#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* 마찬가지로 여러 행을 만들지만, 각 행마다 속도와 방향을 다르게 만들어라. 표시할 셀의 임계값에 마우스 위치를 연동해라.

<a href="../edit.php#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* 다른 흥미로운 효과를 만들어 보아라.

<a href="../edit.php#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

심미적으로 랜덤을 사용하는것(특히, 자연스러워 보이는 시뮬레이션을 만들고 싶어서)은 문제가 될 수 있다. 랜덤은 단순히 지나치게 혼란스럽고 현실에서 `random()`처럼 보이는 것은 거의 없다. 빗물 패턴이나 재고 차트를 보면, 두 가지 모두 꽤 랜덤처럼 보이지만, 이 장 첫머리에 우리가 만든 랜덤 패턴과는 전혀 다르다. 이유는? 랜덤 값은 서로 상관관계가 없지만 대부분의 자연 패턴은 이전 상태에 대한 기억을 가지고 있다.

다음 챕터에서는 컴퓨테이셔널 카오스를 일으키는 부드럽고 *자연스러워 보이는* 방법인 노이즈에 대해 알아볼 것 이다.