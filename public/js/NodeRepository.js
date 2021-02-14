class NodeRepository {
    nodes;

    constructor() {
        this.nodes = NODES;

    }

    getNodes() {
        return this.nodes;

    }

    delete(node) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].parent_id === node.id || this.nodes[i].id === node.id) {
                this.nodes.splice(i, 1);

            }

        }

    }

    add(node) {
        this.nodes.push({id: 23, name: 'node', parent_id: node.id});

    }

    createRoot() {
        this.nodes.push({id: 1, name: 'node', parent_id: null});

    }

    save() {
        //TODO: white save with ajax

    }

}