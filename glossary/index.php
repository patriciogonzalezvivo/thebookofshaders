<?php

	$path = "..";
	$subtitle = ": Glossary";
	$README = "README";
	$language = "";

	if ( !empty($_GET['lan']) ) {
		if (file_exists($README.'-'.$_GET['lan'].'.md')) {
			$language = '-'.$_GET['lan'];
			$README .= $language;
		}
	}

	if(!empty($_GET['search']))
		$subtitle = ": ".$_GET['search'];

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
	if(empty($_GET['search']))
		echo $Parsedown->text(file_get_contents($README.'.md'));
	else
		echo $Parsedown->text(file_get_contents ( $_GET['search'].'/'.$README.'.md' ));

	echo '
	</div>
	<hr>';

	include($path."/footer.php");
?>
