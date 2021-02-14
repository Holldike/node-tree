<?php

require '../config.php';
require '../autoloader.php';

$router = new Router();
$app = new App($router);

$app->run();