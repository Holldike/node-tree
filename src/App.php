<?php

class App
{
    /**
     * @var Router
     */
    private $router;

    /**
     * @param Router $router
     */
    public function __construct($router)
    {
        $this->router = $router;

    }

    /**
     * Front action
     */
    public function run()
    {
        $controller = $this->router->getController();
        $action = $this->router->getAction();

        (new $controller())->$action();

    }
}