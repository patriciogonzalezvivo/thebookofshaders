### nicolas
* after line 23, i've added the following:

Once multiplied by 3, instead of ranging from 0 à 1 on the X and Y axes, ```st``` will range from 0 to **3** on X and Y axes.
If we use ```st * 3.0``` as such, its value will become greater than 1 and we won't be able to use it like we did so far ; it will not be normalised between 0 and 1 anymore.
If we only use the fractional part, we will fall back to a normalised space as the values returned by ```fract()``` is alwys comprised between 0 and 1.
Here's an example of the respective values of ```st```, ```st * 3``` and ```fract( st * 3 )```.
```glsl
first block
st = 0.00 | st * 3 = 0.00 | fract( st * 3 ) = 0.00
st = 0.10 | st * 3 = 0.30 | fract( st * 3 ) = 0.30
st = 0.20 | st * 3 = 0.60 | fract( st * 3 ) = 0.60
st = 0.30 | st * 3 = 0.90 | fract( st * 3 ) = 0.90
second block
st = 0.40 | st * 3 = 1.20 | fract( st * 3 ) = 0.20
st = 0.50 | st * 3 = 1.50 | fract( st * 3 ) = 0.50
st = 0.60 | st * 3 = 1.80 | fract( st * 3 ) = 0.80
third block
st = 0.70 | st * 3 = 2.10 | fract( st * 3 ) = 0.10
st = 0.80 | st * 3 = 2.40 | fract( st * 3 ) = 0.40
st = 0.90 | st * 3 = 2.70 | fract( st * 3 ) = 0.70
st = 1.00 | st * 3 = 3.00 | fract( st * 3 ) = 1.00
```
We can clearly see that on the first *block*, the value of ```st * 3``` is the same as the value of ```fract( st * 3 )```
but after the second *block*, ```st * 3``` is greater than 1 and ```fract( st * 3 )``` remains comprised between 0 and 1.


* after line 70 I've added

In fact, a ternary operator is an ```if``` in disguise, the program is forced to branch and to evaluate both branches of the ```if / else``` which slows the execution down.
In this case, we could write:
```glsl
y = floor( mod( x, 2.0 ) );
```
which will also return 0 if the modulo's result is lower than 1 and 1 if the modulo's result is comprised between 1 & 2.
The main difference being that it needs to load only one value in memory instead of 2 for a ```step()``` evaluation.
We could even get rid of the ```floor``` by ```casting``` (*transtyping*) the modulo's result to ```int``` like so:
```glsl
y = float( int( mod( x, 2.0 ) ) );
```
When *casting* a ```float``` to ```int```, we drop the number after the floating point which is the same as calling the ```floor``` function, (beware to re-cast the result to ```float```).
