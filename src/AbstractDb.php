<?php

abstract class AbstractDb
{

    /**
     * @param $sql
     * @param $params
     * @return DbResult
     */
    abstract public function query($sql, $params);

    /**
     * @return int
     */
    abstract public function getLastId();

}