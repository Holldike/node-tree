<?php

abstract class AbstractController
{
    /**
     * @var View
     */
    protected $view;

    public function __construct()
    {
        $this->view = new View;

    }

    protected function jsonResponse($data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

}