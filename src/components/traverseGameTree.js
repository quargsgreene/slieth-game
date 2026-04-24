const traverseGameTree = (gameTree, callback, currentIndex = 0, traversalMode = 'inOrder') => {
    if (!gameTree || !gameTree.nodes) {
        console.error("Invalid game tree structure:", gameTree);
        return;
    }

    switch (traversalMode) {
        case "inOrder":
            inOrderTraversal(gameTree, callback);
            break;
        case "preOrder":
            preOrderTraversal(gameTree, callback);
            break;
        case "postOrder":
            postOrderTraversal(gameTree, callback);
            break;
        case "reverseInOrder":
            reverseInOrderTraversal(gameTree, callback);
            break;
        case "reversePreOrder":
            reversePreOrderTraversal(gameTree, callback);
            break;
        case "reversePostOrder":
            reversePostOrderTraversal(gameTree, callback);
            break;
        case "dfs":
            dfsTraversal(gameTree, callback);
            break;
        case "bfs":
            bfsTraversal(gameTree, callback);
            break;
        default:
            console.error("Unsupported traversal mode:", traversalMode);
    }
};

const getTraversalOrder = (gameTree, traversalMode = 'inOrder') => {
    const order = [];
    const collector = (_, index) => order.push(index);

    if (!gameTree || !gameTree.nodes) {
        return order;
    }

    switch (traversalMode) {
        case "inOrder":
            inOrderTraversal(gameTree, collector);
            break;
        case "preOrder":
            preOrderTraversal(gameTree, collector);
            break;
        case "postOrder":
            postOrderTraversal(gameTree, collector);
            break;
        case "reverseInOrder":
            reverseInOrderTraversal(gameTree, collector);
            break;
        case "reversePreOrder":
            reversePreOrderTraversal(gameTree, collector);
            break;
        case "reversePostOrder":
            reversePostOrderTraversal(gameTree, collector);
            break;
        case "dfs":
            dfsTraversal(gameTree, collector);
            break;
        case "bfs":
            bfsTraversal(gameTree, collector);
            break;
        default:
            console.error("Unsupported traversal mode:", traversalMode);
    }

    return order;
};

const inOrderTraversal = (gameTree, callback, nodeIndex = 0) => {
    if (nodeIndex === null || nodeIndex === undefined) return;
    const node = gameTree.nodes[nodeIndex];
    if (!node) return;

    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

    inOrderTraversal(gameTree, callback, leftChildIndex);
    callback(node, nodeIndex);
    inOrderTraversal(gameTree, callback, rightChildIndex);
};

const preOrderTraversal = (gameTree, callback, nodeIndex = 0) => {
    if (nodeIndex === null || nodeIndex === undefined) return;
    const node = gameTree.nodes[nodeIndex];
    if (!node) return;

    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

    callback(node, nodeIndex);
    preOrderTraversal(gameTree, callback, leftChildIndex);
    preOrderTraversal(gameTree, callback, rightChildIndex);
};

const postOrderTraversal = (gameTree, callback, nodeIndex = 0) => {
    if (nodeIndex === null || nodeIndex === undefined) return;
    const node = gameTree.nodes[nodeIndex];
    if (!node) return;

    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

    postOrderTraversal(gameTree, callback, leftChildIndex);
    postOrderTraversal(gameTree, callback, rightChildIndex);
    callback(node, nodeIndex);
};

const reverseInOrderTraversal = (gameTree, callback, nodeIndex = 0) => {
    if (nodeIndex === null || nodeIndex === undefined) return;
    const node = gameTree.nodes[nodeIndex];
    if (!node) return;

    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

    reverseInOrderTraversal(gameTree, callback, rightChildIndex);
    callback(node, nodeIndex);
    reverseInOrderTraversal(gameTree, callback, leftChildIndex);
};

const reversePreOrderTraversal = (gameTree, callback, nodeIndex = 0) => {
    if (nodeIndex === null || nodeIndex === undefined) return;
    const node = gameTree.nodes[nodeIndex];
    if (!node) return;

    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

    callback(node, nodeIndex);
    reversePreOrderTraversal(gameTree, callback, rightChildIndex);
    reversePreOrderTraversal(gameTree, callback, leftChildIndex);
};

const reversePostOrderTraversal = (gameTree, callback, nodeIndex = 0) => {
    if (nodeIndex === null || nodeIndex === undefined) return;
    const node = gameTree.nodes[nodeIndex];
    if (!node) return;

    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

    reversePostOrderTraversal(gameTree, callback, rightChildIndex);
    reversePostOrderTraversal(gameTree, callback, leftChildIndex);
    callback(node, nodeIndex);
};

const dfsTraversal = (gameTree, callback, nodeIndex = 0) => {
    if (nodeIndex === null || nodeIndex === undefined) return;
    const node = gameTree.nodes[nodeIndex];
    if (!node) return;

    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

    callback(node, nodeIndex);
    dfsTraversal(gameTree, callback, leftChildIndex);
    dfsTraversal(gameTree, callback, rightChildIndex);
};

const bfsTraversal = (gameTree, callback) => {
    if (!gameTree || !gameTree.nodes) {
        console.error("Invalid game tree structure:", gameTree);
        return;
    }

    const queue = [0];

    while (queue.length > 0) {
        const nodeIndex = queue.shift();
        const node = gameTree.nodes[nodeIndex];
        if (!node) continue;

        callback(node, nodeIndex);

        const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
        const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);

        if (gameTree.nodes[leftChildIndex] !== null && gameTree.nodes[leftChildIndex] !== undefined) {
            queue.push(leftChildIndex);
        }
        if (gameTree.nodes[rightChildIndex] !== null && gameTree.nodes[rightChildIndex] !== undefined) {
            queue.push(rightChildIndex);
        }
    }
};

const visitNode = async (node) => {
    console.log("Visited node:", node);
    const result = await leaveNodeAfterClick(node);
    console.log("Leaving node after click:", node);
    return;
};

const leaveNodeAfterClick = (node) => {
    return new Promise((resolve) => {
        document.getElementById("next-node").addEventListener("click", () => {
            resolve();
        }, { once: true });
    });
};

export default traverseGameTree;
export { visitNode, getTraversalOrder };

