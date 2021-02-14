<?php


namespace Controller;

use Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        return (new NodeTree())->indexAction();

    }
}