<?php

class View
{

    /**
     * @param string $view
     * @return mixed
     */
    public function render($view)
    {
        return require(VIEW_DIR . $view);

    }

}