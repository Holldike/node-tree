<?php

namespace Model;

use AbstractModel;

class Node extends AbstractModel
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
     * @inheritDoc
     */
    public function load($id)
    {

        $dbResult = $this->db->query('SELECT * FROM node WHERE id = :id', ['id' => $id]);
        $data = $dbResult->getFirst();

        if (!$data) {
            return false;

        }

        return $this->assign($data);

    }

    /**
     * @inheritDoc
     */
    public function loadAll($array = false)
    {

        $dbResult = $this->db->query('SELECT * FROM node', []);
        $rows = $dbResult->getData();

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
     * @inheritDoc
     */
    public function assign($data)
    {

        foreach ($data as $prop => $value) {
            if (property_exists($this, $prop)) {
                $this->$prop = $value;

            }

        }

        return $this;

    }

    /**
     * @inheritDoc
     */
    public function delete()
    {

        $children = $this->db->query('SELECT * FROM node WHERE parent_id = :parent_id', ['parent_id' => $this->id])->getData();

        if ($children) {
            foreach ($children as $child) {
                (new self)->assign($child)->delete();

            }

        }

        $this->db->query('DELETE FROM node WHERE id = :id', ['id' => $this->id]);

        return true;
    }

    /**
     * @inheritDoc
     */
    public function save()
    {

        if ($this->id) {
            $this->db->query(
                'UPDATE node SET name = :name, parent_id = :parent_id WHERE id = :id',
                ['id' => $this->id, 'name' => $this->name, 'parent_id' => $this->parent_id]
            );

            return $this;

        } else {
            $this->db->query(
                'INSERT INTO node (name, parent_id) VALUES (:name, :parent_id)',
                ['name' => $this->name, 'parent_id' => $this->parent_id]
            );

            return self::load($this->db->getLastId());

        }

    }

}