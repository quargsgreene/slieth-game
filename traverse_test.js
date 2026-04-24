const gameTree = {
  nodes: [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
    { value: 60 },
  ],
  getLeftChildIndex(i){return 2*i+1;},
  getRightChildIndex(i){return 2*i+2;}
};

function inOrderTraversal(gameTree, callback, nodeIndex = 0) {
  if (nodeIndex === null || nodeIndex === undefined) return;
  if (nodeIndex >= gameTree.nodes.length) return;
  const node = gameTree.nodes[nodeIndex];
  if (!node) return;
  const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
  const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);
  inOrderTraversal(gameTree, callback, leftChildIndex);
  callback(node, nodeIndex);
  inOrderTraversal(gameTree, callback, rightChildIndex);
}

function preOrderTraversal(gameTree, callback, nodeIndex = 0) {
  if (nodeIndex === null || nodeIndex === undefined) return;
  if (nodeIndex >= gameTree.nodes.length) return;
  const node = gameTree.nodes[nodeIndex];
  if (!node) return;
  const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
  const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);
  callback(node, nodeIndex);
  preOrderTraversal(gameTree, callback, leftChildIndex);
  preOrderTraversal(gameTree, callback, rightChildIndex);
}

function postOrderTraversal(gameTree, callback, nodeIndex = 0) {
  if (nodeIndex === null || nodeIndex === undefined) return;
  if (nodeIndex >= gameTree.nodes.length) return;
  const node = gameTree.nodes[nodeIndex];
  if (!node) return;
  const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
  const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);
  postOrderTraversal(gameTree, callback, leftChildIndex);
  postOrderTraversal(gameTree, callback, rightChildIndex);
  callback(node, nodeIndex);
}

function bfsTraversal(gameTree, callback) {
  if (!gameTree || !gameTree.nodes) return;
  const queue = [0];
  while (queue.length) {
    const nodeIndex = queue.shift();
    if (nodeIndex >= gameTree.nodes.length) continue;
    const node = gameTree.nodes[nodeIndex];
    if (!node) continue;
    callback(node, nodeIndex);
    const leftChildIndex = gameTree.getLeftChildIndex(nodeIndex);
    const rightChildIndex = gameTree.getRightChildIndex(nodeIndex);
    if (leftChildIndex < gameTree.nodes.length && gameTree.nodes[leftChildIndex] != null) queue.push(leftChildIndex);
    if (rightChildIndex < gameTree.nodes.length && gameTree.nodes[rightChildIndex] != null) queue.push(rightChildIndex);
  }
}

['in','pre','post','bfs'].forEach(mode => {
  const order = [];
  const cb = (_, index) => order.push(index);
  if (mode === 'in') inOrderTraversal(gameTree, cb);
  if (mode === 'pre') preOrderTraversal(gameTree, cb);
  if (mode === 'post') postOrderTraversal(gameTree, cb);
  if (mode === 'bfs') bfsTraversal(gameTree, cb);
  console.log(mode, order);
});
