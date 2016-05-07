<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
<?php
    echo '
        <title>The Book of Shaders'.$subtitle.'</title>';
?>

        <link href="/favicon.gif" rel="shortcut icon"/>
        <meta name="keywords" content="shader,openGL,WebGL,GLSL,book,procedural,generative" />
        <meta name="description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders."/>

        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@bookofshaders">
        <meta name="twitter:creator" content="@patriciogv">
        <meta name="twitter:title" content="The Book Of Shaders">
        <meta name="twitter:description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders.">
        <meta name="twitter:image" content="https://thebookofshaders.com/thumb.jpg">
        <meta name="twitter:domain" content="thebookofshaders.com">
        
        <link href="/favicon.gif" rel="shortcut icon"/>

        <!-- Highlight -->
<?php
    echo '
        <link type="text/css" rel="stylesheet" href="'.$path.'/css/github.css">
        <script type="text/javascript" src="'.$path.'/src/highlight.min.js"></script>';
?>

        <!-- GlslCanvas -->
<?php
    if (file_exists($path."/src/glslCanvas/build/GlslCanvas.min.js")) {
        echo '
        <script type="text/javascript" src="'.$path.'/src/glslCanvas/build/GlslCanvas.min.js"></script>';
    } else {
        echo '
        <script type="text/javascript" src="https://thebookofshaders.com/glslCanvas/GlslCanvas.min.js"></script>';
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

    </head>
    <body>