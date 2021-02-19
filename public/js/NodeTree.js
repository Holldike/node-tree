class NodeTree {
    $box;
    nodeRepository;
    nodeTreeViewer;

    constructor($box) {
        this.$box = $box;
        this.nodeRepository = new NodeRepository();
        this.nodeTreeViewer = new NodeTreeViewer(this);

        this.render();

    }

    addNode(node) {
        this.nodeRepository.add(node);
        this.render();

    }

    updateNode(node) {
        this.nodeRepository.update(node);
        this.render();

    }

    deleteNode(node) {
        this.nodeRepository.delete(node);
        this.render();

    }

    createRoot() {
        this.nodeRepository.createRoot();
        this.render();

    }

    render() {
        this.nodeRepository.load(
            (nodes) => {
                this.nodeTreeViewer.setNodes(nodes)
                this.nodeTreeViewer.render()

            });

    }

}