<?php

	$path = "..";
	$subtitle = ": about this book";
	$README = "README";
	$language = "";

	if ( !empty($_GET['lan']) ) {
		if (file_exists($README.'-'.$_GET['lan'].'.md')) {
			$language = '-'.$_GET['lan'];
			$README .= $language;
		}
	}

	include($path."/header.php");
	include($path."/chap-header.php");
	echo '<div id="content">';

	include($path."/src/parsedown/Parsedown.php");
	$Parsedown = new Parsedown();
	echo $Parsedown->text(file_get_contents($README.'.md'));

	echo '</div>';

	$show_previous = false;
	$show_next = true;
	include($path."/footer.php");
?>
