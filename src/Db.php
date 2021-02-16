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
     * @param $params
     * @return array
     */
    public function query($sql, $params)
    {

        return $this->db->query($sql, $params);

    }

}