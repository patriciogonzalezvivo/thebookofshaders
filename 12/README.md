## Fractal Brownian Motion

At the end of previus chapter we were thinking on noise as random smooth waves. This *wavely* nature of noise is what makes it such an interdisciplinary concept. In fact, in acustics, sound is constructed by the manipulation of the amplitud and frecuency of a sine waves.

```glsl
y = amplitud + sin( frequency );
```

An interesting property of waves is that they can be add up. The following graph shows what happen if you add sine waves of different frequencies and amplituds. 

<div class="simpleFunction" data="
float t = 0.01*(-u_time*130.0);
y += sin(x*2.1 + t)*4.5;
y += sin(x*1.72 + t*1.121)*4.0;
y += sin(x*2.221 + t*0.437)*5.0;
y += sin(x*3.1122+ t*4.269)*2.5;
y *= 0.1;
"></div>

Think on the surface of the ocean. Massive amount of water propagating waves across it surface. Waves of diferent amplitud and frequencies coliding together.

On other side if those sine waves are harmonics produce interesting patterns. Try the following code on the previus graph. As you can see in each iteration the frequency increase, while the amplitud decrese.

```glsl
y = 0.;
for( int i = 0; i < 5; ++i) {
    y += sin(PI*x*float(i))/float(i);
}
y *= 0.6;
```

## Fractal Brownian Motion

By adding different octaves of increasing frequencies and decreasing amplitudes of noise we can gain some extra granularity. This technique is call Fractal Brownian Motion and is very well documented in [this](http://www.iquilezles.org/www/articles/warp/warp.htm) [two](http://www.iquilezles.org/www/articles/morenoise/morenoise.htm) articles of Iñigo Quilez. 

Take a look to the following example and progresively change the for loop to do 2,3,4,5,6,7 and 8 iterations. See how incrisinly fragmented this wave function becomes.

<div class="simpleFunction" data="
float a = 0.5;
for( int i = 0; i < 1; ++i) {
    y += a * noise(x);
    x = x * 2.0;
    a *= 0.5;
}"></div>

If we apply this to 2D will look like the following code:

<div class="codeAndCanvas" data="2d-fbm.frag"></div>

## Using Fractal Braownian Motion

http://www.iquilezles.org/www/articles/warp/warp.htm

http://www.iquilezles.org/www/articles/morenoise/morenoise.htm

http://www.iquilezles.org/www/articles/dynclouds/dynclouds.htm

<div class="codeAndCanvas" data="clouds.frag"></div>

great!

