class NodeRepository {
    nodes;

    load() {
        this.nodes = NODES;

    }

    getNodes() {
        return this.nodes;

    }

    getChildren(id) {
        let children = [];

        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].parent_id === id) {
                children.push(this.nodes[i]);

            }

        }

        return children;

    }

    getNodeById(id) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === id) {
                return this.nodes[i];

            }

        }

        return false;

    }

    delete(node) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].parent_id === id) {


            }

        }

    }

    add(node) {


    }

    save() {


    }

}