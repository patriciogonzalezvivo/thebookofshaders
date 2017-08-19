
- [Distance Transforms of Sampled Functions] (http://cs.brown.edu/~pff/papers/dt-final.pdf)

### nicolas
* after the pseudocode, explain why not using 'if' instead of step( threshold, value  ) as this is (fucking) counter-intuitive :)

* L 61 'That way the ```vec2(0.0,0.0)```'  should rather be : 'That way the ```vec2``` *tl*' to disambiguate it from br which is also a vec2
* L 113 the longest distance between a pixel and the center in a normalised space is: SQRT( 2 ) * 0.5 = ~0.7071..., not 0.5 (also present ion chapter 6)
* L 123 'a bigger or smaller circular surface' a circular surface is called a 'disc' :)
* L 175 a word about Quadrants and its relation to the bi-unit square maybe? or just explaining why we use a bi-unit square instead of the regular 0-1 normalized space...
* L 217 'how use' missing 'to'
