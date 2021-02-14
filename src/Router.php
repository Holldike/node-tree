<?php

class Router
{
    /**
     * @var string
     */
    private $controller;

    /**
     * @var string
     */
    private $action;

    public function __construct()
    {
        $explodedUri = explode('/', $this->clearUri($_SERVER['REQUEST_URI']));

        $this->controller = "Controller\\" . ($explodedUri[1] ? ucfirst($explodedUri[1]) : 'Index');
        $this->action = isset($explodedUri[2]) && $explodedUri[2] ? $explodedUri[2] : 'index';
        $this->controller = $this->controller . 'Controller';
        $this->action = $this->action . 'Action';

    }

    /**
     * @param string $uri
     * @return string
     */
    private function clearUri($uri)
    {
        if (false !== $pos = strpos($_SERVER['REQUEST_URI'], '?')) {
            $uri = substr($_SERVER['REQUEST_URI'], 0, $pos);
        }

        return rawurldecode($uri);
    }

    /**
     * @return string
     */
    public function getController()
    {
        return $this->controller;
    }

    /**
     * @return string
     */
    public function getAction()
    {
        return $this->action;
    }
}