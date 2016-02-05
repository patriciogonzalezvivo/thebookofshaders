<?php

// main menu
echo '
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>The Book of Shaders'.$subtitle.'</title>
		<meta name="keywords" content="shader,openGL,WebGL,GLSL,book,procedural,generative" />
		<meta name="description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders." />

		<meta name="twitter:site" content="@bookofshaders">
	    <meta name="twitter:title" content="The Book Of Shaders">
	    <meta name="twitter:description" content="Gentle step-by-step guide through the abstract and complex universe of Fragment Shaders.">
	    <meta name="twitter:creator" content="@patriciogv">
	    <meta name="twitter:domain" content="thebookofshaders.edu">
	    <link href="/favicon.gif" rel="shortcut icon"/>

		<!-- CodeMirror -->
		<link type="text/css" rel="stylesheet" href="'.$path.'/src/codemirror/css/codemirror.css">
		<link type="text/css" rel="stylesheet" href="'.$path.'/src/codemirror/addon/fold/foldgutter.css">
		<link type="text/css" rel="stylesheet" href="'.$path.'/src/codemirror/addon/dialog/dialog.css">
		<link type="text/css" rel="stylesheet" href="'.$path.'/src/codemirror/addon/hint/show-hint.css">
		<link type="text/css" rel="stylesheet" href="'.$path.'/src/codemirror/theme/neo.css">
		<script type="text/javascript" src="'.$path.'/src/codemirror.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/search/searchcursor.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/search/search.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/dialog/dialog.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/edit/matchbrackets.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/edit/closebrackets.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/comment/comment.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/wrap/hardwrap.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/fold/foldcode.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/fold/brace-fold.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/keymap/sublime.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/addon/hint/show-hint.js"></script>
		<script type="text/javascript" src="'.$path.'/src/codemirror/mode/clike.js"></script>

		<!-- Highlight -->
		<link type="text/css" rel="stylesheet" href="'.$path.'/css/github.css">
		<script type="text/javascript" src="'.$path.'/src/highlight.min.js"></script>

		<!-- My stuff -->
		<link type="text/css" rel="stylesheet" href="'.$path.'/css/style.css">
		<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/build/GlslCanvas.min.js"></script>

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
