class NodeTree {
    nodeRepository;
    nodeTreeViewer;

    constructor(nodeRepository, nodeTreeViewer) {
        this.nodeRepository = nodeRepository;
        this.nodeTreeViewer = nodeTreeViewer;

        this.addNode = this.addNode.bind(this);
        this.deleteNode = this.deleteNode.bind(this);

    }

    deleteNode(node) {
        if (node.parent_id === null) {
            this.nodeTreeViewer.deleteConfirmation();
            return;
        }

        this.nodeRepository.delete(node);
        this.nodeRepository.save();

        this.nodeTreeViewer.setNodes(this.nodeRepository.getNodes());
        this.nodeTreeViewer.render();

    }

    addNode(node) {
        this.nodeRepository.add(node);
        this.nodeRepository.save();

        this.nodeTreeViewer.setNodes(this.nodeRepository.getNodes());
        this.nodeTreeViewer.render();

    }

    process() {
        this.nodeRepository.load();

        this.nodeTreeViewer.setAddNodeCallback(this.addNode);
        this.nodeTreeViewer.setDeleteNodeCallback(this.deleteNode);

        this.nodeTreeViewer.setNodes(this.nodeRepository.getNodes());
        this.nodeTreeViewer.render();

    }

}