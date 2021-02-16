<?php

namespace Db;

use PDO;
use PDOException;
use PDOStatement;

class PdoDb implements DbInterface
{
    /**
     * @var PDO
     */
    public $connect;

    public function connect()
    {

        $this->connect = (new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8',
            DB_USER,
            DB_PASSWORD
        ));

        $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    }

    /**
     * @param $sql
     * @param $params
     * @return bool|PDOStatement
     */
    public function query($sql, $params)
    {

        $stmt = $this->connect->prepare($sql);
        $stmt->execute($params);
        return $stmt;

    }
}