
<?php
    $path = '..';
    $subtitle = ': Gallery';
    $language = '';

    if ( !empty($_GET['lan']) ) {
        if (file_exists('README-'.$_GET['lan'].'.md')) {
            $language = '-'.$_GET['lan'];
        }
    }

    include('../header.php');
    include('../chap-header.php');

    echo '<div id="content">';

    include($path.'/src/parsedown/Parsedown.php');
    $Parsedown = new Parsedown();

    echo $Parsedown->text(file_get_contents('README'.$language.'.md'));

    if (empty($_GET)) {
        // Load all the chapters
        $dirs = array_filter(glob('../??/'), 'is_dir');
        foreach ($dirs as &$folder) {
            $chp = '';
            preg_match("/\.\.\/(\d\d)\//", $folder, $matches);
            if (count($matches) > 0) {
                $chp = $matches[1];
            }

            if (file_exists($folder.'TITLE'.$language.'.md') and file_exists($folder.'SUMMARY'.$language.'.md')) {
                echo '<a href="'.$folder.'">';
                echo $Parsedown->text(file_get_contents($folder.'TITLE'.$language.'.md'));
                echo '</a>';

                if (file_exists($folder.'SUMMARY'.$language.'.md')) {
                    echo $Parsedown->text(file_get_contents($folder.'SUMMARY'.$language.'.md'));
                }

                $shaders = array_reverse(glob($folder.'*.frag'));
                $shadersTotal = min(count($shaders), 3);

                if ($shadersTotal > 0) {
                    echo '<div class="glslGallery" data="';
                    for ($i = 0; $i < $shadersTotal; $i++) {
                        echo $chp.'/'.basename($shaders[$i], '.frag');
                        if ($i != $shadersTotal-1) {
                            echo ',';
                        }
                    }
                    echo '" data-properties="clickRun:editor,hoverPreview:false,showAuthor:false,openFrameIcon:false"></div>';
                }

                if (file_exists($folder.'featured_examples.php') and file_exists('FEATURED'.$language.'.md')) {
                    include($folder.'featured_examples.php');
                    $shadersTotal += 3;
                }

                if (count($shaders) > 3 or $shadersTotal > 3) {
                    echo '<p class="more"><a href="/examples/?chapter='.$chp.'">more</a></p>';
                }
            }
        }
    } elseif ( !empty($_GET['chapter'])) {
        $chp = $_GET['chapter'];
        $folder = '../'.$chp.'/';

        if (file_exists($folder.'TITLE'.$language.'.md') and file_exists($folder.'SUMMARY'.$language.'.md')) {
            echo $Parsedown->text(file_get_contents($folder.'TITLE'.$language.'.md'));

            if (file_exists($folder.'SUMMARY'.$language.'.md')) {
                echo $Parsedown->text(file_get_contents($folder.'SUMMARY'.$language.'.md'));
            }

            $shaders = array_reverse(glob($folder.'*.frag'));
            $shadersTotal = count($shaders);

            if ($shadersTotal > 0) {
                echo '<div class="glslGallery" data="';
                for ($i = 0; $i < $shadersTotal; $i++) {
                    echo $chp.'/'.basename($shaders[$i], '.frag');
                    if ($i != $shadersTotal-1) {
                        echo ',';
                    }
                }
                echo '" data-properties="clickRun:editor,showAuthor:false,openFrameIcon:false"></div>';
            }


            if (file_exists($folder.'featured_examples.php') and file_exists('FEATURED'.$language.'.md')) {
                echo $Parsedown->text(file_get_contents('FEATURED'.$language.'.md'));
                include($folder.'featured_examples.php');
            }
        }
    }

    echo '
        </div>
        <hr>
        <ul class="navigationBar" >
            <li class="navigationBar" onclick="window.location.href=\'../\'"> Home </li>
        </ul>';
        include("../footer.php");
?>
