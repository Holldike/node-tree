class NodeTreeViewer {
    $box
    nodes;
    addNodeCallback;
    deleteNodeCallback;
    addRootNodeCallback;

    constructor($box) {
        this.$box = $box;
        this.render = this.render.bind(this);

    }

    setDeleteNodeCallback(callback) {
        this.deleteNodeCallback = callback;

    }

    setAddNodeCallback(callback) {
        this.addNodeCallback = callback;

    }

    setAddRootNodeCallback(callback) {
        this.addRootNodeCallback = callback;

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

        if (node.parent_id === null) {
            $remove.onclick = () => this.$box.append(this.createDeleteConfirmation(node));

        } else {
            $remove.onclick = () => this.deleteNodeCallback(node);

        }

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

    createDeleteConfirmation(node) {
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

        let timeoutSecond = 20;
        let $timeout = document.createElement('div');
        $timeout.textContent = String(timeoutSecond);

        $timer.append($timeout);

        let timerInterval = setInterval(function (closeDeleteConfirmation) {
                --timeoutSecond;

                if (timeoutSecond < 0) {
                    closeDeleteConfirmation();
                    clearTimeout(timerInterval);

                }

                $timer.textContent = String(timeoutSecond);


            }, 1000, this.closeDeleteConfirmation
        );

        let $close = document.createElement('div');

        $close.onclick = () => {
            this.closeDeleteConfirmation()
            clearTimeout(timerInterval);

        };

        $close.className = 'modal-close';
        $close.textContent = 'X';

        let $buttonBox = document.createElement('div')
        $buttonBox.className = 'modal-confirm-panel-button-box';

        let $consentButton = document.createElement('div');
        $consentButton.className = 'modal-confirm-panel-consent-button';
        $consentButton.textContent = 'Yes';
        $consentButton.onclick = () => {
            this.deleteNodeCallback(node)
            clearTimeout(timerInterval);

        };

        let $cancelButton = document.createElement('div');
        $cancelButton.onclick = () => {
            this.closeDeleteConfirmation()
            clearTimeout(timerInterval);

        };

        $cancelButton.className = 'modal-confirm-panel-cancel-button';

        $cancelButton.textContent = 'No';

        $buttonBox.append($cancelButton);
        $buttonBox.append($consentButton);

        $confirmPanel.append($timer);
        $confirmPanel.append($buttonBox);

        $modal.append($h4);
        $modal.append($text);
        $modal.append($close);
        $modal.append($confirmPanel);

        $deleteConfirmation.append($modal);

        return $deleteConfirmation;

    }

    closeDeleteConfirmation() {
        document.querySelector('.delete-confirmation').remove();

    }

    createTreeDOM(nodes, parent_id) {
        let $dom = document.createElement('div');
        $dom.className = 'tree';

        for (let i = 0, length = nodes.length; i < length; i++) {
            if (nodes[i].parent_id === parent_id) {
                let $node = this.createNodeElement(nodes[i]);

                $node.append(this.createTreeDOM(nodes, nodes[i].id));

                $dom.append($node);

            }

        }

        return $dom;

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
            this.$box.append(this.createTreeDOM(this.nodes, null));

        }

    }

}