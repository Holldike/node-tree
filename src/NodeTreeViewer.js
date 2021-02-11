class NodeTreeViewer {
    $box
    nodes;
    deleteNodeCallback;
    addNodeCallback;

    constructor($box) {
        this.$box = $box;

    }

    setDeleteNodeCallback(callback) {
        this.deleteNodeCallback = callback;

    }

    setAddNodeCallback(callback) {
        this.addNodeCallback = callback;

    }

    setNodes(nodes) {
        this.nodes = nodes;

    }

    createNodeElement(node) {
        let $add = document.createElement('div');
        $add.onclick = () => this.addNodeCallback(node);
        $add.innerHTML = '+';

        let $name = document.createElement('div');
        $name.innerHTML = node.name;

        let $remove = document.createElement('div');
        $remove.onclick = () => this.deleteNodeCallback(node)
        $remove.innerHTML = '-';

        let $controlPanel = document.createElement('div');
        $controlPanel.className = 'control-panel';

        $controlPanel.append($add)
        $controlPanel.append($name)
        $controlPanel.append($remove)

        let $element = document.createElement('div');
        $element.className = 'node';

        $element.append($controlPanel);

        return $element;
    }

    getTreeDOM(nodes, parent_id) {
        let $dom = document.createElement('div');
        $dom.className = 'tree';

        for (let i = 0, length = nodes.length; i < length; i++) {
            if (nodes[i].parent_id === parent_id) {
                let $node = this.createNodeElement(nodes[i]);

                $node.append(this.getTreeDOM(nodes, nodes[i].id));

                $dom.append($node);

            }

        }

        return $dom;

    }

    render() {
        let $treeDOM = this.getTreeDOM(this.nodes, null);
        this.$box.append($treeDOM);

    }
}