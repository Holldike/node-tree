<?php

spl_autoload_register(function ($className) {
    $fileName = str_replace("\\", DIRECTORY_SEPARATOR, $className) . '.php';
    var_dump(DIR_APPLICATION );
    require DIR_APPLICATION . '/'. $fileName;
});