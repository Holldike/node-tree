class NodeTreeViewer {
    $box
    nodes;
    updateNodeCallback;
    addNodeCallback;
    deleteNodeCallback;
    nodeTreeModalViewer;

    constructor($box) {
        this.$box = $box;
        this.nodeTreeModalViewer = new NodeTreeModalViewer(this);

        this.render = this.render.bind(this);

    }

    setDeleteNodeCallback(callback) {
        this.deleteNodeCallback = callback;

    }

    setAddNodeCallback(callback) {
        this.addNodeCallback = callback;

    }

    setUpdateNodeCallback(callback) {
        this.updateNodeCallback = callback;

    }

    setAddRootNodeCallback(callback) {
        this.addRootNodeCallback = callback;

    }

    setNodes(nodes) {
        this.nodes = nodes;

    }

    createDropDownElement() {
        let $element = document.createElement('div');
        $element.className = 'drop-down-button drop-down-button-open';
        $element.onclick = function () {
            let $tree = $element.nextSibling;

            if ($tree.style.display === 'none') {
                $tree.setAttribute('style', 'display: block');
                $element.className = 'drop-down-button drop-down-button-open';
                return;
            }

            $element.className = 'drop-down-button drop-down-button-closed';
            $tree.setAttribute('style', 'display: none');

        }

        return $element;
    }

    createNodeElement(node) {
        let $controlPanel = document.createElement('div');
        let $element = document.createElement('div');
        let $remove = document.createElement('div');
        let $name = document.createElement('div');
        let $add = document.createElement('div');

        $name.className = 'node-name';
        $name.onclick = () => this.$box.append(this.nodeTreeModalViewer.createSetNameModal(node));
        $name.innerHTML = node.name;

        if (node.parent_id === null) {
            $remove.onclick = () => this.$box.append(this.nodeTreeModalViewer.createDeleteNodeModal(node));

        } else {
            $remove.onclick = () => this.deleteNodeCallback(node);

        }

        $remove.innerHTML = '-';

        $add.onclick = () => this.addNodeCallback(node);
        $add.innerHTML = '+';

        $controlPanel.className = 'control-panel';

        $controlPanel.append($remove);
        $controlPanel.append($name);
        $controlPanel.append($add);

        $element.className = 'node';

        $element.append($controlPanel);

        if (this.childrenExists(node.id)) {
            $element.append(this.createDropDownElement());

        }

        return $element;

    }

    childrenExists(parent_id) {
        for (let i = 0, length = this.nodes.length; i < length; i++) {
            if (this.nodes[i].parent_id === parent_id) {
                return true;

            }

        }

        return false;
    }

    createTreeElement(nodes, parent_id) {
        let $tree = document.createElement('div');
        $tree.className = 'tree';

        for (let i = 0, length = nodes.length; i < length; i++) {
            if (nodes[i].parent_id !== parent_id) {
                continue;

            }

            let $node = this.createNodeElement(nodes[i]);
            $node.append(this.createTreeElement(nodes, nodes[i].id));
            $tree.append($node);

        }

        return $tree;

    }

    createCreateRootElement() {
        let $createRoot = document.createElement('div');
        $createRoot.onclick = this.addRootNodeCallback;
        $createRoot.className = 'create-root'
        $createRoot.textContent = 'Create Root';

        return $createRoot;

    }

    render() {
        if (this.$box.children.length) {
            while (this.$box.firstChild) {
                this.$box.removeChild(this.$box.lastChild);

            }

        }

        if (!this.nodes.length) {
            this.$box.append(this.createCreateRootElement());

        } else {
            this.$box.append(this.createTreeElement(this.nodes, null));

        }

    }

}