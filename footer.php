

        <footer>
            <p> Copyright 2015 <a href="http://www.patriciogonzalezvivo.com" target="_blank">Patricio Gonzalez Vivo</a> </p>
        </footer>

        <script type="text/javascript">
            // Setting the theme immediately inside the inline script prevents flicker
            document.body.dataset.theme = localStorage.getItem('theme') || 'light';
        </script>

<?php
    echo '
        <script type="text/javascript" src="'.$path.'/src/main.js" defer></script>';
?>

        <script>
            (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,"script","//www.google-analytics.com/analytics.js","ga");

            ga("create", "UA-18824436-2", "auto");
            ga("send", "pageview");
        </script>
    </body>
</html>
