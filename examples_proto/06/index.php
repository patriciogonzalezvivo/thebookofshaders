<?php
	$path = "../..";
	$subtitle = ": Gallery - Colors";
	$README = "README";
	$language = "";

	if ( !empty($_GET['lan']) ) {
		if (file_exists($README.'-'.$_GET['lan'].'.md')) {
			$language = '-'.$_GET['lan'];
			$README .= $language;
		}
	}

	include("../header.php");
	include("../../chap-header.php");

	echo '<div id="content">';
	include("../../src/parsedown/Parsedown.php");
	$Parsedown = new Parsedown();
	echo $Parsedown->text(file_get_contents($README.'.md'));

	echo '
	</div>
	<hr>
	<ul class="navigationBar" >
		<li class="navigationBar" onclick="window.location.href=\'../index.php\'">Gallery Home </li>
	</ul>';

	include("../footer.php");
?>
