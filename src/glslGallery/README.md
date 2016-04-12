[GlslGallery](https://github.com/patriciogonzalezvivo/glslGallery) is JavaScript tool part of [The Book of Shaders](http://thebookofshaders.com) ecosystem that lets you curate your own gallery of shaders created with [The Book of Shader's editor (glslEditor)](http://editor.thebookofshaders.com).

![](http://patriciogonzalezvivo.com/images/glslGallery/01.gif)

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4BQMKQJDQ9XH6)

## How to use it?

First add [GlslGallery](https://github.com/patriciogonzalezvivo/glslGallery) javascript and CSS files. For example:

```html
    <link type="text/css" rel="stylesheet" href="https://cdn.rawgit.com/patriciogonzalezvivo/glslGallery/gh-pages/build/glslGallery.css">
    <script type="text/javascript" src="https://cdn.rawgit.com/patriciogonzalezvivo/glslGallery/gh-pages/build/glslGallery.js"></script>
```

You can also install it through npm:

```bash
npm install glslGallery
```

Then when you create a new shader on [The Book of Shader's editor ](http://editor.thebookofshaders.com)
[(glslEditor)](https://github.com/patriciogonzalezvivo/glslEditor) you can export two URLs one to the editor and other one to a player. Both use the same log number (ex. `160404125055`).

![](http://patriciogonzalezvivo.com/images/glslGallery/00.gif)

Use those log numbers to curate your own gallery of shaders by adding them to the ```data``` attribute of a ```<div>``` member of the ```class``` name ```glslGallery``` and you are ready to go.

```html
<div class="glslGallery" data="160401213245,160313193711,160313030533,160313025607,160313020334,160308160958,160308014412,160307213819,160306213426,160304203554,160304202332,160302022724,160219112614,160302003807,160302102102,160302101618"></div>
```

There are some properties you can pass to ```glslGallery``` through the ```data-properties``` attribute to customize your gallery.

|propertie | values | default value |
|----------|--------|---------------|
|```clickRun```| ```player``` or ```editor``` | ```player``` |
|```showAuthor```| ```true``` or ```false``` | ```true``` |
|```showTitle```| ```true``` or ```false``` | ```true``` |
|```hoverPreview```| ```true``` or ```false``` | ```true``` |
|```openframe```| ```true``` or ```false``` | ```true``` |

For example you can do:

```html
<div class="glslGallery" data="10/ikeda-00,10/ikeda-03,10/ikeda-04,160401213245,160313193711,160313030533,160313025607,160313020334,160308160958,160308014412" data-properties="clickRun:editor,showAuthor:false,hoverPreview:false"></div>
```

## How to style it?
Then you can style it by overwriting the following css classes:

```
    .glslGallery
    .glslGallery_item
    .glslGallery_thumb
    .glslGallery_canvas
    .glslGallery_credits
    .glslGallery_label
    .glslGallery_title
    .glslGallery_author
```
