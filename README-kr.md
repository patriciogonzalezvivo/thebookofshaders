<canvas id="custom" class="canvas" data-fragment-url="examples/moon.frag" data-textures="examples/images/moon-texture.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*by [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/)*

이것은 황량하게 넓고 복잡한 Fragment Shader의 세계를 한단계씩 살펴보는 지침서입니다.

## 번역에 대하여

이 문서는 Patricio Gonzalez Vivo의 The Book of Shader의 한국어 번역입니다.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## 차례

* [이 책에 대하여](00/?lan=kr)

* 시작하기 앞서
    * [쉐이더란 무엇인가?](01/?lan=kr)
    * [“헬로 월드!”](02/?lan=kr)
    * [유니폼](03/?lan=kr)
	* [쉐이더 실행하기](04/?lan=kr)

* Algorithmic drawing
    * [모양 그리기](05/?lan=kr)
    * [색에 대해](06/?lan=kr)
    * [형태에 대해](07/?lan=kr)
    * [행렬](08/?lan=kr)
    * [패턴](09/?lan=kr)

* Generative designs
    * [랜덤](10/?lan=kr)
    * [노이즈](11/?lan=kr)
    * Fractional brownian motion
    * Fractals

* Image processing:
    * Textures
    * Image operations
    * Kernel convolutions
    * Filters
    * Others effects

* Simulation
    * Pingpong
    * Conway
    * Ripples
    * Water color
    * Reaction diffusion

* 3D graphics
    * Lights
    * Normal-maps
    * Bump-maps
    * Ray marching
    * Environmental-maps (spherical and cube)
    * Reflect and refract

* [Appendix:](appendix/) Other ways to use this book
	* [How can I navigate this book offline?](appendix/)
	* [How to run the examples on a Raspberry Pi?](appendix/)
	* [How to print this book?](appendix/)

* [Examples Gallery](examples/)

* [Glossary](glossary/)

## About the Author

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, 부에노스 아이레스, 아르헨티나) 는 뉴욕 기반의 아티스트 겸 개발자이다. 그는 유기적요소와 인공적요소, 아날로그와 디지털, 단일적요소와 집단적요소 사이를 탐험한다. 그는 사람들과 함께 개발하기위해 코드를 표현요소로 사용해 작업을 한다.

Patricio는 심리치료 및 표현예술을 공부했다. 그는 파슨스대학에서 디자인 및 기술 석사학위를 보유하고 있고 그곳에서 학생을 가르치고 있다. 또한 그는 현재 Mapzen에서 그래픽스 엔지니어로 맵을 만드는 오픈소스툴을 개발중에 있다.

<div class="header"><a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

## 감사의 표시

아내[Jen Lowe](http://www.datatelling.com/)의 끊임없는 격려과 이책에 대한 애정에 감사를 드립니다.

영감과 격려를 아끼지 않는 [Scott Murray](http://alignedleft.com/)에게 감사를 표합니다.

일본어 번역을 맡고 있는 [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) 와 [Sawako](https://twitter.com/sawakohome) 에게 감사를 표합니다. [Japanese translation (日本語訳)](?lan=jp)

중국어 번역을 맡고 있는 [Tong Li](https://www.facebook.com/tong.lee.9484) 와 [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) 에게 감사를 표합니다. [Chinese translation (中国的翻译)](?lan=ch)

한국어 번역을 맡고 있는 [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) 에게 감사를 표합니다. [Korean translation (한국어)](?lan=kr)

좋은 아이디어와 코드를 제공해주는 [Karim Naaji](http://karim.naaji.fr/) 에게 감사를 표합니다.

이 프로젝트를 격려해주시고 기부해주신 모든 분들께 감사를 드립니다. [contributed with fixes](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors)

## 새로운 챕터 업데이트 받기

뉴스 업데이트를 위해 팔로우 해주세요. [follow it on Twitter](https://twitter.com/bookofshaders)

 <form style="border:1px solid #ccc;padding:3px;text-align:center;" action="https://tinyletter.com/thebookofshaders" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/thebookofshaders', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"><a href="https://tinyletter.com/thebookofshaders"><p><label for="tlemail">Enter your email address</label></p></a><p><input type="text" style="width:140px" name="email" id="tlemail" /></p><input type="hidden" value="1" name="embed"/><input type="submit" value="Subscribe" /><p><a href="https://tinyletter.com" target="_blank"></a></p></form>
