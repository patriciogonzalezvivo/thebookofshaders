## Fractal Brownian Motion

At the end of previus chapter we were thinking on noise as random waves. This *wavely* nature of noise is what makes it such an interdisciplinary concept. In fact, in acustics, sound is be constructed by the manipulation of the amplitud and frecuency of a sin wave;

```glsl
y = amplitud + sin( frequency );
```

### Harmonics 

An interesting property of waves is that they can be add up. For example, adding harmonic octaves together produce that something like the following graph.

```glsl
for( int i = 0; i < 4; ++i) {
    y += sin(x*PI*float(i))/float(i);
}
y *= 0.6;
```

But on other side adding sine waves of different frequencies and amplituds will produce something very chaotic. 

<div class="simpleFunction" data="
float t = 0.01*(-u_time*130.0);
y += sin(x*2.1 + t)*4.5;
y += sin(x*1.72 + t*1.121)*4.0;
y += sin(x*2.221 + t*0.437)*5.0;
y += sin(x*3.1122+ t*4.269)*2.5;
y *= 0.1;
"></div>

Think on the surface of the ocean. This massive amount of water is propagating waves across it surface. Waves of diferent amplitud and frequencies.

## 1D Fractal Brownian Motion

By adding different octaves of the same noise function we can gain some extra granularity from the noise. Take a look to the following example and progresively change the for loop to do 2,3,4,5,6,7 and 8 iterations. See how incrisinly fragmented this wave function becomes.

"simple sum of perlin noise functions with increasing frequencies and decreasing amplitudes" Iq at http://www.iquilezles.org/www/articles/warp/warp.htm 

<div class="simpleFunction" data="
float a = 0.5;
for( int i = 0; i < 1; ++i) {
    y += a * noise(x);
    x = x * 2.0;
    a *= 0.5;
}"></div>

## 2D Fractal Brownian Motion

This fine level of fragmentation is what we are interested. ...

<div class="codeAndCanvas" data="2d-fbm.frag"></div>

## Using Fractal Braownian Motion

http://www.iquilezles.org/www/articles/warp/warp.htm

http://www.iquilezles.org/www/articles/morenoise/morenoise.htm



http://www.iquilezles.org/www/articles/dynclouds/dynclouds.htm

<div class="codeAndCanvas" data="clouds.frag"></div>

great!

