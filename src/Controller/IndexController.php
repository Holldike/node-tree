<?php


namespace Controller;

use Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        (new NodeController())->indexAction();

    }
}