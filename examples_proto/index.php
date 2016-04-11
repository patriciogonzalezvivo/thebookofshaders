
<?php
	$path = "..";
	$subtitle = ": Gallery";
	$README = "README";
	$language = "";

	if ( !empty($_GET['lan']) ) {
		if (file_exists($README.'-'.$_GET['lan'].'.md')) {
			$language = '-'.$_GET['lan'];
			$README .= $language;
		}
	}

	include("./header.php");
	include("../chap-header.php");

	echo '<div id="content">';
	include($path."/src/parsedown/Parsedown.php");
	$Parsedown = new Parsedown();
	echo $Parsedown->text(file_get_contents($README.'.md'));

	echo '
		</div>
		<script>console.log();</script>
		<hr>
		<ul class="navigationBar" >
			<li class="navigationBar" onclick="window.location.href=\'../\'"> Home </li>
		</ul>';

		include("footer.php");
?>
