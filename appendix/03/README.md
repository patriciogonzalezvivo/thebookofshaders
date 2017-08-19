## How can I collaborate with this book?

Thanks for being willing to collaborate! There are plenty of ways you can:

- Translating content
- Improving the [```glossary/``` section](https://github.com/patriciogonzalezvivo/thebookofshaders/tree/master/glossary)
- Editing content
- Sharing your shaders examples through [the on-line editor](http://editor.thebookofshaders.com/) to

### Translating content

This book is written in [Markdown language](https://daringfireball.net/projects/markdown/syntax) so it's very easy to edit and work on it.

1. Start by going to [github's repository at ```github.com/patriciogonzalezvivo/thebookofshaders```](https://github.com/patriciogonzalezvivo/thebookofshaders). Take a look at the files and folders inside it. You will note that the content is in the ```README.md``` and other files with capital letters like: ```TITLE.md```, ```SUMMARY.md```, etc. Also note that translations are hosted in files with names ending in two letters referencing the language they are for, ex.: ```README-jp.md```, ```README-es.md```, etc.

2. Fork the repository and clone it in your computer.

3. Duplicate the content of the files want to translate. Remember to add to the two letters that makes reference to the language you are translating to the files you will work on.

4. Translate the content line by line (see **Translation notes**).

5. Test it (see **Testing**).

6. Push to your own github fork to then make a [Pull Request](https://help.github.com/articles/using-pull-requests/)

#### Translating notes

Do not erase or modify things the embedded examples, that looks like this:

```html
    <div class="codeAndCanvas" data="grid-making.frag"></div>
```

or

```html
<div class="simpleFunction" data="y = mod(x,2.0);"></div>
```

#### Testing

Start running a local PHP server inside the local repository folder:

```bash
php -S localhost:8000
```

Then in your browser search for ```localhost:8000``` go to the chapter you are translating and add ```?lan=``` followed by the two letters you used to mark the language you are translating to.

For example, if you are translating the chapter ```03``` to french you had been working with the file ```03/README-fr.md``` and you can test it by going to: ```http://localhost:8000/03/?lan=fr```

### Improving the glossary section

This section is under development. We are happy to listen to your ideas on how to make it a friendly tool for all. Send us a message to [@bookofshaders](https://twitter.com/bookofshaders).

### Editing content

We are all humans. If you see something say something and make a Pull Request or open an issue. Thanks!

### Sharing your shaders examples

You will see a lot of links to [the on-line editor](http://editor.thebookofshaders.com/) and embedded instances of it.  
Once you code something that makes you proud, click the "Export" (or the ```⇪``` icon) and then copy the "URL to code...". Send it to [@bookofshaders](https://twitter.com/bookofshaders) or [@kyndinfo](https://twitter.com/kyndinfo). We are looking forward to see it and add it to [the example gallery section](https://thebookofshaders.com/examples/).
