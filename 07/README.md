## Shapes

![Alice Hubbard, Providence, United States, ca. 1892. Photo: Zindman/Freemont.](froebel.jpg)

Finally! We have been building skills for this moment! You have learned most of the GLSL foundations, types and functions. You have practiced your shaping equations over and over. Now is the time to put it all together. You are up for this challenge! In this chapter you'll learn how to draw simple shapes in a parallel procedural way. 

### Rectangle

Imagine we have grid paper, like the one we used in math classes, and the homework is to draw a square. The paper size is 10x10 and the square is supposed to be 8x8. What will you do?

![](grid_paper.jpg)

You'd paint everything except the first and last rows and the first and last column, right? How does this relate to shaders? Each little square of our grid paper is a thread (a pixel). Each little square knows its position, like the coordinates of a chess board. In previous chapters we have mapped *x* and *y* to the *red* and *green* color channels, ____we learn that’s our field and space. A narrow two dimensional territory between 0.0 and 1.0.____ How we can use this to draw a centered square in the middle of our billboard?

* Sketch a piece of code that uses ```if``` statements over our spatial field. The principles to do this are remarkably similar to how we think of the grid paper scenario.

____the above is really confusing... what are people supposed to sketch a piece of code about???____

Well done! ____people aren't going to be able to do the above by themselves, so this "Well done!" is almost kind of rude____ This is a great step and accomplishment. And speaking about steps, how can we simplify this code that uses ```if``` statements with [```step()```](../glossary/index.html#step.md) functions? Take a look at the following code. ____you need to step people through this more, and include the 'if' statement code____

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    float left = step(0.1,st.x);
    float bottom = step(0.1,st.y);
    
    color = vec3( left * bottom );

    gl_FragColor = vec4(color,1.0);
}
```

____in general more commenting of the code would be useful throughout the whole chapter____

Here we are using [```step()```](../glossary/index.html#step.md) to turn everything below 0.1 to black (```vec3(0.0)```). That makes a line on the bottom and left side of the canvas.

![](rect-01.jpg)

If we look closely, in the previous code we repeat the structure for each axis (left and bottom). We can save some lines of code by passing two values directly to [```step()```](../glossary/index.html#step.md) and treating them in the same way with the same function. Check out the following code.

<div class="codeAndCanvas" data="rect-making.frag"></div>

____above needs some commenting to make it more clear____

But this rectangle is not centered ____??? it looks centered____; it's in the top right corner. We need to “take out” equal pieces from both extremes on bottom-left and top-right to obtain a centered square.

So, to repeat this on the top-right side, by uncommenting lines 21 and 22 we invert the ```st``` gradient and repeat the same [```step()```](../glossary/index.html#step.md) function. That way the ```vec2(0.0,0.0)``` will be in the top right corner. This is the digital equivalent of flipping the page and repeating the previous procedure.

____this is just really, really confusing to me but that might just be my brain right now____

![](rect-02.jpg)

Interesting right? This drawing method works for any square with the assumption ____that each one only know it coordinate position____. This drawing technique is all about flipping and stretching this coordinate system.

____you need an example here of what you're describing above - a bunch of different rectangles at different positions____

Before going forward, let’s use the simplicity of the rectangle as a training case. Try the following challenges:

* Can you simplify the lines between 16 and 21 into two lines? What about one line?

* Experiment with the same code but using [```smoothstep()```](../glossary/index.html#smoothstep.md) instead of [```step()```](../glossary/index.html#step.md). Note that by changing values, you can go from blurred edges to elegant smooth borders.

* Do another implementation that uses [```floor()```](../glossary/index.html#floor.md).

* How can you draw rectangles of different sizes instead of just squares?

* Choose the implementation you like the most and make a function of it that you can reuse in the future. Make your function flexible and efficient.

* Make another function that just draws the outline of a rectangle.

* How do you think you can move and place different rectangles in the same billboard? If you figure out how, show off your skills by making a composition of rectangles and colors that resembles a [Piet Mondrian](http://en.wikipedia.org/wiki/Piet_Mondrian) painting.

![Piet Mondria - Tableau (1921)](mondrian.jpg)

### Circles

It's easy to draw squares on grid paper; in the same way it's simple to draw rectangles on cartesian coordinates. But circles requires another approach, especially ____if we need to come up with a "per-pixel" or "per-square" approach____. One solution is to *re-map* the spatial coordinates so that we can use a [```step()```](../glossary/index.html#step.md) function to draw a circle. 

How? Let's start by going back to math class and the grid paper, where we used to open a compass to the desired radius of a circle, press one of the compass points at the center of the circle and then trace the edge of the circle with a simple spin.

![](compass.jpg)

Translating this to a shader where each square on the grid paper is a pixel implies *asking* each pixel (or thread) if it is inside the area of the circle. We do this by computing the distance from the pixel to the center of the circle. 

![](circle.jpg)

There are several ways to calculate that distance. The easiest one uses the [```distance()```](../glossary/index.html#distance.md) function, which internally computes the [```length()```](../glossary/index.html#length.md) of the difference between two points (in our case the pixel coordinate and the center of the canvas). The ```length()``` function is nothing but a shortcut of the [hypotenuse equation](http://en.wikipedia.org/wiki/Hypotenuse) that uses square root ([```sqrt()```](../glossary/index.html#sqrt.md)) internally.

![](hypotenuse.png)

You can use [```distance()```](../glossary/index.html#distance.md), [```length()```](../glossary/index.html#length.md) or [```sqrt()```](../glossary/index.html#sqrt.md)) to calculate the distance to the center of the billboard. The following code contains these three functions and the non-surprising fact that each one returns exactly same result.

* Comment and uncomment lines to try the different ways to get the same result.

<div class="codeAndCanvas" data="circle-making.frag"></div>

____above needs 'vec2 tC = ...' under part (c) so that each part stands alone____

In the previous example we map the distance to the center of the billboard to the color brightness of the pixel. The closer a pixel is to the center, the lower (darker) value it has. Notice that the values don't get too high because from the center ( ```vec2(0.5, 0.5)``` ) the maximum distance barely goes over 0.5. Contemplate this map and think:

* What you can infer from it? 

* How we can use this to draw a circle?

* Modify the above code in order to contain the circular gradient inside the canvas. ____I'm not sure what this means____

### Distance field

Imagine the above example as an inverse altitude map, where darker implies taller. The gradient shows us something similar to the pattern made by a cone. ____Imagine yourself on the top of that cone, under your foot you hold the tip of a ruled tape while the rest of it goes down the hill. Because you are in the center of the canvas, the ruler will mark "0.5" in the extreme. (This isn't quite right the way it's written)____  ____This will be constant in all your directions. (This is confusing) ____ By choosing where to “cut” the cone you will get a bigger or smaller circular surface.

![](distance-field.jpg)

Basically we are using a re-interpretation of the space (based on the distance to the center) to make shapes. This technique is known as a “distance field” and is use in different ways from font outlines to 3D graphics.

Try the following exercises:
 
* Use [```step()```](../glossary/index.html#step.md) to turn everything above 0.5 to white and everything below to 0.0.

* Inverse the colors of the background and foreground.

* Using [```smoothstep()```](../glossary/index.html#smoothstep.md) experiment with different values to get nice smooth borders on your circle.

* Once you are happy with an implementation, make a function of it that you can reuse in the future. 

* Use your function to mask a color with it. ____I don't know what this means____

* Can you animate your circle to grow and shrink, simulating a beating heart?

____show an example of animation if you're going to have exercises about animation____

* What about moving this circle? Can you move it and place different circles in a single billboard?

* What happens if you combine distances fields together using different functions and operations?

```glsl
pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
```

* Make three compositions using this technique. If they are animated, even better!

#### For your tool box

In terms of computational power the [```sqrt()```](../glossary/index.html#sqrt.md) function - and all the functions that depend on it - can be expensive. Here is another way to create a circular distance field by using [```dot()```](../glossary/index.html#dot.md) product.

____do you want to describe how this is working at all?____

<div class="codeAndCanvas" data="circle.frag"></div>

### Useful properties of a Distance Field

![Zen garden](zen-garden.jpg)

Distance fields can be used to draw almost everything. Obviously the more complex a shape is, the more complicated its equation will be, but once you have the formula to make distance fields of a particular shape it is very easy to combine and/or apply effects to it, like smooth edges and multiple outlines. Because of this, distances fields are popular in font rendering. ____this is the second time you've mentioned font rendering - it's kind of weird to keep mentioning it without showing (or linking to) and example____

Take a look at the following code.

____note to jen to edit the comments in the code below____

<div class="codeAndCanvas" data="rect-df.frag"></div>

We start by moving the coordinate system to the center and shrinking it in half in order to ____contain the position values____ between -1 and 1. Also on *line 24* we are visualizing the distance field values using a [```fract()```](../glossary/index.html#fract.md) function making it easy to see the pattern they create. The distance field pattern repeats over and over like rings in a Zen garden.

Let’s take a look at the distance field formula on *line 19*. There we are calculating the distance to the position on ```(.3,.3)``` or ```vec3(.3)``` in ____all four sign permutations____ (that’s what [```abs()```](../glossary/index.html#abs.md) is doing there). 

If you uncomment *line 20*, you will note that we are combining the distances to these four points using the [```min()```](../glossary/index.html#min.md) to zero. The result produces an interesting new pattern.

Now try uncommenting *line 21*, we are doing the same but using the [```max()```](../glossary/index.html#max.md) function. The result is a rectangle with rounded corners. Note how the rings of the distance field get smoother the further away they get from the center.

Finish uncommenting *lines 27 to 29* one by one to understand the different uses of a distance field pattern.

### Polar shapes

![Robert Mangold - Untitled (2008)](mangold.jpg)

In the chapter about color we map the cartesian coordinates to polar coordinates by calculating the *radius* and *angles* of each pixel with the following formula:

```glsl
    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);
```

We use part of this formula at the beginning of the chapter to draw a circle. We calculated the distance to the center using [```length()```](../glossary/index.html#length.md). Now that we know about distance fields we can learn another way of drawing shapes using polar coordinates. 

This technique is a little restrictive but very simple. It consists of changing the radius of a circle depending on the angle to achieve different shapes. How does the modulation work? Yes, using shaping functions!

Below you will find the same functions in the cartesian graph and in a polar coordinates shader example (between *lines 21 and 25*). Uncomment the functions one-by-one, paying attention the relationship between one coordinate system and the other.

<div class="simpleFunction" data="y = cos(x*3.);
//y = abs(cos(x*3.));
//y = abs(cos(x*2.5))*0.5+0.3;
//y = abs(cos(x*12.)*sin(x*3.))*.8+.1;
//y = smoothstep(-.5,1., cos(x*10.))*0.2+0.5;"></div>

<div class="codeAndCanvas" data="polar.frag"></div>

Try to:

* Animate these shapes.
* Combine different shaping functions to *cut holes* in the shape to make better flowers, snowflakes and gears.
* Use the ```plot()``` function we were using on the *Shaping Functions Chapter* to draw just the contour.

### Combining powers

____Now that we've learned how to modulate the radius of a circle according to the angle using the [```atan()```](../glossary/index.html#atan.md) to draw different shapes, we can learn how use ```atan()``` with distance fields, and apply all the tricks and effects possible with them.____

The trick will use the number of edges of a polygon to construct the distance field using polar coordinates. Check out [the following code](http://thndl.com/square-shaped-shaders.html) from [Andrew Baldwin](https://twitter.com/baldand). 

<div class="codeAndCanvas" data="shapes.frag"></div>

* Using this example, make a function that inputs the position and number of corners of a desired shape and returns a distance field value.

* Mix distance fields together using [```min()```](../glossary/index.html#min.md) and [```max()```](../glossary/index.html#max.md).

* Choose a geometric logo to replicate using distance fields.

Congratulations! You have made it through the rough part! Take a break and let these concepts settle - drawing simple shapes in Processing is easy but not here. In shader-land ____everything the way to thing on shapes is twisted____ and it can be exhausting to adapt to this new paradigm of coding.

Now that you know how to draw shapes I'm sure new ideas will pop into your mind. ____In the following chapter we will learn more about how to move, rotate and scale them moving. This will allow you to compose them!____
