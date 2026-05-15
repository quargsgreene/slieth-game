const calculateScore = (sequelae, carrots, traversalMode='inOrder', currentNodeIndex = 0, nodes) => {
    const traversalNumber = calculateTraversalNumber(traversalMode);
    const nodeMean = calculateNodeMean(nodes);
    const score = ((sequelae * traversalNumber) / (carrots * currentNodeIndex)) ** nodeMean;
    const globalScoreChangePerNode = score / (traversalMode.length * currentNodeIndex);
    return globalScoreChangePerNode;
}

const calculateTraversalNumber = (traversalMode) => {
    switch (traversalMode) {
        case 'inOrder':
            return 1;
        case 'preOrder':
            return 2;
        case 'postOrder':
            return 3;
        case 'reverseInOrder':
            return 3/4;
        case 'reversePreOrder':
            return 2/3;
        case 'reversePostOrder':
            return 3/4;
        case 'dfs':
            return 1/10;
        case 'bfs':
            return 1/100;
        default:
            return 0;
    }
};

const calculateNodeMean = (nodes) => {
    const initialValue = 0;
    const numNodes = nodes.length;
    const nodeSum = nodes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );

    const nodeMean = nodeSum / numNodes;
    return nodeMean;
}

export default calculateScore;
export { calculateTraversalNumber, calculateNodeMean };