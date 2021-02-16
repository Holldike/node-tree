<?php

namespace Db;

use AbstractDb;
use DbResult;
use PDO;

class PdoDb extends AbstractDb
{

    /**
     * @var PDO
     */
    public $connect;

    public function __construct()
    {

        $this->connect = (new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8',
            DB_USER,
            DB_PASSWORD
        ));

        $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    }

    /**
     * @inheritDoc
     */
    public function query($sql, $params)
    {

        $stmt = $this->connect->prepare($sql);
        $stmt->execute($params);

        $dbResult = new DbResult();
        $dbResult->setData($stmt->fetchAll(PDO::FETCH_ASSOC));

        return $dbResult;

    }

    /**
     * @inheritDoc
     */
    public function getLastId()
    {

        return $this->connect->lastInsertId();

    }
}