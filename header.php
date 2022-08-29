<!DOCTYPE html>
<?php
    $html_attributes = "";
    if (!empty($_GET['lan']) && $_GET['lan'] == "fa") {
        $html_attributes = 'dir="rtl" lang="fa"';
    }
    echo '
<html '.$html_attributes.'>
    <head>
        <meta charset="utf-8">

        <title>The Book of Shaders'.$subtitle.'</title>';
?>

        <link href="/favicon.gif" rel="shortcut icon"/>
        <meta name="keywords" content="shader,openGL,WebGL,GLSL,book,procedural,generative" />
        <meta name="description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders."/>

        <!— Open Graph data —>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content="The Book of Shaders"/>
        <meta property="og:site_name" content="The Book of Shaders"/>
        <meta property="og:description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders."/>
        <meta property="og:image" content="http://thebookofshaders.com/thumb.png"/>
        <meta property="og:image:secure_url" content="https://thebookofshaders.com/thumb.png"/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />


        <!— Twitter Card—>
        <meta name="twitter:card" content="image">
        <meta name="twitter:site" content="@bookofshaders">
        <meta name="twitter:creator" content="@patriciogv">
        <meta name="twitter:title" content="The Book Of Shaders">
        <meta name="twitter:domain" content="thebookofshaders.com">
        <meta name="twitter:description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders.">
        <meta name="twitter:image" content="https://thebookofshaders.com/thumb.png">
        <meta name="twitter:image:width" content="500">
        <meta name="twitter:image:height" content="500">


        <link href="/favicon.gif" rel="shortcut icon"/>

        <!-- Highlight -->
<?php
    echo '
        <link type="text/css" rel="stylesheet" href="'.$path.'/css/github.css">
        <script type="text/javascript" src="'.$path.'/src/highlight.min.js"></script>';
?>

        <!-- GlslCanvas -->
<?php
    if (file_exists($path."/src/glslCanvas/build/GlslCanvas.js")) {
        echo '
        <script type="text/javascript" src="'.$path.'/src/glslCanvas/build/GlslCanvas.js"></script>';
    } else {
        echo '
        <script type="text/javascript" src="https://thebookofshaders.com/glslCanvas/GlslCanvas.js"></script>';
    }
?>

        <!-- GlslEditor -->
<?php
    if (file_exists($path."/src/glslEditor/build/glslEditor.js")) {
        echo '
        <link type="text/css" rel="stylesheet" href="'.$path.'/src/glslEditor/build/glslEditor.css">
        <script type="application/javascript" src="'.$path.'/src/glslEditor/build/glslEditor.js"></script>';
    } else {
        echo '
        <link type="text/css" rel="stylesheet" href="https://thebookofshaders.com/glslEditor/glslEditor.css">
        <script type="application/javascript" src="https://thebookofshaders.com/glslEditor/glslEditor.js"></script>';
    }
?>

        <!-- GlslGallery -->
<?php
    if (file_exists($path."/src/glslGallery/build/glslGallery.js")) {
        echo '
        <link type="text/css" rel="stylesheet" href="'.$path.'/src/glslGallery/build/glslGallery.css">
        <script type="application/javascript" src="'.$path.'/src/glslGallery/build/glslGallery.js"></script>';
    } else {
        echo '
        <link type="text/css" rel="stylesheet" href="https://thebookofshaders.com/glslGallery/glslGallery.css">
        <script type="application/javascript" src="https://thebookofshaders.com/glslGallery/glslGallery.js"></script>';
    }
?>

        <!-- Main style -->
<?php
    echo '
        <link type="text/css" rel="stylesheet" href="'.$path.'/css/style.css">';

    if ( $language !== '' && file_exists($path.'/css/style'.$language.'.css') ) {
        echo '
        <!-- Translation style -->
        <link type="text/css" rel="stylesheet" href="'.$path.'/css/style'.$language.'.css">';
    }
?>


    <!-- Flowdesk Newsletter -->
<?php 
    echo '
        <script>
            (function(w, d, t, h, s, n) {
                w.FlodeskObject = n;
                var fn = function() {
                (w[n].q = w[n].q || []).push(arguments);
                };
                w[n] = w[n] || fn;
                var f = d.getElementsByTagName(t)[0];
                var v = "?v=" + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
                var sm = d.createElement(t);
                sm.async = true;
                sm.type = "module";
                sm.src = h + s + ".mjs" + v;
                f.parentNode.insertBefore(sm, f);
                var sn = d.createElement(t);
                sn.async = true;
                sn.noModule = true;
                sn.src = h + s + ".js" + v;
                f.parentNode.insertBefore(sn, f);
            })(window, document, "script", "https://assets.flodesk.com", "/universal", "fd");
        </script>'
?>

    </head>
    <body>
