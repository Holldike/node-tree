class NodeTree {
    nodeRepository;
    nodeTreeViewer;

    constructor(nodeRepository, nodeTreeViewer) {
        this.nodeRepository = nodeRepository;
        this.nodeTreeViewer = nodeTreeViewer;

        this.render = this.render.bind(this);
        this.addNode = this.addNode.bind(this);
        this.updateNode = this.updateNode.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.createRoot = this.createRoot.bind(this);

        this.nodeTreeViewer.setAddRootNodeCallback(this.createRoot);
        this.nodeTreeViewer.setUpdateNodeCallback(this.updateNode);
        this.nodeTreeViewer.setDeleteNodeCallback(this.deleteNode);
        this.nodeTreeViewer.setAddNodeCallback(this.addNode);

        this.nodeRepository.setOnloadCallback((nodes) => this.render(nodes));

        this.nodeRepository.load()

    }

    addNode(node) {
        this.nodeRepository.add(node);
        this.nodeRepository.load()

    }

    updateNode(node) {
        this.nodeRepository.update(node);
        this.nodeRepository.load()

    }

    deleteNode(node) {
        this.nodeRepository.delete(node);
        this.nodeRepository.load()

    }

    createRoot() {
        this.nodeRepository.createRoot();
        this.nodeRepository.load()

    }

    render(nodes) {
        this.nodeTreeViewer.setNodes(nodes);
        this.nodeTreeViewer.render();

    }

}