class NodeTree {
    nodeRepository;
    nodeTreeViewer;

    constructor(nodeRepository, nodeTreeViewer) {
        this.nodeRepository = nodeRepository;
        this.nodeTreeViewer = nodeTreeViewer;

    }

    deleteNode(node) {
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