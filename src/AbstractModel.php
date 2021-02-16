<?php

use Db\PdoDb;

abstract class AbstractModel
{
    /**
     * @var AbstractDb
     */
    protected $db;

    public function __construct()
    {
        $this->db = new PdoDb();

    }

    /**
     * @return $this
     */
    abstract public function save();

    /**
     * @param $id
     * @return $this|bool
     */
    abstract public function load($id);

    /**
     * @return bool
     */
    abstract public function delete();

    /**
     * @param $data
     * @return $this
     */
    abstract public function assign($data);

    /**
     * @param bool $array
     * @return array
     */
    abstract public function loadAll($array);

}