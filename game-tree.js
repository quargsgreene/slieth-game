// Interface for game data structure.

class GameTree {
    constructor() {
        this.nodes = [];
    }

    insertGameNode(node) {
        if (!this.root) {
            this.root = node;
            this.nodes.push(node);
            console.log('Inserted root node:', node);
        } else {
            this.nodes.push(node);
            let index = this.nodes.length - 1;
            this.minHeapifyGameTree(index);
            console.log('Inserted node:', node, 'Current game tree:', this.nodes);
        }
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
        let nodes = this.nodes;

        if (nodes.length === 0) {
            return null;
        } else if (nodes.length === 1) {
            return nodes.pop();
        } else {
            let rootNode = nodes[0];
            nodes[0] = nodes.pop(); 
            this.minHeapifyGameTree(0);

            return rootNode;
        }
    }

    decreaseGameNodeValue(index, new_value) {
        let nodes = this.nodes;
        nodes[index] = new_value;
        this.minHeapifyGameTree(index);
    }

    deleteGameNode(index) {
        let node = this.nodes[index];
        this.decreaseGameNodeValue(index, -Infinity);
        this.extractRootGameNode();
        return node;
    }

    increaseGameNodeValue(index, new_value) {
        let nodes = this.nodes;
        nodes[index].value = new_value;
        this.minHeapifyGameTree(index);
    }

    searchGameNode(node) {
        for (let i = 0; i < this.nodes.length; i++) { 
            if (this.nodes[i] === node) {
                return i; 
            }
        }
        return -1;
    }

    minHeapifyGameTree(index) {
        console.log('Min-heapifying game tree at index:', index);
        let nodes = this.nodes;
        let numberOfNodes = nodes.length;
        if (numberOfNodes === 1) {
            return;
        }
        let leftChildIndex = this.getLeftChildIndex(index);
        let rightChildIndex = this.getRightChildIndex(index);
        let smallestIndex = index;

        if (leftChildIndex < numberOfNodes && nodes[leftChildIndex].value < nodes[smallestIndex].value) {
            smallestIndex = leftChildIndex;
        }

        if (rightChildIndex < numberOfNodes && nodes[rightChildIndex].value < nodes[smallestIndex].value) {
            smallestIndex = rightChildIndex;
        }

        if (smallestIndex !== index) {
            [nodes[index], nodes[smallestIndex]] = [nodes[smallestIndex], nodes[index]];
            this.minHeapifyGameTree(smallestIndex);
        }
    }
}

export default GameTree;