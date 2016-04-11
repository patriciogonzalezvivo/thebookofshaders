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

    <!-- Jquery -->
      <script src="//code.jquery.com/jquery-2.2.1.min.js"></script>

    <!-- Gallery -->
      <link type="text/css" rel="stylesheet" href="'.$path.'/examples_proto/css/gallery.css">
      <script type="application/javascript" src="'.$path.'/examples_proto/src/shaderList.js"></script>
      <script type="application/javascript" src="'.$path.'/examples_proto/src/glslGallery.js"></script>

      <link type="text/css" rel="stylesheet" href="'.$path.'/css/style.css">

';

if ( $language !== '' && file_exists($path.'/css/style'.$language.'.css') ) {
  	echo '<link type="text/css" rel="stylesheet" href="'.$path.'/css/style'.$language.'.css">';
  }

echo '
	</head>
	<body>
	';
?>
