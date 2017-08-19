<?php

	$path = "..";
	$subtitle = ": Fractals";
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

	echo '
	</div>
	<hr>
	<ul class="navigationBar" >
		<li class="navigationBar" onclick="previusPage()">&lt; &lt; Previous</li>
		<li class="navigationBar" onclick="homePage()"> Home </li>
		<li class="navigationBar" onclick="nextPage()">Next &gt; &gt;</li>
	</ul>';

	include($path."/footer.php");
?>
