// Interface for game data structure.

class GameTree {
    constructor() {
        this.nodes = [];
        this.root = null;
    }

    insertGameNode(node) {
        this.nodes.push(node);
        const index = this.nodes.length - 1;
        this.siftUp(index);
        this.root = this.nodes[0] || null;
        console.log('Inserted node:', node, 'Current game tree:', this.nodes);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    extractRootGameNode() {
        const nodes = this.nodes;

        if (nodes.length === 0) {
            return null;
        }

        const rootNode = nodes[0];
        if (nodes.length === 1) {
            nodes.pop();
            this.root = null;
            return rootNode;
        }

        nodes[0] = nodes.pop();
        this.siftDown(0);
        this.root = nodes[0] || null;
        return rootNode;
    }

    decreaseGameNodeValue(index, new_value) {
        if (index < 0 || index >= this.nodes.length) return;
        this.nodes[index].value = new_value;
        this.siftUp(index);
        this.root = this.nodes[0] || null;
    }

    deleteGameNode(index) {
        if (index < 0 || index >= this.nodes.length) return null;
        const node = this.nodes[index];
        this.decreaseGameNodeValue(index, Number.NEGATIVE_INFINITY);
        return this.extractRootGameNode();
    }

    increaseGameNodeValue(index, new_value) {
        if (index < 0 || index >= this.nodes.length) return;
        this.nodes[index].value = new_value;
        this.siftDown(index);
        this.root = this.nodes[0] || null;
    }

    searchGameNode(node) {
        for (let i = 0; i < this.nodes.length; i++) { 
            if (this.nodes[i] === node) {
                return i; 
            }
        }
        return -1;
    }

    siftUp(index) {
        const nodes = this.nodes;
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (nodes[parentIndex].value > nodes[index].value) {
                [nodes[parentIndex], nodes[index]] = [nodes[index], nodes[parentIndex]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    siftDown(index) {
        const nodes = this.nodes;
        const length = nodes.length;

        while (true) {
            const leftIndex = this.getLeftChildIndex(index);
            const rightIndex = this.getRightChildIndex(index);
            let smallest = index;

            if (leftIndex < length && nodes[leftIndex].value < nodes[smallest].value) {
                smallest = leftIndex;
            }
            if (rightIndex < length && nodes[rightIndex].value < nodes[smallest].value) {
                smallest = rightIndex;
            }

            if (smallest !== index) {
                [nodes[index], nodes[smallest]] = [nodes[smallest], nodes[index]];
                index = smallest;
            } else {
                break;
            }
        }
    }
}

export default GameTree;