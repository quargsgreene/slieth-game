import DrawGameNode from "./DrawGameNode";
import useStore from "./useStore";

export class DrawGameTree {
    // pass in binary min heap game tree and a mounted canvas element
    constructor(tree, canvas){
        this.root = null;
        this.domCanvas = canvas || document.getElementById('game-tree-canvas');
        if (!this.domCanvas) {
            throw new Error('Canvas element not available for DrawGameTree');
        }
        this.ctx = this.domCanvas.getContext('2d');
        this.xAxisSize = Math.min(350, this.domCanvas.width / 2 - 60);
        this.yAxisSize = Math.min(100, this.domCanvas.height / 6);
        this.markedIndex = useStore.getState().currentNodeIndex;
        this.startPosition = {x: this.domCanvas.width / 2, y: this.domCanvas.height / 6};
        this.treeStructure = tree;
        console.log('tree to draw: ', this.treeStructure);

        this.drawNodes = tree.nodes.map((node, index) => new DrawGameNode(node.value, index));
        if (this.drawNodes.length > 0) {
            this.root = this.drawNodes[0];
            this.drawNodes.forEach((drawNode, index) => {
                const leftIndex = 2 * index + 1;
                const rightIndex = 2 * index + 2;
                if (this.drawNodes[leftIndex]) drawNode.left = this.drawNodes[leftIndex];
                if (this.drawNodes[rightIndex]) drawNode.right = this.drawNodes[rightIndex];
            });
            this.positionTree(this.root, this.startPosition, this.xAxisSize);
        }
    }

    positionTree(node, position, xOffset) {
        node.pos = position;
        const nextOffset = Math.max(40, xOffset / 1.8);
        if (node.left) {
            this.positionTree(node.left, { x: position.x - xOffset, y: position.y + this.yAxisSize }, nextOffset);
        }
        if (node.right) {
            this.positionTree(node.right, { x: position.x + xOffset, y: position.y + this.yAxisSize }, nextOffset);
        }
    }

    bfs () {
        const queue = [];
        const black = '#000000';
        const currentNodeIndex = useStore.getState().currentNodeIndex;
        queue.push(this.root);
        while(queue.length !== 0) {
            const node = queue.shift();
            const {x, y} = node.pos;
            const color = node.index === currentNodeIndex ? '#ff0000' : '#fcba03';
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.strokeStyle = black;
            this.ctx.stroke();
            this.ctx.strokeStyle = black;
            this.ctx.strokeText(node.value, x, y);
            console.log('Drawing node:', node.value, 'at position:', node.pos);

            if (node.left) {
                const {x: x1, y: y1} = node.left.pos;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + node.left.radius);
                this.ctx.lineTo(x1, y1 - node.left.radius);
                this.ctx.stroke();
                queue.push(node.left);
            }
            if (node.right) {
                const {x: x1, y: y1} = node.right.pos;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + node.right.radius);
                this.ctx.lineTo(x1, y1 - node.right.radius);
                this.ctx.stroke();
                queue.push(node.right);
            }
        }
    }

    markCurrentNode(index, color) {
        console.log('Marking current node with index:', index, 'and color:', color);
        const queue = [];
        queue.push(this.root);
        while(queue.length !== 0) {
            const node = queue.shift();
            if(node.index === index) {
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(node.pos.x, node.pos.y, 20, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.strokeStyle = '#000000';
                this.ctx.stroke();
                this.ctx.strokeStyle = '#000000';
                this.ctx.strokeText(node.value, node.pos.x, node.pos.y);
                break;
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
};