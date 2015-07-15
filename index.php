<?php 
	include("header.php");
	echo '<div id="content">';
	include("src/parsedown/Parsedown.php");
	$Parsedown = new Parsedown();
	echo $Parsedown->text(file_get_contents ('README.md'));
	echo '</div>';
	include("footer.php");
?>