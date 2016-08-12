<canvas id="custom" class="canvas" data-fragment-url="src/moon/moon.frag" data-textures="src/moon/moon.jpg" width="350px" height="350px"></canvas>

# The Book of Shaders
*by [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) and [Jen Lowe](http://jenlowe.net/)*

This is a gentle step-by-step guide through the abstract and complex universe of Fragment Shaders.

<div class="header">
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B5FSVSHGEATCG" style="float: right;"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt=""></a>
</div>

## Contents

* [About this book](00/)

* Getting started
    * [What is a shader?](01/)
    * [“Hello world!”](02/)
    * [Uniforms](03/)
	* [Running your shader](04/)

* Algorithmic drawing
    * [Shaping functions](05/)
    * [Colors](06/)
    * [Shapes](07/)
    * [Matrices](08/)
    * [Patterns](09/)

* Generative designs
    * [Random](10/)
    * [Noise](11/)
    * [Cellular noise](12/)
    * [Fractional brownian motion](13/)
    * [Fractals](14/)

* Image processing:
    * [Textures](15/)
    * [Image operations](16/)
    * [Kernel convolutions](17/)
    * [Filters](18/)
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
	* [How can I navigate this book offline?](appendix/00/)
	* [How to run the examples on a RaspberryPi?](appendix/01/)
	* [How to print this book?](appendix/02/)
    * [How can I collaborate?](appendix/03/)
    * [An introduction for those coming from JS](appendix/04/) by [Nicolas Barradeau](http://www.barradeau.com/)

* [Examples Gallery](examples/)

* [Glossary](glossary/)

## About the Authors

[Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) (1982, Buenos Aires, Argentina) is a New York based artist and developer. He explores interstitial spaces between organic and synthetic, analog and digital, individual and collective. In his work he uses code as an expressive language with the intention of developing a better together.

Patricio studied and practiced psychotherapy and expressive art therapy. He holds an MFA in Design & Technology from Parsons The New School, where he now teaches. Currently he works as a Graphic Engineer at Mapzen making openSource mapping tools.

<div class="header"> <a href="http://patriciogonzalezvivo.com/" target="_blank">WebSite</a> - <a href="https://twitter.com/patriciogv" target="_blank">Twitter</a> - <a href="https://github.com/patriciogonzalezvivo" target="_blank">GitHub</a> - <a href="https://vimeo.com/patriciogv" target="_blank">Vimeo</a> - <a href="https://www.flickr.com/photos/106950246@N06/" target="_blank"> Flickr</a></div>

[Jen Lowe](http://jenlowe.net/) is an independent data scientist and data communicator at Datatelling where she brings together people + numbers + words. She teaches in SVA's Design for Social Innovation program, cofounded the School for Poetic Computation, taught Math for Artists at NYU ITP, researched at the Spatial Information Design Lab at Columbia University, and contributed ideas at the White House Office of Science and Technology Policy. She's spoken at SXSW and Eyeo. Her work has been covered by The New York Times and Fast Company. Her research, writing, and speaking explore the promises and implications of data and technology in society. She has a B.S. in Applied Math and a Master's in Information Science. Often oppositional, she's always on the side of love.

<div class="header"> <a href="http://jenlowe.net/" target="_blank">WebSite</a> - <a href="https://twitter.com/datatelling" target="_blank">Twitter</a> - <a href="https://github.com/datatelling" target="_blank">GitHub</a></div>

## Acknowledgements

Thanks [Scott Murray](http://alignedleft.com/) for the inspiration and advice.

Thanks [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo), [Nicolas Barradeau](https://twitter.com/nicoptere), [Karim Naaji](http://karim.naaji.fr/) for contributing with support, good ideas and code.

Thanks [Kenichi Yoneda (Kynd)](https://twitter.com/kyndinfo) and [Sawako](https://twitter.com/sawakohome) for the [Japanese translation (日本語訳)](?lan=jp)

Thanks [Tong Li](https://www.facebook.com/tong.lee.9484) and [Yi Zhang](https://www.facebook.com/archer.zetta?pnref=story) for the [Chinese translation (中文版)](?lan=ch)

Thanks [Jae Hyun Yoo](https://www.facebook.com/fkkcloud) for the Korean [translation (한국어)](?lan=kr)

Thanks [Nahuel Coppero (Necsoft)](http://hinecsoft.com/) for the Spanish [translation (español)](?lan=es)

Thanks [Nicolas Barradeau](https://twitter.com/nicoptere) and [Karim Naaji](http://karim.naaji.fr/) for the French [translation (français)](?lan=fr)

Thanks to everyone who has believed in this project and [contributed with fixes](https://github.com/patriciogonzalezvivo/thebookofshaders/graphs/contributors) or donations.

## Get new chapters

Sign up for the news letter or [follow it on Twitter](https://twitter.com/bookofshaders)

 <form style="border:1px solid #ccc;padding:3px;text-align:center;" action="https://tinyletter.com/thebookofshaders" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/thebookofshaders', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"><a href="https://tinyletter.com/thebookofshaders"><p><label for="tlemail">Enter your email address</label></p></a><p><input type="text" style="width:140px" name="email" id="tlemail" /></p><input type="hidden" value="1" name="embed"/><input type="submit" value="Subscribe" /><p><a href="https://tinyletter.com" target="_blank"></a></p></form>
