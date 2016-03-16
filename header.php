<?php

// main menu
echo '
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>The Book of Shaders'.$subtitle.'</title>
        <link href="/favicon.gif" rel="shortcut icon"/>
        <meta name="keywords" content="shader,openGL,WebGL,GLSL,book,procedural,generative" />
        <meta name="description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders." />

        <meta name="twitter:site" content="@bookofshaders">
        <meta name="twitter:title" content="The Book Of Shaders">
        <meta name="twitter:description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders.">
        <meta name="twitter:creator" content="@patriciogv">
        <meta name="twitter:domain" content="thebookofshaders.edu">
        <link href="/favicon.gif" rel="shortcut icon"/>

        <!-- Highlight -->
        <link type="text/css" rel="stylesheet" href="'.$path.'/css/github.css">
        <script type="text/javascript" src="'.$path.'/src/highlight.min.js"></script>

        <!-- GlslCanvas -->
        ';

if (file_exists($path."/src/glslCanvas/build/GlslCanvas.min.js")) {
    echo '<script type="text/javascript" src="'.$path.'/src/glslCanvas/build/GlslCanvas.min.js"></script>';
} else {
    echo '<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/build/GlslCanvas.min.js"></script>';
}
    echo '
        <!-- GlslEditor -->';
if (file_exists($path."/src/glslEditor/build/glslEditor.js")) {
    echo '
        <link type="text/css" rel="stylesheet" href="'.$path.'/src/glslEditor/build/glslEditor.css"> 
        <script type="application/javascript" src="'.$path.'/src/glslEditor/build/glslEditor.js"></script>';
} else {
    echo '
        <link type="text/css" rel="stylesheet" href="https://rawgit.com/patriciogonzalezvivo/glslEditor/gh-pages/build/glslEditor.css"> 
        <script type="application/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslEditor/gh-pages/build/glslEditor.js"></script>';
}
    echo '
        <link type="text/css" rel="stylesheet" href="'.$path.'/css/style.css">

        <!-- Translation -->
        ';

if ( $language !== '' && file_exists($path.'/css/style'.$language.'.css') ) {
    echo '<link type="text/css" rel="stylesheet" href="'.$path.'/css/style'.$language.'.css">';
}

echo '
    </head>
    <body>
    ';
?>



