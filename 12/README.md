## Celluar noise

We had made pseudo random values from a sine wave, then from it we construct noise. We went from the absolute chaos to smooth random variations we can control.
With it we were able to suggest more organic visual gestures. But we still far away from the “real” thing. If we look to satelites images, coherent structers emerge from mountans formation, looking closely to the surface of a leave we will see a clear an inner pattern. This surfaces speaks about the forces involve on their creation. On the tension of the laws applied apply to them together with the forces of their surrandings.
The next chapters in our quest on learning how to mimic nature will be to learn about iterations. More precisely iterations on time and iterations on space.

### Distance field of 4 points

Let's start by making a distance field of four points. Each single pixel will iterate throught all the points and store the value to the most close one. For that we can use a ```for``` loop to iterate through an array of points and keep track of the minimum distance using a [```min()```](../glossary/?search=min) function. 

```glsl
    float m_dist = 1.;  // minimun distance
    for (int i = 0; i < TOTAL_POINTS; i++) {
        float dist = distance(st, points[i]);
        m_dist = min(m_dist, dist);
    }
```

<div class="codeAndCanvas" data="cellnoise-00.frag"></div>

As you can see in the above code I add the mouse position to give and idea of how this algorithm behaves:

- Can you think in a to animate the rest of the points?
- After reading [the chapter about shapes](../07/) we learn different and interesting ways of using distance fields to draw patterns. Can you imagine something interesting that use this distance field?
- What if you want to add more points to this distance field?

### Tiling and iterating

Well if you have to scale the previus example with a bigger set of points you will discover that is actually very hard to do that in an efficient way.

<div class="codeAndCanvas" data="cellnoise-01.frag"></div>

```glsl
    ...
    m_dist = min(m_dist, m_dist*dist);
    ...
```

<a href="../edit.html#12/metaballs.frag"><canvas id="custom" class="canvas" data-fragment-url="metaballs.frag"  width="520px" height="200px"></canvas></a> 

[Inigo Quilez voronoi borders article](http://www.iquilezles.org/www/articles/smoothvoronoi/smoothvoronoi.htm)

*"Before continuing, it might be worth noting that there's a nice trick in this code above. Most implementations out there suffer from precission issues, because they generate their random points in "domain" space (like "world" or "object" space), which can be arbitrarily far from the origin. One can solve the issue moving all the code to higher precission data types, or by being a bit clever. My implementation does not generate the points in "domain" space, but in "cell" space: once the integer and fractioanl parts of the shading point are extracted and therefore the cell in which we are working identified, all we care about is what happens around this cell, meaning we can drop all the integer part of our coordinates away all together, saving many precision bits. In fact, in a regular voronoi implementation the integer parts of the point coordinates simply cancel out when the random per cell feature points are substracted from the shading point. In the implementation above, we don't even let that cancelation happen, cause we are moving all the computations to "cell" space. This trick also allows one to handle the case where you want to voronoi-shade a whole planet - one could simply replace the input to be double precission, perform the floor() and fract() computations, and go floating point with the rest of the computations without paying the cost of changing the whole implementation to double precission. Of course, same trick applies to Perlin Noise patterns (but i've never seen it implemented nor documented anywhere)."*

### Voronoi Algorithm

<div class="codeAndCanvas" data="vorono-00.frag"></div>

This is not scalable

<div class="codeAndCanvas" data="vorono-01.frag"></div>

[Inigo Quilez voronoi borders article](http://www.iquilezles.org/www/articles/voronoilines/voronoilines.htm)

<a href="../edit.html#12/2d-voronoi.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoi.frag"  width="520px" height="200px"></canvas></a> 
 
[Inigo Quilez article about voronoise](http://www.iquilezles.org/www/articles/voronoise/voronoise.htm)
<a href="../edit.html#12/2d-voronoise.frag"><canvas id="custom" class="canvas" data-fragment-url="2d-voronoise.frag"  width="520px" height="200px"></canvas></a> 
