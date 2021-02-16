<?php

namespace Model;

use Model;
use PDO;

class Node extends Model
{
    private $id;
    private $name;
    private $parent_id;

    public function getId()
    {

        return $this->id;

    }

    public function getName()
    {

        return $this->name;

    }

    public function getParentId()
    {

        return $this->parent_id;

    }

    /**
     * @param $id
     * @return $this|bool
     */
    public function load($id)
    {

        $result = $this->db->query('SELECT * FROM node WHERE id = :id', ['id' => $id]);
        $data = $result->fetch(PDO::FETCH_ASSOC);

        if (!$data) {
            return false;

        }

        return $this->assign($data);

    }

    /**
     * @param bool $array
     * @return array
     */
    public function loadAll($array = false)
    {

        $result = $this->db->query('SELECT * FROM node', []);

        $rows = $result->fetchAll(PDO::FETCH_ASSOC);

        if ($array) {
            return $rows;

        }

        $nodes = [];

        foreach ($rows as $row) {
            $nodes[] = (new self())->assign($row);

        }


        return $nodes;

    }

    /**
     * @param $data
     * @return $this
     */
    public function assign($data)
    {

        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->parent_id = $data['parent_id'];

        return $this;

    }

    public function delete()
    {

        $children = $this->db->query('SELECT * FROM node WHERE parent_id = :parent_id', ['parent_id' => $this->id])
            ->fetchAll(PDO::FETCH_ASSOC);

        if ($children) {
            foreach ($children as $child) {
                (new self)->assign($child)->delete();

            }

        }

        $this->db->query('DELETE FROM node WHERE id = :id', ['id' => $this->id]);

    }

    public function save()
    {

        if ($this->id) {
            $this->db->query(
                'UPDATE node SET name = :name, parent_id = :parent_id WHERE id = :id',
                ['id' => $this->id, 'name' => $this->name, 'parent_id' => $this->parent_id]
            );

            return $this;

        }

        $result = $this->db->query(
            'INSERT INTO node (name, parent_id) VALUES (:name, :parent_id)',
            ['name' => $this->name, 'parent_id' => $this->parent_id]
        );

    }

}