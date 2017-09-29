## Uniforms

우리는 여태것 GPU가 병렬처리에 왜 유리한지, 또 GPU의 각 Thread가 한 이미지의 각 부분을 어떻게 다루는지 또한 살펴보았다. 병렬처리 Thread들이 서로에 대해 데이터를 공유할수 없더라도, CPU에서 인풋을 받을수 있다. 그리고 이 인풋들은 모든 Thread들에 있어서 일정(*uniform*)하고 *read only*이다. 즉, 읽을순 있어도 변경할수 없다는 뜻이다.

이런 인풋들을 ```uniform```이라고 하고, ```float```, ```vec2```, ```vec3```, ```vec4```, ```mat2```, ```mat3```, ```mat4```, ```sampler2D```, ```samplerCube``` 등의 데이터 타입을 지원한다. 유니폼 값들은 보통 floating pont precision설정이 끝난후 선언된다.

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width,height)
uniform vec2 u_mouse;      // mouse position in screen pixels
uniform float u_time;	  // Time in seconds since load
```

유니폼은 CPU와 GPU사이에 다리라고 봐도 좋을것이다. 유니폼 값들의 이름은 구현마다 다 다르지만 여기서는: ```u_time``` (쉐이더 연산이 시작된후부터의 초), ```u_resolution``` (쉐이더가 그려지고 있는 빌보드의 사이즈) and ```u_mouse``` (그려지는 빌보드내에서 마우스의 현재 픽셀 위치값) 등으로 나타내겠다. ```u_``` 를 변수앞에 붙혀서, 유니폼이라고 명시한다는 점도 유의하기 바란다. 더 많은 예제는 [ShaderToy.com](https://www.shadertoy.com/) 에서 찾아볼수 있지만, 변수이름이 약간 다르니 살펴보기 바란다:

```glsl
uniform vec3 iResolution;   // viewport resolution (in pixels)
uniform vec4 iMouse;        // mouse pixel coords. xy: current, zw: click
uniform float iTime;        // shader playback time (in seconds)
```

거두철미하고, 유니폼이 실제로 구현되는 부분을 보자. 아래 코드에서 ```u_time``` - 쉐이더가 구동된후 초 - 를 sine 함수에 인자로 넣어, 빨간색값을 조절하고 있는것을 볼수 있다.

<div class="codeAndCanvas" data="time.frag"></div>

GLSL의 재미를 약간 맛볼수 있었다. GPU는 전에도 설명했듯이, hardware accelerated 각연산, 삼각함수연산, 지수함수연산등을 지원한다: [```sin()```](../glossary/?search=sin), [```cos()```](../glossary/?search=cos), [```tan()```](../glossary/?search=tan), [```asin()```](../glossary/?search=asin), [```acos()```](../glossary/?search=acos), [```atan()```](../glossary/?search=atan), [```pow()```](../glossary/?search=pow), [```exp()```](../glossary/?search=exp), [```log()```](../glossary/?search=log), [```sqrt()```](../glossary/?search=sqrt), [```abs()```](../glossary/?search=abs), [```sign()```](../glossary/?search=sign), [```floor()```](../glossary/?search=floor), [```ceil()```](../glossary/?search=ceil), [```fract()```](../glossary/?search=fract), [```mod()```](../glossary/?search=mod), [```min()```](../glossary/?search=min), [```max()```](../glossary/?search=max), [```clamp()```](../glossary/?search=clamp).

다시 한번 위에 코드를 이용해 놀아보자.

* 색변화의 속도를 줄여보자.

* 색이 거의 한개로 보일정도로 빠르게 속도를 높여보자.

* RGB채널을 직접 조절하고, 속도를 바꾸어 개인만의 패턴을 만들어보자.


## gl_FragCoord

비슷한 원리로, GLSL은 내장 아웃풋 값들을 가진다. ```vec4 gl_FragColor```, 또한 내장 인풋 값도 있다, *screen fragment*상에서 *pixel*의 위치를 가지고 있는 ```vec4 gl_FragCoord```. ```vec4 gl_FragCoord```로 각 쓰레드가 빌보드의 어느 부분을 작업하고 있는지 알수 있다. 그래서 이값은 ```uniform```값과는 조금다르다. 각 쓰레드마다 값이 다른 *varying*타입이기 때문이다.
In the same way GLSL gives us a default output, ```vec4 gl_FragColor```, it also gives us a default input, ```vec4 gl_FragCoord```, which holds the screen coordinates of the *pixel* or *screen fragment* that the active thread is working on. With ```vec4 gl_FragCoord```, we know where a thread is working inside the billboard. In this case we don't call it ```uniform``` because it will be different from thread to thread, instead ```gl_FragCoord``` is called a *varying*.

<div class="codeAndCanvas" data="space.frag"></div>

위 코드에서, 우리는 빌보드상의 각 픽셀의 위치를 *normalize*했다. 이렇게 함으로 인해서, 값은 ```0.0```에서, ```1.0```사이로 변환되고, 이값은 RED와 GREEN채널에 바로 대입할수 있게 된다.

아쉽게도, 쉐이더 작업에서 우리는 많은 디버깅 혜택을 볼수가 없다. 그래서, 값을 색에 대입해 예측하고는 한다. 그래서 이 과정을 아래 그림과 같이, 유리병안에 배모형을 조각하는것과 비슷하다고도 한다. 다소 복잡할수 있지만, 그에 비례한 아름다운 결과는 결코 작지 않다.

![](08.png)

자 이번에는 여러가지 시도를 해보고 익혀보자.

* ```(0.0,0.0)```이 어디 있는지 알수 있겠는가?

* 그렇다면 ```(1.0,0.0)```, ```(0.0,1.0)```, ```(0.5,0.5)```, ```(1.0,1.0)``` 들은?

* ```u_mouse``` 유니폼 변수를 사용해서, 각 픽셀의 노멀라이즈되지 않은 값을 알수 있겠는가? 또 이 값의 변화로 색또한 변화 시킬수 있을까?

* ```u_time```과, ```u_mouse```를 이용해, 색의 패턴을 재밌게 바꾸는 시도도 해보자.

몇번 해보다 보면, 이런 쉐이딩 기술을 어디에 적용할지 의문이 갈것이다. 다음챕터에서, 쉐이딩 기술을 이용하는 라이브러리들에 대해 알아볼것이다. three.js, Processing, openFrameworks와 같은 툴을 이용하여.
