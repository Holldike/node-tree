<?php

class View
{

    /**
     * @param string $view
     */
    public function render($view)
    {

        require(VIEW_DIR . $view);

    }

}