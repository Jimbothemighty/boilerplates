<?php 

require_once("server/vite.php");

?>
<html>
    <head>
        <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"> -->
    </head>
    <body>
        <div class="wrapper"></div>
        <?php
            echo vite("src/index.tsx");
        ?>
    </body>
</html>