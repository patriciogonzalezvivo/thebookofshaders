<?php

	$path = "..";
	if(!empty($_GET))
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
	if(empty($_GET))
		echo $Parsedown->text(file_get_contents ('README.md'));
	else
		echo $Parsedown->text(file_get_contents ( $_GET['search'].'/README.md' ));

	echo '
	</div>
	<hr>';

	include($path."/footer.php");
?>
