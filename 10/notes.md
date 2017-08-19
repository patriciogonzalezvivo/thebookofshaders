### Nicolas

 * L38 *It returns a single float value between ```0.0``` and ```1.0``` depending on the alignment of two vectors.*

 in fact it is the Cosine of the angle formed by 2 vectors multiplied by the length of each vectors : **cos( a ) * length( v0 ) * length( v1 )**
 if we use normalised vectors, the cos() is multiplied by 1 * 1 and returns a number between *-1 and 1*.

 also, if the result is positive, both vectors point in the same direction, if zero, they're perpendicualer, if negative, they point in opposite directions.

 * L62 famous**e** typo en
