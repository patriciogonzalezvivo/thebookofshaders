<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
<?php
    if (!empty($_GET['log'])) {
        echo '
        <title>'.$_GET['log'].'</title>';
    } else {
        echo '
        <title>GLSL Editor</title>';
    }
?>
		<link href='/favicon.gif' rel='shortcut icon'/>

        <!— Open Graph data —>
        <meta property="og:type" content="article" />
        <meta property="og:title" content="GLSL Shader Editor" />
        <meta property="og:site_name" content="The Book of Shaders"/>
        <meta property="og:description" content="The Book of Shaders Editor" />

<?php
    if (!empty($_GET['log'])) {
        echo '
        <meta property="og:image" content="http://thebookofshaders.com/log/'.$_GET['log'].'.png"/>
        <meta property="og:image:secure_url" content="https://thebookofshaders.com/log/'.$_GET['log'].'.png"/>';
    } else {
        echo '
        <meta property="og:image" content="https://thebookofshaders.com/thumb.png"/>';
    }

    echo'
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />';
?>

<!--         <!— Twitter Card—>
        <meta name="twitter:card" content="image">
        <meta name="twitter:site" content="@bookofshaders">
        <meta name="twitter:title" content="GLSL Shader Editor">
        <meta name="twitter:description" content="The Book of Shaders editor">
        <meta name="twitter:domain" content="thebookofshaders.com"> -->
<?php
    // if (!empty($_GET['log'])) {
    //     echo '
    //     <meta name="twitter:image" content="https://thebookofshaders.com/log/'.$_GET['log'].'.png"/>';
    // } else {
    //     echo '
    //     <meta name="twitter:image" content="https://thebookofshaders.com/thumb.png"/>';
    // }

    // echo '
    //     <meta name="twitter:image:width" content="500">
    //     <meta name="twitter:image:height" content="500">';
?>
		<style>
			body {
				height: 100%;
    			margin: 0;
	  			background: #272822;
			}

			#glsl_editor {
				height: 100%;
			}
		</style>
	</head>
	<body>
		<div id='glsl_editor'></div>
	</body>

	<link type='text/css' rel='stylesheet' href='https://thebookofshaders.com/glslEditor/glslEditor.css'>
    <script type='application/javascript' src='https://thebookofshaders.com/glslEditor/glslEditor.js'></script>
    <script type='text/javascript'>
        var glslEditor = {};

        function loadjscssfile(filename, filetype, callback){
            if (filetype=="js") { //if filename is a external JavaScript file
                var fileref = document.createElement('script')
                fileref.setAttribute("type","text/javascript")
                fileref.setAttribute("src", filename)
            }
            else if (filetype=="css") { //if filename is an external CSS file
                var fileref = document.createElement("link")
                fileref.setAttribute("rel", "stylesheet")
                fileref.setAttribute("type", "text/css")
                fileref.setAttribute("href", filename)
            }

            fileref.onload = callback;
            fileref.onreadystatechange = callback;

            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref)
            }
        }

        window.onload = function() {
            // if ()
            if (window.GlslEditor && window.GlslEditor) {
                init();
            }
            else {
                console.log('Try to load a local glslEditor');
                if (!window.glslEditor) {
                    loadjscssfile('src/glslEditor/build/glslEditor.css', 'css');
                    loadjscssfile('src/glslEditor/build/glslEditor.js', 'js', init);
                }
            }
        };

        function init() {
            glslEditor = new GlslEditor('#glsl_editor', {
                                                                    canvas_size: 500,
                                                                    canvas_draggable: true,
                                                                    theme: 'monokai',
                                                                    multipleBuffers: true,
                                                                    watchHash: true,
                                                                    fileDrops: true,
                                                                    menu: true
                                                                });
            document.body.style.backgroundColor = window.getComputedStyle(glslEditor.editor.getWrapperElement(),null).getPropertyValue('background-color');
        }

    </script>
    <script>
        (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
        ga("create", "UA-18824436-2", "auto");
        ga("send", "pageview");
    </script>
</html>
