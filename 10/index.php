<?php 

	$path = "..";
	$subtitle = ": Random";
	include($path."/header.php");
	include($path."/src/parsedown/Parsedown.php");

	echo '
	<div class="header"><p><a href="http://patriciogonzalezvivo.com/2015/thebookofshaders/">The Book of Shaders</a> by <a href="http://patriciogonzalezvivo.com">Patricio Gonzalez Vivo</a></p></div>
	<hr>
	<div id="content">
	';

	$Parsedown = new Parsedown();
	echo $Parsedown->text(file_get_contents ('README.md'));

	echo '
	</div>
	<hr>
	<ul class="navigationBar" >
		<li class="navigationBar" onclick="previusPage()">&lt; &lt; Previous</li>
		<li class="navigationBar" onclick="homePage()"> Home </li>
		
	</ul>';

	include($path."/footer.php"); 
?>
<!-- <li class="navigationBar" onclick="nextPage()">Next &gt; &gt;</li> -->