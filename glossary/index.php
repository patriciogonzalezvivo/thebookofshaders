<?php

	$path = "..";
	$subtitle = ": Glossary";
	$language = "";

	// An entry is a directory name, so allow only the characters a GLSL
	// identifier can contain. is_string() first: ?search[]= is an array.
	$search = '';
	if ( isset($_GET['search']) && is_string($_GET['search'])
	     && preg_match('/\A[A-Za-z_][A-Za-z0-9_]*\z/', $_GET['search']) ) {
		$search = $_GET['search'];
		$subtitle = ": ".htmlspecialchars($search, ENT_QUOTES, 'UTF-8');
	}

	if ( isset($_GET['lan']) && is_string($_GET['lan'])
	     && preg_match('/\A[A-Za-z][A-Za-z0-9_-]{0,11}\z/', $_GET['lan']) ) {
		$language = '-'.$_GET['lan'];
	}

	// The index and each entry are translated separately, so pick the
	// translation per file and fall back to English rather than nothing.
	$dir = is_dir($search) ? $search.'/' : '';
	$file = $dir.'README'.$language.'.md';
	if (!file_exists($file)) {
		$language = '';
		$file = $dir.'README.md';
	}

	include($path."/header.php");
	include($path."/src/parsedown/Parsedown.php");
?>
	<div class="header">
		<p class="subtitle"><a href="https://thebookofshaders.com/">The Book of Shaders</a> by <a href="http://patriciogonzalezvivo.com">Patricio Gonzalez Vivo</a></p>
	</div>
	<hr>
	<div id="content">

<?php
	$Parsedown = new Parsedown();
	if (file_exists($file))
		echo $Parsedown->text(file_get_contents($file));

	echo '
	</div>
	<hr>';

	include($path."/footer.php");
?>
