<?php

	$path = "..";
	$subtitle = ": gallery - all posts";
	include("header.php");

	echo '
	<div class="header"><p><a href="http://patriciogonzalezvivo.com/2015/thebookofshaders/">The Book of Shaders</a> by <a href="http://patriciogonzalezvivo.com">Patricio Gonzalez Vivo</a></p></div>
	<hr>
	<div id="content" class="gallery">';

	include($path."/src/parsedown/Parsedown.php");
	$Parsedown = new Parsedown();
	echo $Parsedown->text(file_get_contents ('README-shared.md'));

	echo '
	</div>
	<hr>
	<ul class="navigationBar" >
		<li class="navigationBar" onclick="window.location.href=\'index.php\'">Gallery Home </li>
	</ul>';

	include("footer.php");
?>
