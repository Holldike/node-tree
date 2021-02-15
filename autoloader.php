<?php

spl_autoload_register(function ($className) {
    $fileName = str_replace("\\", DIRECTORY_SEPARATOR, $className) . '.php';
    $fullPath = SRC_DIR . $fileName;

    if (!file_exists($fullPath)) {
        throw new Exception('Autoload error: cannot find file ' . $fullPath);

    }

    require $fullPath;

});