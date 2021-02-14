<?php

use Db\DbInterface;

class Db
{

    /**
     * @var DbInterface
     */
    private $db;

    public function __construct(DbInterface $db)
    {
        $db->connect();
        $this->db = $db;

    }

    /**
     * @param $sql
     * @return mixed
     */
    public function query($sql)
    {
        return $this->db->query($sql);

    }

}