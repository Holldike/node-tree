<?php


namespace Controller;

use AbstractController;

class IndexController extends AbstractController
{
    public function indexAction()
    {
        (new NodeController())->indexAction();

    }
}