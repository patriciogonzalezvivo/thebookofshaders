
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

	include("../header.php");
	include("../chap-header.php");

	echo '
		<!-- Gallery -->
    	<script type="application/javascript" src="'.$path.'/examples_proto/src/examples.js"></script>
		';

	echo '<div id="content" class="gallery-top">';
	include($path."/src/parsedown/Parsedown.php");
	$Parsedown = new Parsedown();

	$chapters = array(
		array("shared", FALSE),
		array("02", FALSE),
		array("03", FALSE),
		array("05", TRUE),
		array("07", TRUE),
		array("09", TRUE),
		array("10", TRUE),
		array("11", TRUE),
		array("advanced", TRUE)
		);

	echo $Parsedown->text(file_get_contents($README.'.md'));

	foreach ($chapters as $chapter) {
		echo $Parsedown->text(file_get_contents($chapter[0].'/'.README.'.md'));
		$log = $chapter[0];
		if ($chapter[1]) {$log .= ',3';}
		echo "<div class=\"glslChapterGallery\" log=\"{$log}\"></div>";
		if ($chapter[1]) {
			echo "<div class=\"extra-container\"><a href=\"./{$chapter[0]}\">See All Examples</a></div>";
		}
	}


	echo '
		</div>
		<script>console.log();</script>
		<hr>
		<ul class="navigationBar" >
			<li class="navigationBar" onclick="window.location.href=\'../\'"> Home </li>
		</ul>';

		include("../footer.php");

?>
