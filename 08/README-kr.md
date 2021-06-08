## 2차원 행렬

<canvas id="custom" class="canvas" data-fragment-url="matrix.frag"  width="700px" height="200px"></canvas>

### 이동

앞 장에서는 도형을 만드는 방법에 대해 배웠다 - 도형을 움직이는 기법은 좌표계 자체를 움직이는 것이다.  
간단하게, 각 픽셀의 위치를 나타내는 `st` 변수에 벡터를 더하면 이를 달성할 수 있다.  
이로 인해 전체 공간 좌표계가 이동하게 된다.

![](translate.jpg)

백문이 불여일견, 직접 봐보자:

* 공간 자체가 어떻게 움직이는지 보려면 아래 코드의 35번째 줄의 주석을 해제하라.

<div class="codeAndCanvas" data="cross-translate.frag"></div>

이제, 다음 연습을 해보시오:

* `u_time`을 쉐이핑 함수와 함께 사용하면 작은 십자 모양이 흥미로운 방식으로 이동한다. 관심 있는 특정 움직임을 조사해보고, 십자 모양을 그것와 똑같이 움직이도록 시도해보자.  
우선, "실제 세계"에서 무언가를 기록하는 것이 도움이 될 수 있다 - 파도가 오고 가는 것, 진자의 움직임, 튀는 공, 가속하는 자동차, 정지중인 자전거 등

### 회전

물체를 회전하려면 이동과 마찬가지로 전체 공간을 이해할 필요가 있다. 이를 위해 [행렬](https://ko.wikipedia.org/wiki/%ED%96%89%EB%A0%AC)를 사용할 것이다.  
행렬은 열과 행으로 구성된 숫자 집합이다.  
벡터의 값을 수정하기 위해서는  정확한 규칙을 따르는 행렬을 특정 방법으로 곱해야 한다.

[![Wikipedia entry for Matrix (mathematics) ](matrixes.png)](https://en.wikipedia.org/wiki/Matrix)

GLSL은 자체적으로 2,3,4차원 행렬 자료형을 지원한다: [`mat2`](../glossary/?search=mat2) (2x2), [`mat3`](../glossary/?search=mat3) (3x3), [`mat4`](../glossary/?search=mat4) (4x4).  
또한, GLSL은 행렬 곱셈(`*`)을 지원하고 행렬의 성분별 곱셈 함수 ([```matrixCompMult()```](../glossary/?search=matrixCompMult))도 지원한다.

행렬의 특성에 의해, 특정 기능을 수행하기 위한 행렬을 구성할 수 있다.  
예를 들어, 행렬을 사용하여 벡터를 이동할 수 있다:

![](3dtransmat.png)

더욱 흥미로운 것은, 행렬을 사용하여 좌표계를 회전할 수 있다는 점이다.

![](rotmat.png)

다음은 2D 회전행렬을 구성하는 함수에 대한 코드이다.  
이 함수는 `vec2(0.0)` 지점 주변에서 좌표를 회전하기 위해 다음 [공식](https://ko.wikipedia.org/wiki/%ED%9A%8C%EC%A0%84%EB%B3%80%ED%99%98%ED%96%89%EB%A0%AC)을 따른다.

```glsl
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
```

여태 배워왔던 도형을 그리는 방식에 따르면, 이것은 정확히 우리가 원하는 것은 아니다. 십자 모양은 캔버스의 중앙에 그려져 있는데, 이는 `vec2(0.5)` 위치에 해당한다. 그렇기 때문에, 공간을 회전하기 전에 도형을 `중심`에서 `vec2(0.0)` 좌표로 이동시킨 후, 공간을 회전하고, 최종적으로 다시 원래 위치로 이동해야 한다.

![](rotate.jpg)

그것은 다음 코드와 같다:

<div class="codeAndCanvas" data="cross-rotate.frag"></div>

다음 연습을 해보시오:

* 위 코드의 45번째 줄의 주석을 해제하고 무슨 일이 일어나는지 보아라.

* 37, 39번째 줄의 주석 처리를 해보며 회전 전후의 이동에 대해 관찰해 보아라.
  
* 이동 예제에서 시뮬레이션한 애니메이션을 회전을 사용하여 개선해보아라.

### 크기

공간에서 물체를 이동하고 회전하는데에 행렬이 어떻게 사용되는지 배웠다. (더 정확하게는, 좌표계를 변환하여 물체를 회전시키고 이동시키기 위해). 3D 모델링 소프트웨어나 Processing에서 push 및 pop 행렬 함수를 사용해보면, 행렬이 물체의 크기를 조정하는데에도 사용된다는것을 알게 될 것이다.

![](scale.png)

위 공식에 의해, 다음과 같이 2차원 크기변환 행렬을 만들 수 있다:

```glsl
mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
```

<div class="codeAndCanvas" data="cross-scale.frag"></div>

이것이 어떻게 작동하는지 더 깊이 이해하기 위해 다음 연습을 해보시오.

* 공간 좌표계의 크기변환을 보기위해 42번째 줄의 주석을 해제해보시오.

* 37,39번째 줄에 크기변환 전후로 이동하는 부분을 주석처리 하면 무슨일이 일어나는지 보아라.
  
* 회전행렬을 크기변환행렬과 함께 사용해 보시오. 순서에 주의할 것.  
행렬을 먼저  곱한 다음 벡터를 곱하시오.
  
* 이제 여러분은 다양한 모양을 그릴 수 있고, 움직이고, 회전하고, 크기를 조정할 수 있는 방법을 알았으니, 멋진 구성을 만들 때이다. [가짜 UI 또는 HUD(헤드업 디스플레이)](https://www.pinterest.com/patriciogonzv/huds/)를 설계하고 구현해보아라.  
[Ndel](https://www.shadertoy.com/user/ndel)의 다음 ShaderToy 예제를 통해 영감을 얻고 참조할 수 있다.

<iframe width="800" height="450" frameborder="0" src="https://www.shadertoy.com/embed/4s2SRt?gui=true&t=10&paused=true" allowfullscreen></iframe>

### 행렬의 기타 용도: YUV 색상

[YUV](http://ko.wikipedia.org/wiki/YUV)는 크로미넌스 구성 요소의 대역폭을 줄이기 위해 인간의 인식 범위를 고려한 사진과 비디오의 아날로그 인코딩에 사용되는 색 공간이다.

다음 코드는 GLSL에서 행렬 연산을 사용하여 한 모드에서 다른 모드로 색상을 변환하는 흥미로운 코드이다.

<div class="codeAndCanvas" data="yuv.frag"></div>

보다시피, 색을 행렬과 곱함으로써 벡터로 취급하고 있다.  
우리는 이런식으로 값들을 이리저리 "옮긴다".

이 장에서는 행렬 변환을 사용하여 벡터를 이동, 회전 및 확장하는 방법에 대해 알아보았다. 이러한 변환은 이전 장에서 배운 도형들을 사용하여 다양한 구성을 만드는 데 필수적이다. 다음 챕터에서는 지금까지 배운 모든 것을 이용하여 아름다운 절차적 패턴을 만들어 볼 것이다.  
반복코딩과 응용이 흥미로운 연습이 될 수 있다는 것을 알게 될 것이다.