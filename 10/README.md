# Generative designs

Is not a surprise that after so much repetition and order the author is force to bring some chaos.

## Random

Random is a maximal expression of entropy, but how to generate random inside such predictible, constant and rigid enviroment?

Let's start for analizing the following function:

<div class="simpleFunction" data="y = fract(sin(x)*1.0);"></div>

As you can see, we are extracting only the fractional part of a sine wave. We have done this in the past. We can apreciate and understand how the ```sin()``` function that returns values between ```-1``` and ```1``` have been braked only and forced to be all positive values. We are going to use this effect for our purposes of achinving some random values by "breaking" this sine wave in smaller and smaller pieces. Why? by multiplying the ```sin(x)``` for bigger numbers. Go a head and click on the function and start adding some zeros.

By the time you get to 100000 ( and the equation looks like this: ```y = fract(sin(x)*100000.0)``` ) you probably are not hable to distinguish the sine wave any more. The granulary of the fractions have corrupt the flow of the sine in random chaos.

## 2D Random

Now is time to apply this same principle on both *x* and *y* axis. For that we need a way to transform a two dimensional vector into a one dimensional float point value. There are different ways to do this, but the ```dot()``` function can be very particulary helpfull in this case, becuse of it avility to return a float values between 0 and 1 depending if two vectors are align. 

<div class="codeAndCanvas" data="2d-random.frag"></div>

Take a look to line 11 and 12 and how we are comparing the ```in vec2 _st``` with a ___ vector ( ```vec2(12.9898,78.233)```).

* Try changing the values on lines 12 and 13. See how the random pattern change and what we can learn from it. 

## Using the chaos

Actually randomness in pure form can be too chaotic, letres try to balance it entropy with some order.

Take close look to the following code. Specially on lines 20 and 21.

<div class="codeAndCanvas" data="2d-random-mosaic.frag"></div>

After scaling the space ten times more (line 10), we separate the integers of the coordenates from the fractions. We are familiar with this last operation because we have been usign it to subdevide a space in smaller cells that consistantly go from 0 to 1. By obtaining the integer of the coordinate we isolate a common value for all the threads inside a cell, to then use that integer to obtain a random value. Because the random is deterministic will be constant for all the pixels on that cell as long the random function is the same for all the threads.

Combining this two values will allow you to mix variation and order.

Take a look to this GLSL port of the famouse ```10 PRINT CHR$(205.5+RND(1)); : GOTO 10``` maze generator.

<div class="codeAndCanvas" data="2d-random-truchet.frag"></div>

You can get an interesting variation by uncommenting the block of lines from 48 to 51. In case you want to animate it you can uncoment lines 33 and 34. 

Using random aesthetically can be problematic. It's simply too chaotic and not really to many things looks ```random()``` in real life. Usually estocastic values are some how related to the previus one. If you look to a rain pattern, or the wallstreet chart (which both quite random), they are nothing like the random pattern we made at the begining of this chapter. The reason? Well random values have no correlation between them what so ever. 

On the *Next* chapter we will learn about noise, the smooth and *natural looking* way of computational chaos. 
