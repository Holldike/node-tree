<?php


class DbResult
{

    /**
     * @var array
     */
    private $data;

    /**
     * @param $data array
     */
    public function setData($data)
    {

        $this->data = $data;

    }

    /**
     * @return array
     */
    public function getFirst()
    {

        return array_shift($this->data);

    }

    /**
     * @return array
     */
    public function getData()
    {

        return $this->data;

    }

}