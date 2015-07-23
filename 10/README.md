# Generative designs

Is not a surprise that after so much repetition and order the author is force to bring some chaos.

## Random

[![Ryoji Ikeda - test pattern (2008) ](ryoji-ikeda.jpg) ](http://www.ryojiikeda.com/project/testpattern/#testpattern_live_set)

Random is a maximal expression of entropy. How to generate it inside such predictible and rigid enviroment?

Let's start for analizing the following function:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

Above we are extracting the fractional content of a sine wave. The [```sin()```](../glossary/?search=sin) values that fluctuate between ```-1.0``` and ```1.0``` have been chopted behind the floating returning all positive values between ```0.0``` and ```1.0```. We can use this effect to get some pseudo-random values by "breaking" this sine wave in smaller pieces. Why? by multiplying the resultant of [```sin(x)```](../glossary/?search=sin) by bigger numbers. Go a head and click on the function and start adding some zeros.

By the time you get to ```100000.0``` ( and the equation looks like this: ```y = fract(sin(x)*100000.0)``` ) you probably are not hable to distinguish the sine wave any more. The granulary of the fractions have corrupt the flow of the sine in psudo-random chaos.

## Controling chaos

Using random could be hard, is both too chaotic and, sometimes, not random enought. Take a look to the following graph. Inside it, we are using a ```rand()``` fuction implemented exactly like we describe above. 

Taking a closer look, you can se the [```sin()```](../glossary/?search=sin) wave crest and though at ```-1s.5707``` and ```1.5707```. I bet you now understand why. Is where the crest and buttom of the sin wave happend. 

If look closely the random distribution, you will note that the there is some concentration arround the middle compared to the edges.

<div class="simpleFunction" data="y = rand(x);
//y = rand(x)*rand(x);
//y = sqrt(rand(x));
//y = pow(rand(x),5.);"></div>

A while ago [Pixelero](pixelero.wordpress.com) made an [interersting article about random distribution](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/). I add some of the function he use in the following lines of the previus graph for you to play and observe how the distribution can be changed. Uncomment them and see what happen.

If you read [Pixelero's article](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) , is important to have in mind that our ```rand()``` function is a deterministic random or also known as pseudo-random. Which means, for example ```rand(1.)``` is going to return always the same value. [Pixelero](https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/) makes reference to the ActionScript function ```Math.random()``` which is non-deterministic, every call will return a different value.

## 2D Random

Now that we have a better understanding of randomness, is time to apply it on two dimension, for both ```x``` and ```y``` axis. For that we need a way to transform a two dimensional vector into a one dimensional float point value. There are different ways to do this, but the [```dot()```](../glossary/?search=dot) function can be particulary helpfull in this case. It's avility to returning a single float values between ```0.0``` and ```1.0``` depending on the aligniation of two vectos is key to this process.

<div class="codeAndCanvas" data="2d-random.frag"></div>

Take a look to line 13 to 15 and how we are comparing the ```vec2 st``` with a another two dimentional vector ( ```vec2(12.9898,78.233)```).

* Try changing the values on lines 14 and 15. See how the random pattern change and what we can learn from it. 

* Hook this random function to the mouse interaction (```u_mouse```) and time (```u_time```) to understand better how it works.

## Using the chaos

Random in two dimensions looks a lot like TV noise. Right? Which is a hard raw material to use to compose images. Let's learn how to make use of it.

Our first step is going to apply it on a grid to it using the [```floor()```](../glossary/?search=floor) function we will generate a integer table of cells. Take a look to the following code. Specially on lines 22 and 23.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

After scaling the space ten times more (on line 20), we separate the integers of the coordenates from the fractional part. We are familiar with this last operation because we have been usign it to subdevide a space in smaller cells that consistantly go from ```0.0``` to ```1.0```. By obtaining the integer of the coordinate we isolate a common value for all that region of pixels. Which will look like a single cell. Then we can use that common integer to obtain a same random value for all that area. Because the random is deterministic will be constant for all the pixels on that cell.

Uncommenting the line 29 we can still se how we preserve the floating part of it, and how we can use that as a coordinate system to draw things inside.

Combining this two values will allow you to mix variation and order.

Take a look to this GLSL port of the famouse ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` maze generator.

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

On it I'm using the random values of the cells to draw a line in one direction or the other using the ```trouchetPattern()``` function of the previus chapter (lines 41 to 47).

You can get another interesting patterns by uncommenting the block of lines between 50 to 53, or animated by uncommenting lines 35 and 36. 

## Master Random

[Ryoji Ikeda](http://www.ryojiikeda.com/), Japanese electronic composer and visual artist, have master the use of random in such a way is hard not to be touch and mesmerize by his work. Random in audio and visual mediums is forge in such a way is not longer anoying chaos but a mirror of the complexity our over-technological culture.

<iframe src="https://player.vimeo.com/video/76813693?title=0&byline=0&portrait=0" width="800" height="450" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Take a look to [Ikeda](http://www.ryojiikeda.com/)'s work and try the following excersices:

* Make to rows of moving cells (in opposite directions) with random values. Only display the cells with brigter values. Make the velocity of the rows fluctuate over time.

<a href="../edit.html#10/ikeda-00.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-00.frag"  width="520px" height="200px"></canvas></a>

* Similarly make several rows but each one with a different speed and direction. Hook the position of the mouse to threshold of which cells to show.

<a href="../edit.html#10/ikeda-03.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-03.frag"  width="520px" height="200px"></canvas></a>

* Think on other interesting effects 

<a href="../edit.html#10/ikeda-04.frag"><canvas id="custom" class="canvas" data-fragment-url="ikeda-04.frag"  width="520px" height="200px"></canvas></a>

Using random aesthetically could be also problematic, specially if you want to natural-looking simulations. Random is simply too chaotic and not really to many things looks ```random()``` in real life. Usually estocastic values are some how related to the previus one. If you look to a rain pattern, or the wallstreet chart (which both quite random), they are nothing like the random pattern we made at the begining of this chapter. The reason? Well random values have no correlation between them what so ever. 

On the *Next* chapter we will learn about noise, the smooth and *natural looking* way of computational chaos. 
