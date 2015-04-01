## Fractal Brownian Motion

At the end of the previous chapter we were thinking about noise and discovering that in fact noise could be interpreted as audio signals.  In fact sound can be constructed by the manipulation of the amplitud and frequency of a sine waves.

```glsl
y = amplitud + sin( frequency );
```

An interesting property of waves in general is that they can be add up. The following graph shows what happen if you add sine waves of different frequencies and amplitudes. 

<div class="simpleFunction" data="
float t = 0.01*(-u_time*130.0);
y += sin(x*2.1 + t)*4.5;
y += sin(x*1.72 + t*1.121)*4.0;
y += sin(x*2.221 + t*0.437)*5.0;
y += sin(x*3.1122+ t*4.269)*2.5;
y *= 0.1;
"></div>

Think on it as the surface of the ocean. Massive amount of water propagating waves across it surface. Waves of different heights (amplitud) and rhythms (frequencies) bouncing and interfering each other.

Musicians learn long time ago that there are sounds that play well with each other. Those sound, carried by waves of air, vibrate in such a particular way that the resultan sound seams to be bust and enhance. Those sounds are call [harmonics](http://en.wikipedia.org/wiki/Harmonic).

Back to code, we can add harmonics together and see how the resultant looks like. Try the following code on the previous graph.

```glsl
y = 0.;
for( int i = 0; i < 5; ++i) {
    y += sin(PI*x*float(i))/float(i);
}
y *= 0.6;
```

As you can see in the above code, on every iteration the frequency increase by the double. By augmenting the number of iterations (chaining the 5 for a 10, a 20 or 50) the wave tends to break into smaller fractions, with more details and sharper fluctuations.

## Fractal Brownian Motion

So we try adding different waves together, and the result was chaotic, we add up harmonic waves and the result was a consistent fractal pattern. We can use the best of both worlds and add up harmonic noise waves to exacerbate a noise pattern.

By adding different octaves of increasing frequencies and decreasing amplitudes of noise we can obtain a bigger level of detail or granularity. This technique is call Fractal Brownian Motion and usually consist on a fractal sum of noise functions. 

Take a look to the following example and progressively change the for loop to do 2,3,4,5,6,7 and 8 iterations. See want happens

<div class="simpleFunction" data="
float a = 0.5;
for( int i = 0; i < 1; ++i) {
    y += a * noise(x);
    x = x * 2.0;
    a *= 0.5;
}"></div>

If we apply this one dimensional example to a bidimentional space it will look like the following example:

<div class="codeAndCanvas" data="2d-fbm.frag"></div>

## Using Fractal Brownian Motion

In this [article](http://www.iquilezles.org/www/articles/warp/warp.htm) Iñigo Quilez describe an interesting use of fractal brownian motion constructing patterns by adding successive results of fractal brownian motions.

Take a look to the code and how it looks

<div class="codeAndCanvas" data="clouds.frag"></div>


