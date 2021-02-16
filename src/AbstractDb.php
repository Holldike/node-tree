<?php

abstract class AbstractDb
{

    /**
     * @param $sql
     * @param $params
     * @return DbResult
     */
    abstract public function query($sql, $params): DbResult;

    /**
     * @return int
     */
    abstract public function getLastId();

}