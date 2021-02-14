<?php

spl_autoload_register(function ($className) {
    $fileName = str_replace("\\", DIRECTORY_SEPARATOR, $className) . '.php';
    require SRC_DIR . $fileName;

});