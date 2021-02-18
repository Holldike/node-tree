<?php

namespace Controller;

use AbstractController;
use Model\Node;

class NodeController extends AbstractController
{

    public function indexAction()
    {

        $this->view->render('NodeTree/index.html');

    }

    public function getAllAction()
    {

        $this->jsonResponse((new Node)->loadAll(true));

    }

    public function createRootAction()
    {

        if (!(new Node)->loadAll()) {
            $node = new Node();
            $node->assign(['name' => 'root', 'parent_id' => null]);
            $node->save();

        }

    }

    public function addAction()
    {

        $json = json_decode($this->getHttpBody(), true);
        $parent = $json;

        if ($parentNode = (new Node)->load($parent['id'])) {
            $node = new Node();
            $node->assign(['name' => 'node', 'parent_id' => $parentNode->getId()]);
            $node->save();

        }

    }

    public function updateAction()
    {

        $json = json_decode($this->getHttpBody(), true);

        if ($node = (new Node)->load($json['id'])) {
            $node->assign($json);
            $node->save();

        }

    }

    public function deleteAction()
    {

        $json = json_decode($this->getHttpBody(), true);

        if ($node = (new Node)->load($json['id'])) {
            $node->delete();

        }

    }

}