import DrawGameNode from "./DrawGameNode";

export class DrawGameTree {
    // pass in binary min heap game tree
        constructor(tree){
            this.root = null;
        
            this.xAxisSize = 350;
            this.yAxisSize = 80;
            this.domCanvas = document.getElementById('game-tree-canvas');
            this.ctx = this.domCanvas.getContext('2d');
            this.startPosition = {x: this.domCanvas.width/2, y:this.domCanvas.height/2};

            for(let node of tree.nodes) {
                console.log('Inserting node into draw tree:', node);
                this.addNode(node.value);
            }

    }

   getNodePosition ({x, y}, isLeft = false) { 
        return {
            x: isLeft ? x - this.xAxisSize + y : x + this.xAxisSize - y,
            y: y + this.yAxisSize
        };
    }

    bfs () {
        const queue = [];
        const black = '#000000';
        queue.push(this.root);
        while(queue.length !== 0) {
            const node = queue.shift();
            const {x, y} = node.pos;
            const color = "#"+((1<<24)*Math.random()|0).toString(16);
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.strokeStyle = black;
            this.ctx.stroke();
            this.ctx.strokeStyle = black;
            this.ctx.strokeText(node.value, x, y);
            console.log('Drawing node:', node.value, 'at position:', node.pos);

            node.children.forEach(child => {
                const {x: x1, y: y1} = child.pos;            
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + child.radius);
                this.ctx.lineTo(x1, y1 - child.radius);
                this.ctx.stroke();
                queue.push(child);
            });
        }
    }

    addNode (value) {
        const newNode = new DrawGameNode(value);
        if(this.root === null) {
            newNode.pos = this.startPosition;
            this.root = newNode;
            console.log('Inserted root node to draw position 1:', newNode.pos);
        } else {
            let node = this.root;
            while(node) {
                if(node.value === value) {
                    break;
                }
                if (value > node.value) {
                    if(node.right) {
                        node = node.right;
                    } else {
                        console.log('Inserting node with value at position 2:',node.pos);
                        newNode.pos = this.getNodePosition(node.pos, false);
                        node.right = newNode;
                        break;
                    }
                } else {
                    if(node.left) {
                        node = node.left;
                    } else {
                        console.log('Inserting node with value at position 3:',node.pos);
                        newNode.pos = this.getNodePosition(node.pos, true);
                        node.left = newNode;
                        break;
                    }
                }
            }
        }
    }

}