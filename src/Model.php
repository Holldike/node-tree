<?php

use Db\PdoDb;

abstract class Model
{
    /**
     * @var Db
     */
    protected $db;

    public function __construct()
    {
        $this->db = new Db(new PdoDb());

    }

}