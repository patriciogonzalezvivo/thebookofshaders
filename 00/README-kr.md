# Introduction

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

위에 두 이미지는 다른 방법을 통해 만들어졌다. 첫번째것은 반 고흐가 직접 레이어 위에 레이어를 쌓는 방식으로 만들어졌다. 제법 시간이 걸렸을것이다. 두번째것은 몇초 안되는 시간안에 픽셀들의 행렬연산 4개를 통해 만들어 졌다: 한개는 cyan색, 다른 한개는 magenta색, 또 다른 한개는 yellow, 그리고 마지막것은 black. 중요한점은 두번째 이미지는 그림을 부분마다 따로 그려나가게 아니라 그림의 다른 모든 부분이 한번에 그려졌다는 것이다.

이 책은, *fragment shaders*, 라는 디지털 그림 제작과정을 다음 레벨로 이끌어낼 혁신적인 컴퓨팅 기술에 대한 것이다. 바로 그래픽 인더스트리의 구텐베르크 인쇄술인것이다.

![Gutenberg's press](gutenpress.jpg)

Fragment shader는 매우 빠른 속도로 스크린에 렌더되는 픽셀들을 완전히 컨트롤 할수 있는 능력을 준다. 핸드폰의 비디오 필터나, AAA 3D 비디오 같은 미디어에서 쓰이는 이유도 이것때문이다.

![Journey by That Game Company](journey.jpg)

앞으로 맞이할 챕터들은 독자가 이 강력하고 바른 기술을 스스로 습득하고, 자신의 작업에 적용할수 있는 길을 보여줄것이다.

## 누구를 위한 책인가?

이 책은 삼각함수와 선형대수학에 대한 기본이해가 있고 작업에 있어 그래픽 요소를 극대화 시키려는 creative coder, 게임 개발자, 그래픽 엔지니어들을 위한 책이다. (만약 본인이 코딩입문자라면 이 링크를 보고, [Processing](https://processing.org/) 코딩이 익숙해졌을때쯤 다시 돌아와 이책을 보길 권한다.)

이책은 독자들에게 쉐이더를 프로젝트에 어떻게 쓰는지와, 이를 통한 퍼포먼스 향상과 퀄리티를 높이는 방법들을 보여줄것이다. GLSL (OpenGL Shading Language) 쉐이더들은 OpenGL, OpenGL ES 혹은 WebGL을 가진 환경에서 컴파일되고 실행될것이다. 한마디로, 이것에 대한 기술을 [Processing](https://processing.org/) 스켓치파일들, [openFrameworks](http://openframeworks.cc/) 어플들, [Cinder](http://libcinder.org/) 설치미술들, [Three.js](http://threejs.org/) 웹사이트들 또는 iOS/Android 게임들에 적용할수 있다는 것이다.

## 어떤 내용들을 다루나?

이책은 GLSL pixel shader를 메인으로 다룬다. 먼저, 쉐이더가 무엇인지 알아보고, 절차적(procedural) 모양, 패턴, 텍스쳐, 애니메이션등에 응용해볼것이다. 쉐이딩 랭기지의 기본에 대해 다지게 되고, 여러 분야에 적용해볼수 있도록 유도하는데 예를들면: 이미지 처리(이미지 여산, 메트릭스 회선, blurs, color filters, 룩업테이블과 기타 효과들)와 시뮬레이션 (Conway's game of life, Gray-Scott's reaction-diffusion, water ripples, 물감 효과, Voronoi cells등등)이 그 좋은 예이다. 책의 막바지에는 Ray Marching과 같은 고급기술도 소개를 한다.

*각 챕터는 인터엑티브한 예제들로 구성되어 있다.* 예제들의 코드를 변경하면, 바로 그에 대한 결과를 볼수 있다. 컨셉자체가 추상적이거나 난해할수도 있기에, 이런 인터엑티브 예제가 이해하는데 큰 도움이 될거라고 믿는다. 컨셉에 대한 예제를 많이 가지고 놀아볼수록 그에 대한 이해역시 빨리 될거라고 생각한다.

이책이 다루지 않는 부분:

* 이책은 openGL이나 webGL서적이 아니다. openGL/webGL은 GLSL이나 fragment shader보다 훨씬 더 큰 주제이다. 그런것들에 대해 좀더 싶히 공부하고 싶다면: [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (빨간책이라고도 알려진) 이나 [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl) 등을 추천한다.

* 이책은 수학색이 아니라. 물론 여러 종류의 알고리즘과 대수학과, 삼각함수에 기댄 수학수식이 많이 이용되지만, 그런것들에 대해 자세히 설명하지는 않을 것이다. 수학에 대한 질문은 : [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) 를 보거나, [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers) 등을 참고하기 바란다.

## 시작하기 위해 무엇을 해야하나?

필요한것은 따로 없다! 근대 브라우져를 이용하고 있다면, WebGL이 서포트 될것이고 (구글 크롬이나 파이어폭스, 사파리), 인터넷만 있으면 된다! (지금 보고 있지만) 페이지 최하단에 있는 "Next"버튼을 눌러 다음챕터로 가면 시작이다.

아니면 , 다음과 같은 방법으로도 이 책을 접할수 있다:

- [이책의 오프라인 버젼](https://thebookofshaders.com/appendix/)

- [Raspberry Pi에서 브라우져 없이 예제들 돌리기](https://thebookofshaders.com/appendix/)

- [이책의 PDF버젼 만들기](https://thebookofshaders.com/appendix/)

- 또는 [온라인 리포](https://github.com/patriciogonzalezvivo/thebookofshaders) 이슈들을 답하거나, 올려주세요.
