## Jak mogę pomóc?

Dziękujemy za chęć współpracy! Jest wiele sposobów pomocy:

- Tłumaczenie treści
- Poprawianie [sekcji ```glosariusz/```](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Edytowanie zawartości
- Dzielenie się swoimi przykładami shaderów poprzez [edytor on-line](http://editor.thebookofshaders.com/)

<!-- ## How can I collaborate with this book?

Thanks for being willing to collaborate! There are plenty of ways you can:

- Translating content
- Improving the [```glossary/``` section](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Editing content
- Sharing your shaders examples through [the on-line editor](http://editor.thebookofshaders.com/) to -->

### Tłumaczenie treści

Ta książka jest napisana w [języku Markdown](https://daringfireball.net/projects/markdown/syntax), więc bardzo łatwo jest ją edytować i pracować nad nią.

1. Zacznij od przejścia do [repozytorium github pod adresem ``github.com/patriciogonzalezvivo/thebookofshaders``](https://github.com/patriciogonzalezvivo/thebookofshaders). Przyjrzyj się znajdującym się w nim plikom i folderom. Zauważysz, że treść znajduje się w pliku ``README.md`` oraz innych plikach z dużymi literami jak: ``TITLE.md``, ``SUMMARY.md``, itd. Zauważ również, że tłumaczenia są hostowane w plikach z nazwami kończącymi się na dwie litery reprezentujące język tłumaczenia, na przykład: ``README-jp.md``, ``README-es.md``, itd.

<!-- ### Translating content

This book is written in [Markdown language](https://daringfireball.net/projects/markdown/syntax) so it's very easy to edit and work on it.

1. Start by going to [github's repository at ```github.com/patriciogonzalezvivo/thebookofshaders```](https://github.com/patriciogonzalezvivo/thebookofshaders). Take a look at the files and folders inside it. You will note that the content is in the ```README.md``` and other files with capital letters like: ```TITLE.md```, ```SUMMARY.md```, etc. Also note that translations are hosted in files with names ending in two letters referencing the language they are for, ex.: ```README-jp.md```, ```README-es.md```, etc. -->

2. Forkuj repozytorium i sklonuj je w swoim komputerze.

3. Zduplikuj zawartość plików, które chcesz przetłumaczyć. Pamiętaj, aby do plików, nad którymi będziesz pracował, dodać dwie litery nawiązujące do języka, który tłumaczysz.

4. Przetłumacz treść linijka po linijce (patrz **Uwagi dotyczące tłumaczenia**).

5. Przetestuj ją (patrz **Testy**).

6. Pushuj na własny fork githuba, aby następnie zrobić [Pull Request](https://help.github.com/articles/using-pull-requests/)

<!-- 2. Fork the repository and clone it in your computer.

3. Duplicate the content of the files want to translate. Remember to add to the two letters that makes reference to the language you are translating to the files you will work on.

4. Translate the content line by line (see **Translation notes**).

5. Test it (see **Testing**).

6. Push to your own github fork to then make a [Pull Request](https://help.github.com/articles/using-pull-requests/) -->

#### Uwagi dotyczące tłumaczenia

Nie wymazuj ani nie modyfikuj rzeczy w osadzonych przykładach, wyglądających tak:

<!-- #### Translating notes

Do not erase or modify things the embedded examples, that looks like this: -->

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

lub

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Testowanie

Rozpocznij uruchamianie lokalnego serwera PHP wewnątrz lokalnego folderu repozytorium:

<!-- #### Testing

Start running a local PHP server inside the local repository folder: -->

```bash
php -S localhost:8000
```

Następnie w przeglądarce wyszukaj ``localhost:8000``, przejdź do rozdziału, który tłumaczysz i dodaj ``?lan=``, a następnie dwie litery, których użyłeś do oznaczenia języka, na który tłumaczysz.

Na przykład, jeśli tłumaczysz rozdział ``03`` na język francuski pracowałeś z plikiem ``03/README-fr.md``, to możesz go przetestować wchodząc na: ``http://localhost:8000/03/?lan=fr``

<!-- Then in your browser search for ```localhost:8000``` go to the chapter you are translating and add ```?lan=``` followed by the two letters you used to mark the language you are translating to.

For example, if you are translating the chapter ```03``` to french you had been working with the file ```03/README-fr.md``` and you can test it by going to: ```http://localhost:8000/03/?lan=fr``` -->

### Ulepszanie glosariusza

Glosariusz jest w trakcie rozwoju. Chętnie wysłuchamy Twoich pomysłów, jak uczynić ją przyjaznym narzędziem dla wszystkich. Wyślij nam wiadomość na adres [@bookofshaders](https://twitter.com/bookofshaders).

### Edycja treści

Wszyscy jesteśmy ludźmi. Jeśli widzisz błąd, daj znać i zrób Pull Request lub otwórz Issue. Dzięki!

<!-- ### Improving the glossary section

This section is under development. We are happy to listen to your ideas on how to make it a friendly tool for all. Send us a message to [@bookofshaders](https://twitter.com/bookofshaders).

### Editing content

We are all humans. If you see something say something and make a Pull Request or open an issue. Thanks! -->

### Dzielenie się przykładami shaderów

Zobaczysz wiele linków do [edytora on-line](http://editor.thebookofshaders.com/) i jego osadzonych instancji.  
Gdy zakodujesz coś, co sprawi, że będziesz dumny, kliknij "Export" (lub ikonę ``⇪``), a następnie skopiuj "URL to code...". Wyślij go do [@bookofshaders](https://twitter.com/bookofshaders) lub [@kyndinfo](https://twitter.com/kyndinfo). Czekamy na nie i dodamy je do [działu galeria przykładów](https://thebookofshaders.com/examples/).

<!-- ### Sharing your shaders examples

You will see a lot of links to [the on-line editor](http://editor.thebookofshaders.com/) and embedded instances of it.  
Once you code something that makes you proud, click the "Export" (or the ```⇪``` icon) and then copy the "URL to code...". Send it to [@bookofshaders](https://twitter.com/bookofshaders) or [@kyndinfo](https://twitter.com/kyndinfo). We are looking forward to see it and add it to [the example gallery section](https://thebookofshaders.com/examples/). -->
