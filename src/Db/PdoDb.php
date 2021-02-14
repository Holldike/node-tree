<?php


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
        ))
            ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }

    /**
     * @return PDO
     */
    public function getConnect()
    {
        return $this->connect;
    }

    /**
     * @param $sql
     * @return false|PDOStatement
     */
    public function query($sql)
    {
        return $this->connect->query($sql, PDO::FETCH_ASSOC);

    }
}