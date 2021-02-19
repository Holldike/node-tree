class NodeTreeModalViewer {
    nodeTreeViewer;

    constructor(nodeTreeViewer) {
        this.nodeTreeViewer = nodeTreeViewer;

    }

    createConfirmPanel(cancelCallback, consentCallback) {
        let $buttonBox = document.createElement('div')
        let $confirmPanel = document.createElement('div');
        let $cancelButton = document.createElement('div');
        let $consentButton = document.createElement('div');

        $confirmPanel.className = 'modal-confirm-panel';

        $buttonBox.className = 'modal-confirm-panel-button-box';

        $consentButton.className = 'modal-confirm-panel-consent-button';
        $consentButton.onclick = consentCallback;
        $consentButton.textContent = 'Yes';

        $cancelButton.onclick = cancelCallback;
        $cancelButton.className = 'modal-confirm-panel-cancel-button';
        $cancelButton.textContent = 'No';

        $buttonBox.append($cancelButton);
        $buttonBox.append($consentButton);

        $confirmPanel.append($buttonBox);

        return $confirmPanel;

    }

    createSetNameModal(node) {
        let $overlay = document.createElement('div');
        let $input = document.createElement('input');
        let $close = document.createElement('div');
        let $modal = document.createElement('div');
        let $h4 = document.createElement('h4');
        let $confirmPanel = this.createConfirmPanel(
            () => $overlay.remove(),
            () => {
                node.name = $input.value;
                this.nodeTreeViewer.nodeTree.updateNode(node);

            }

        );

        $overlay.className = 'overlay';

        $modal.className = 'modal';

        $h4.className = 'modal-header';
        $h4.textContent = 'Set new name of node: ' + node.name;

        $input.className = 'modal-set-name-input'
        $input.value = node.name;

        $close.onclick = () => $overlay.remove();
        $close.className = 'modal-close';
        $close.textContent = 'X';

        $modal.append($h4);
        $modal.append($input);
        $modal.append($close);
        $modal.append($confirmPanel);

        $overlay.append($modal);

        return $overlay;

    }

    createDeleteNodeModal(node) {
        let $overlay = document.createElement('div');
        let $timeout = document.createElement('div');
        let $modal = document.createElement('div');
        let $close = document.createElement('div');
        let $timer = document.createElement('div');
        let $text = document.createElement('div');
        let $h4 = document.createElement('h4');
        let timeoutSecond = 20;
        let timerInterval = setInterval(function () {
                --timeoutSecond;

                if (timeoutSecond < 0) {
                    $overlay.remove();
                    clearTimeout(timerInterval);

                }

                $timer.textContent = String(timeoutSecond);

            }, 1000
        );
        let $confirmPanel = this.createConfirmPanel(
            () => $overlay.remove(),
            () => {
                this.nodeTreeViewer.nodeTree.deleteNode(node);
                clearTimeout(timerInterval);

            }
        );

        $overlay.className = 'overlay';

        $modal.className = 'modal';

        $h4.className = 'modal-header';
        $h4.textContent = 'Delete Confirmation';

        $text.className = 'modal-text';
        $text.textContent = "This is very dangerous, you shouldn't do this! Are you really sure ?"

        $timer.className = 'modal-confirm-panel-timer';

        $timeout.textContent = String(timeoutSecond);
        $timer.append($timeout);

        $close.onclick = () => $overlay.remove();

        $close.className = 'modal-close';
        $close.textContent = 'X';

        $confirmPanel.insertBefore($timer, $confirmPanel.childNodes[0]);

        $modal.append($h4);
        $modal.append($text);
        $modal.append($close);
        $modal.append($confirmPanel);

        $overlay.append($modal);

        return $overlay;

    }
}