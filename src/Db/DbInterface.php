<?php

namespace Db;

interface DbInterface
{
    public function connect();

    public function query($sql, $params);

}
