# Introduktion

<canvas id="custom" class="canvas" data-fragment-url="cmyk-halftone.frag" data-textures="vangogh.jpg" width="700px" height="320px"></canvas>

Billederne ovenfor blev lavet på forskellig vis. Det første blev lavet af Van Gogh's hånd der tilføjede lag efter lag af maling. Det tog ham timer. Det andet blev produceret på sekunder ved kombinationen af fire matrixer bestående af pixels: en til cyan, en til magenta, en til gul og til sidst en til sort. Den primære forskel er at det andet billede er produceret via en ikke seriel metode (det ikke step-by-step, men det hele på en gang).

Denne bog omhandler den revolutionere komputerings teknik, *fragment shaders*, der tager digitalt genererede billeder til et nyt niveau. Du kan på det på lige fod med Gutenberg's presse for computer grafik.

![Gutenberg's presse](gutenpress.jpg)

Fragment shaders giver dig total kontrol over de pixels der bliver renderet på skærmen med en voldsom hastighed. Det er derfor de bliver brugt i alle former for situationer, fra video filtre på telefoner til utrolige 3D video spil.

![Journey by That Game Company](journey.jpg)

I de følgende kapitler vil du få en indsigt i hvor utrolig hurtig og kraftful denne teknik er og hvordan man påfører den til dit professionelle eller personlige arbejde.

## Hvem kan bruge denne bog?

Denne bog er skrevet til kreative programmører, spil udviklere og ingeniører som har programmerings erfaring, en basisk forståelse af lineær algebra og trigonometri, og som ønsker at tage deres arbejde til et spændende nyt niveau af grafisk kvalitet. (Hvis du vil lære at programmere, kan jeg varmt anbefale at du starter med [Processing](https://processing.org/) og kommer tilbage senere når du føler dig komfortabel i brugen af det.)

Denne bog vil lære dig at bruge og integrere shaders ind i dine projekter, optimere deres yde-evne og grafiske kvalitet. Fordi at GLSL (OpenGL Shading Language) shaders kompilerer og kan køre på mange platforme, vil det være muligt at bruge hvad du har lært i et hvilket som helst miljø der bruger OpenGL, OpenGL ES eller WebGL. Med andre ord, ville du kunne bruge din viden med [Processing](https://processing.org/) sketches, [openFrameworks](http://openframeworks.cc/) applications, [Cinder](http://libcinder.org/) interactive installations, [Three.js](http://threejs.org/) websites or iOS/Android games.

## Hvad dækker denne bog?

Bogen her vil fokusere på GLSL pixel shaders. Først definerer vi hvad en shader er; derefter vil vi lære hvordan man laver proceduremæssige former, mønstre, teksturer og animationer med dem. Du vil lære det grundlæggende af GLSL og brug det i flere nyttige scenarier som for eksempel: billede processering (billede behandling, matrix viklinger, sløringer, farve filtre, opslagsværker og andre effekter) og simulationer (Conway's game of life, Gray-Scott's reaction-diffusion, vand krusninger, vandfarve effekter, Voronoi cells, etc.). Mod slutningen af bogen vil vi se flere eksempler på avancerede teknikker baseret på Ray Marching.

*Der er interaktive eksempler som du kan lege med i hvert kapitel.* Når du ændrer på koden, vil du se forskellen med det samme. Koncepterne kan være abstrakte og forvirrende, så de interaktive eksempler er essentielle for at hjælpe dig med at lære dette materiale. Jo hurtigere du får koncepter fra hånden jo nemmere bliver lærings processen.

Hvad dækker denne bog ikke?

* Dette *er ikke* en OpenGL eller WebGL bog. OpenGL/WebGL er et større emne end GLSL og fragment shaders. For at lære mere omkring OpenGL/WebGL anbefaler at tage et kig på [OpenGL Introduction](https://open.gl/introduction), [the 8th edition of the OpenGL Programming Guide](http://www.amazon.com/OpenGL-Programming-Guide-Official-Learning/dp/0321773039/ref=sr_1_1?s=books&ie=UTF8&qid=1424007417&sr=1-1&keywords=open+gl+programming+guide) (også kendt som the red book) eller [WebGL: Up and Running](http://www.amazon.com/WebGL-Up-Running-Tony-Parisi/dp/144932357X/ref=sr_1_4?s=books&ie=UTF8&qid=1425147254&sr=1-4&keywords=webgl).

* Dette *er ikke* en matematik bog. Selvom vi dækker op til flere algoritmer og teknikker der afhænger af kendskab til algebra og trigonometri, vil vi ikke forklarer dem i detaljer. Har du spørgsmål til matematikken anbefaler jeg at have en af de følgende bøger ved hånden: [3rd Edition of Mathematics for 3D Game Programming and computer Graphics](http://www.amazon.com/Mathematics-Programming-Computer-Graphics-Third/dp/1435458869/ref=sr_1_1?ie=UTF8&qid=1424007839&sr=8-1&keywords=mathematics+for+games) eller [2nd Edition of Essential Mathematics for Games and Interactive Applications](http://www.amazon.com/Essential-Mathematics-Games-Interactive-Applications/dp/0123742978/ref=sr_1_1?ie=UTF8&qid=1424007889&sr=8-1&keywords=essentials+mathematics+for+developers).

## Hvad skal jeg bruge for at komme igang?

Ikke meget! Hvis du har en moderne browser der kan håndtere WebGL (såsom Chrome, Firefox eller Safari) og en internet forbindelse, kan du klikke på "Next" i bunden af siden for at komme igang.

Alternativt, baseret på hvad du har eller hvad du skal bruge fra denne bog kan du:

- [Lave en off-line version af bogen](https://thebookofshaders.com/appendix/00/)

- [Køre de interaktive eksempler på en Raspberry Pi uden en browser](https://thebookofshaders.com/appendix/01/)

- [Lave en PDF kopi af bogen og printe den](https://thebookofshaders.com/appendix/02/)

- Tjek [Github repositoriet](https://github.com/patriciogonzalezvivo/thebookofshaders) på denne bog for at hjælpe med at løse problemer eller dele kode.