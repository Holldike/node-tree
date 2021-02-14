class NodeTree {
    nodeRepository;
    nodeTreeViewer;

    constructor(nodeRepository, nodeTreeViewer) {
        this.nodeRepository = nodeRepository;
        this.nodeTreeViewer = nodeTreeViewer;

        this.addNode = this.addNode.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.createRoot = this.createRoot.bind(this);

        this.nodeTreeViewer.setAddNodeCallback(this.addNode);
        this.nodeTreeViewer.setDeleteNodeCallback(this.deleteNode);
        this.nodeTreeViewer.setAddRootNodeCallback(this.createRoot);

        this.render();

    }

    deleteNode(node) {
        this.nodeRepository.delete(node);
        this.render();

    }

    addNode(node) {
        this.nodeRepository.add(node);
        this.render();

    }

    createRoot() {
        this.nodeRepository.createRoot();
        this.render();

    }

    render() {
        this.nodeTreeViewer.setNodes(this.nodeRepository.getNodes());
        this.nodeTreeViewer.render();

    }

}