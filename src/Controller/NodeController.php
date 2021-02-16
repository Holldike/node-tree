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

        $node = new Node();
        $node->assign(['name' => 'node', 'parent_id' => $_POST['id']]);
        $node->save();

    }

    public function deleteAction()
    {

        if ($node = (new Node)->load($_POST['id'])) {
            $node->delete();

        }

    }
}