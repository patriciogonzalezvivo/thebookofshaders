## 패턴

쉐이더 프로그램은 픽셀 단위로 실행되므로, 도형을 반복과 무관하게 연산 횟수는 일정하게 유지된다.  
이는 프래그먼트쉐이더가 타일 패턴에 특히 적합하다는 것을 의미한다.

[ ![Nina Warmerdam - The IMPRINT Project (2013)](warmerdam.jpg) ](../edit.php#09/dots5.frag)

이 챕터에서는 지금까지 배운 내용을 캔버스에 반복하며 연습해볼것이다.  
이전 장과 마찬가지로, 우리의 전략은 공간 좌표(0.0과 1.0 사이)에 곱하는 것을 기초로 할 것이며, 따라서 0.0과 1.0 사이에 반복된 도형이 그려져 그리드를 만들 것이다.

*"격자망은 인간의 직관과 발명이 작동하고 전복될 수 있는 프레임워크를 제공한다. 패턴은 자연의 혼돈 속에서 대비와 질서의 약속을 제공한다. 초기 도기 무늬부터 로마 목욕탕의 기하학 모자이크까지, 사람들은 삶의 질을 향상시키기 위해 오랫동안 격자망을 장식품으로 사용해 왔다."* [*10 PRINT*, Mit Press, (2013)](http://10print.org/)

먼저 [`fract()`](../glossary/?search=fract) 함수를 기억해보자.  
이 함수는 숫자의 소수 부분을 반환하여 본질적으로 `fract()`를 1의 나머지 연산([`mod(x,1.0)`](../glossary/?search=mod))으로 만든다.  
즉, [`fract()`](../glossary/?search=fract)는 부동 소수점 뒤에 있는 숫자를 반환한다. 우리의 정규화된 좌표계 변수(`st`)는 이미 0.0에서 1.0으로 바뀌어 다음과 같은 작업을 하는 것은 말이 되지 않는다.

```glsl
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);
	st = fract(st);
	color = vec3(st,0.0);
	gl_FragColor = vec4(color,1.0);
}
```

그러나 정규화된 좌표계를 3배 확대하면 0-1 사이의 세 가지 선형 보간 시퀀스를 얻을 수 있다.  
첫 번째는 0-1 사이의 부동 소수점, 두 번째는 1-2 사이의 부동 소수점, 세 번째는 2-3 사이의 부동 소수점

<div class="codeAndCanvas" data="grid-making.frag"></div>

27번째 줄의 주석을 해제하여 각 부분 공간에 무언가를 그려보자. (x와 y에 똑같이 곱하기 때문에 공간의 가로 세로 비율은 변하지 않고 모양도 예상대로 된다.)

더 깊이 이해하기 위해 다음 연습 중 몇 가지를 시도해 보십시오:

* 공간에 다른 숫자를 곱해보아라. 부동 소수점 값과 x,y 서로 다른 값을 사용해 보시오.

* 이 타일링 트릭을 재사용 가능한 함수로 만드시오.

* 공간을 3개의 행과 3개의 열로 나눈다.  스레드가 어떤 열과 행인지 알고 이를 사용하여 표시되는 모양을 변경할 수 있는 방법을 찾는다. 틱-택-토를 만들어 보시오.

### 패턴에 행렬 적용하기

각 부분 또는 셀은 우리가 이미 사용하고 있는 표준화된 좌표계의 더 작은 버전이기 때문에, 내부 공간을 변환, 회전 또는 확장하기 위해 행렬 변환을 적용할 수 있다.

<div class="codeAndCanvas" data="checks.frag"></div>

* 이 패턴을 애니메이션화하는 흥미로운 방법들을 생각해 보시오. 애니메이션 색, 모양 및 움직임을 고려하시오. 세 개의 다른 애니메이션을 만드시오.

* 여러 도형을 구성하여 더욱 복잡한 패턴을 재현해보시오.


[![](diamondtiles-long.png)](../edit.php#09/diamondtiles.frag)

* 다양한 패턴 레이어를 결합하여 자신만의 [스코티쉬 타탄 패턴](https://www.google.com/search?q=scottish+patterns+fabric&tbm=isch&tbo=u&source=univ&sa=X&ei=Y1aFVfmfD9P-yQTLuYCIDA&ved=0CB4QsAQ&biw=1399&bih=799#tbm=isch&q=Scottish+Tartans+Patterns)을 구성해보아라.

[ ![Vector Pattern Scottish Tartan By Kavalenkava](tartan.jpg) ](http://graphicriver.net/item/vector-pattern-scottish-tartan/6590076)

### 오프셋 패턴

우리가 벽돌담을 흉내내기를 원한다고 가정해보자. 벽을 보면, 행마다 벽돌의 반절만큼 x의 간격 차이를 볼 수 있다.  
어떻게 만들까?

![](brick.jpg)

첫 단계로, 행이 짝수인지 홀수인지 알아야 한다. 그래야 그 행에서 x의 오프셋 여부를 결정할 수 있기 때문이다.

____우리는 다음 두 단락을 함께 수정해야 한다.____

행이 홀수인지 짝수인지를 판단하기 위해 `2.0`의 [`mod()`](../glossary/?search=mod)를 사용하고 그 결과가 `1.0` 이하인지 아닌지를 확인할 것이다. 다음 공식을 보고 마지막 두 줄의 주석을 해제해보시오.

<div class="simpleFunction" data="y = mod(x,2.0);
// y = mod(x,2.0) < 1.0 ? 0. : 1. ;
// y = step(1.0,mod(x,2.0));"></div> 

보다시피 [삼항 연산자](https://ko.wikipedia.org/wiki/%3F:)를 사용하여 2.0의 `mod()` 가 1.0 미만인지(두 번째 줄) 확인할 수 있다.
또는 이와 유사하게 동작은 같지만 속도는 더 빠른 [`step()`](../glossary/?search=step) 함수를 사용할 수 있다. 왜 그럴까? 각 그래픽 카드가 어떻게 코드를 최적화하고 컴파일하는지는 알 수 없지만 내장 함수가 비 내장 함수보다 빠르다고 가정해도 무방하다. 내장함수를 사용할 수 있을 때마다 사용하여라!

이제 홀수 공식이 있으므로 홀수 행에 오프셋을 적용하여 타일에 *벽돌* 효과를 부여할 수 있다. 다음 코드의 14번째 줄은 홀수 행을 "탐지"하고 `x`에 반절의 오프셋을 부여하는 함수를 사용하는 곳이다. 짝수 행의 경우, 함수의 결과는 `0.0`이고, `0.0`에 오프셋 `0.5`를 곱하면 `0.0`이 된다. 그러나 홀수 행에서 함수의 결과 `1.0`에 `0.5`만큼 오프셋을 곱하여 좌표계의 `x`축을 `0.5`로 이동시킨다.

이제 32번째 줄을 주석 처리해보시오. 이 경우 좌표계의 가로 세로 비율이 늘어나 "현대식 벽돌"의 면모를 흉내낼 수 있다. 40번째 줄에 주석을 달면 좌표계가 빨간색과 녹색으로 매핑되는 모습을 볼 수 있다.

<div class="codeAndCanvas" data="bricks.frag"></div>

* 오프셋을 시간에 따라 이동하여 애니메이션을 시도해 보시오.

* 짝수행은 왼쪽으로 이동하고 홀수행은 오른쪽으로 이동하는 애니메이션을 만들어보자.

* 이 효과를 행이 아닌 열에 적용해 볼수 있는가?

* `x`축과 `y`축의 오프셋을 조합하여 다음과 같은 값을 얻도록 한다:

<a href="../edit.php#09/marching_dots.frag"><canvas id="custom" class="canvas" data-fragment-url="marching_dots.frag"  width="520px" height="200px"></canvas></a>

## Truchet 타일

이제 셀이 짝수 또는 홀수 행 또는 열에 있는지 확인하는 방법을 배웠으므로, 위치에 따라 단일 설계 요소를 재사용할 수 있다. 단일 설계 요소를 다음과 같은 네 가지 방법으로 표시할 수 있는 [Truchet Tiles](http://en.wikipedia.org/wiki/Truchet_tiles)의 경우를 고려해 보자:

![](truchet-00.png)

여러 타일에 걸쳐 패턴을 변경함으로써 무한히 복잡한 설계 집합을 구성할 수 있다.

![](truchet-01.png)

공간을 네 개의 셀로 나누고 각 셀에 회전 각도를 할당하는 함수 `rotateTilePattern()`를 주의깊게 관찰해 보아라.

<div class="codeAndCanvas" data="truchet.frag"></div>

* 새로운 디자인을 구성하기 위해 69~72줄의 주석, 주석해제를 해보아라.

* 다른 요소의 흑백 삼각형을 반원,회전사각/선과 같은 것으로 변경해보아라.

* 각 위치에 따라 요소가 회전하는 패턴을 만들어보아라.

* 각 위치에 따라 다른 성질을 바꾸는 패턴을 만들어보아라.

* 본 섹션의 원리를 적용할 수 있는 패턴이 아닌 다른 패턴을 생각해 보시오. (예: I Ching 육각)

<a href="../edit.php#09/iching-01.frag"><canvas id="custom" class="canvas" data-fragment-url="iching-01.frag"  width="520px" height="200px"></canvas></a>

## 나만의 규칙 만들기

절차적 패턴을 만드는 것은 최소한의 재사용 가능한 요소들을 찾는 정신적인 훈련이다. 이러한 관습은 오래되었다; 우리는 한 종족으로서 오랫동안 격자무늬와 무늬를 사용하여 직물, 바닥, 사물의 테두리를 장식해 왔다: 고대 그리스의 만다르 양식에서부터 중국의 격자무늬에 이르기까지, 반복과 변화의 즐거움이 우리의 상상을 사로잡는다. [장식](https://archive.org/stream/traditionalmetho00chririch#page/130/mode/2up) [패턴](https://www.pinterest.com/patriciogonzv/paterns/)을 살펴보고 아티스트와 디자이너가 어떻게 질서의 예측 가능성과 변동과 혼란의 놀라움 사이에서 미세한 가장자리를 탐색해 온 오랜 역사를 가지고 있는지 살펴보시오. 아랍의 기하학적인 패턴에서부터 멋진 아프리카 직물 디자인에 이르기까지, 배울 수 있는 패턴의 전 세계가 있다.

![Franz Sales Meyer - A handbook of ornament (1920)](geometricpatters.png)

이 챕터를 마지막으로 Algorithmic Drawing 단원을 마친다.  
다가올 챕터에서는 쉐이더에 엔트로피를 주고 [제너러티브 디자인](https://en.wikipedia.org/wiki/Generative_art)을 만드는 방법에 대해 배울 것이다.