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
    * [셀룰러 노이즈](12/?lan=kr)
    * [분수 브라운운동](13/?lan=kr)
    * 프랙탈

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

* [부록:](appendix/) 이 책을 활용하는 다른 방법들
	* [이 책을 오프라인(off-line)으로 보는 방법](appendix/00/)
	* [라즈베리 파이에서 예제를 실행하는 방법](appendix/01/)
	* [이 책을 인쇄하는법](appendix/02/)
    * [Collaborator로 기여하기](appendix/03/)
    * [JS 사용자분들을 위한 안내서](appendix/04/) by [Nicolas Barradeau](http://www.barradeau.com/)

* [예제 갤러리](examples/)

* [용어집](glossary/)

## 저자 소개

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, 부에노스 아이레스, 아르헨티나) 는 뉴욕 기반의 아티스트 겸 개발자이다. 그는 유기적요소와 인공적요소, 아날로그와 디지털, 단일적요소와 집단적요소 사이를 탐험한다. 그는 사람들과 함께 개발하기위해 코드를 표현요소로 사용해 작업을 한다.

Patricio는 심리치료 및 표현예술을 공부했다. 그는 파슨스대학에서 디자인 및 기술 석사학위를 보유하고 있고 그곳에서 학생을 가르치고 있다. 또한 그는 현재 Mapzen에서 그래픽스 엔지니어로 맵을 만드는 오픈소스툴을 개발중에 있다.

<div class="header"><a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>  

  
[Jen Lowe](http://jenlowe.net/) 은 Datatelling에서 사람+숫자+단어를 한데 모으는 데이터과학자이자 커뮤니케이터다. 그녀는 SVA의 사회혁신 프로그램 설계를 강의하고, 시적연산학교를 공동 설립했으며, NYU ITP에서 아티스트를 위한 수학을 가르쳤고, 컬럼비아 대학교의 공간 정보 디자인 연구소에서 연구했으며, 백악관 과학기술 정책실에서 아이디어를 기여했다. 그녀는 SXSW와 Eyeo에서 연설해왔다. 그녀의 작품은 뉴욕타임즈와 패스트 컴퍼니에서 보도 되었다. 그녀의 연구, 글쓰기 및 연설은 사회에서 데이터와 기술의 약속과 시사점을 탐구한다. 그녀는 응용수학 학사, 정보과학 석사 학위를 가지고 있다. 그녀는 종종 저항적이면서도 항상 사랑의 편에 선다.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>


## 감사의 표시

영감과 격려를 아끼지 않는 [Scott Murray](http://alignedleft.com/)에게 감사를 표합니다.

좋은 아이디어와 코드를 제공해주는 [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/)에게 감사를 표합니다.

일본어 번역을 맡고 있는 [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) 와 [Sawako](https://twitter.com/sawakohome) 에게 감사를 표합니다. [Japanese translation (日本語訳)](?lan=jp)

중국어 번역을 맡고 있는 [Tong Li](https://www.facebook.com/tong.lee.9484) 와 [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) 에게 감사를 표합니다. [Chinese translation (中国的翻译)](?lan=ch)

한국어 번역을 맡고 있는 [유재현](https://www.facebook.com/fkkcloud) 과  [김준](https://github.com/rlawns324) 에게 감사를 표합니다. [Korean translation (한국어)](?lan=kr)

스페인어 번역을 맡고 있는 Nahuel Coppero (Necsoft) 에게 감사를 표합니다. [Español translation](?lan=es)

포르투갈어 번역을 맡고 있는 [Raphaela Protásio](https://github.com/Rawphs) 와 [Lucas Mendonça](https://github.com/luuchowl) 에게 감사를 표합니다. [Portugues translation](?lan=pt)

프랑스어 번역을 맡고 있는 [Nicolas Barradeau](https://twitter.com/nicoptere) 와 [Karim Naaji](http://karim.naaji.fr/) 에게 감사를 표합니다. [Français translation](?lan=fr)

이탈리아어 번역을 맡고 있는 [Andrea Rovescalli](https://www.earove.info) 에게 감사를 표합니다. [Italiano translation](?lan=it)

독일어 번역을 맡고 있는 [Michael Tischer](http://www.mitinet.de) 에게 감사를 표합니다.[Deutsch translation](?lan=de)

러시아어 번역을 맡고 있는 [Sergey Karchevsky](https://www.facebook.com/sergey.karchevsky.3) 에게 감사를 표합니다. [Russian translation](?lan=ru)

러시아어 번역을 맡고 있는 [Manoylov Andriy](https://twitter.com/ManoylovAC) 에게 감사를 표합니다. [Ukrainian translation (українська)](?lan=ua)

[pdf/epub 배포](https://thebookofshaders.com/appendix/02/) 수정 및 개선을 맡고 있는 [Andy Stanton](https://andy.stanton.is/) 에게 감사를 표합니다.

이 프로젝트를 격려해주시고 기부해주신 모든 분들께 감사를 드립니다. [Contributed with fixes](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors)

## 새로운 챕터 업데이트 받기

뉴스 업데이트를 위해 팔로우 해주세요. follow it on [Twitter](https://twitter.com/bookofshaders) / <a rel="me" href="https://mastodon.gamedev.place/@bookofshaders">Mastodon</a> / [Discord](shader.zone) 

<div id="fd-form-623359074e5181d777e479f9"></div>
<script>
  window.fd('form', {
    formId: '623359074e5181d777e479f9',
    containerEl: '#fd-form-623359074e5181d777e479f9'
  });
</script>
