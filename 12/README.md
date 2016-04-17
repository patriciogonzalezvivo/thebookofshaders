## Emergin patterns

We made pseudo random values from a sine wave, then from it we construct noise. We went from the absolute chaos to smooth random variations we can control.
With it we were able to suggest more organic visual gestures. But we still far away from the “real” thing. If we look to satelites images, coherent structers emerge from mountans formation, looking closely to the surface of a leave we will see a clear an inner pattern. This surfaces speaks about the forces involve on their creation. On the tension of the laws applied apply to them together with the forces of their surrandings.
The next step in our quest on learning how to mimic nature will be to learn about iterations. More precisely iterations on time and iterations on space.

## Fractal Brownian Motion

Noise tends to means different things for different people. Musicians will think it in disturbing sounds, communicators as interference and astrophysics as cosmic microwave background. In fact most of this concept have one things in common that bring as back to the begining of random. Waves and their properties. Audio or electromagnetical waves, fluctuation overtime of a signal. That change happens in amplitud and frequency. The ecuation for it looks like this:

<div class="simpleFunction" data="
float amplitud = 1.;
float frequency = 1.;
y = amplitud * sin(x * frequency);
"></div>

* Try changing the values of the frequency and amplitud to understand how they behave.
* Using shaping functions try changing the amplitud overtime.
* Using shaping function try changing the frequency overtime.

By doing the last to excersize you have manage to "modulate" a sine wave, and you just create AM (amplitud modulated) and FM (frequency modulated) waves. Congratulations!

Another interesting property of waves is their ability to add up. Uncomment the lines one by one paying atention how the frequencies and amplitudes change conform we add different waves. 

<div class="simpleFunction" data="
float t = 0.01*(-u_time*130.0);
y += sin(x*2.1 + t)*4.5;
//y += sin(x*1.72 + t*1.121)*4.0;
//y += sin(x*2.221 + t*0.437)*5.0;
//y += sin(x*3.1122+ t*4.269)*2.5;
y *= 0.1;
"></div>

* Experiment by changing their values.
* Is it possible to cancel two waves? how that will look like?
* Is it possible to add waves in such a way that they will amplify each other? 

All musicians know that sound is waves. Waves carried by air and produced by the vibration of something at particular frequencies. They also know that are particular groups of frequencies that play well together. Those sound vibrate in such a particular way that the resultan frequencies seams resonate as unite. Those sounds are call [harmonics](http://en.wikipedia.org/wiki/Harmonic).

Back to code, we can experiment by adding on several iterations a waves of a lower octave and a fraction of the amplitud. Each octave is know as a phase, a cicle that repites every PI (3.1415...). Take a look to the following code.

<div class="simpleFunction" data="y = 0.;
for( int i = 0; i < 2; i++) {
    float amplitud = 1./float(i);
    float frequency = PI * float(i);
    y += amplitud * sin(x * frequency);
}
y *= 0.6;"></div>

* Try changing de ```2``` on the for look for bigger numbers.

Note how augmenting the number of iterations (chaining the 5 for a 10, a 20 or 50) the wave tends to break into smaller fractions, with more details and sharper fluctuations.

We can use this property with noise. By adding different octaves of increasing frequencies and decreasing amplitudes of **noise** we can obtain a bigger level of detail or granularity. This technique is call Fractal Brownian Motion and usually consist on a fractal sum of noise functions. 

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


