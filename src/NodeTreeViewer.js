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

    deleteConfirmation() {
        let $deleteConfirmation = document.createElement('div');
        $deleteConfirmation.className = 'delete-confirmation';

        let $modal = document.createElement('div');
        $modal.className = 'modal';

        let $h4 = document.createElement('h4');
        $h4.className = 'modal-header';
        $h4.textContent = 'Delete Confirmation';

        let $text = document.createElement('div');
        $text.className = 'modal-text';
        $text.textContent = "This is very dangerous, you shouldn't do this! Are you really sure ?"

        let $confirmPanel = document.createElement('div');
        $confirmPanel.className = 'modal-confirm-panel';

        let $timer = document.createElement('div');
        $timer.className = 'modal-confirm-panel-timer';

        let $buttonBox = document.createElement('div')
        $buttonBox.className = 'modal-confirm-panel-button-box';

        let $consentButton = document.createElement('div');
        $consentButton.className = 'modal-confirm-panel-consent-button';
        $consentButton.textContent = 'Yes';

        let $cancelButton = document.createElement('div');
        $cancelButton.className = 'modal-confirm-panel-cancel-button';
        $cancelButton.textContent = 'No';

        $buttonBox.append($cancelButton);
        $buttonBox.append($consentButton);

        $confirmPanel.append($timer);
        $confirmPanel.append($buttonBox);

        $modal.append($h4);
        $modal.append($text);
        $modal.append($confirmPanel);

        $deleteConfirmation.append($modal);

        this.$box.append($deleteConfirmation)
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

        if (this.$box.children.length) {
            while (this.$box.firstChild) {
                this.$box.removeChild(this.$box.lastChild);

            }

        }

        this.$box.append($treeDOM);

    }
}