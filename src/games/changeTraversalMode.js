import useStore from '../components/useStore.js';
export const changeTraversalMode = (traversalMode) => {
    useStore.setState({ traversalMode: traversalMode });
    return traversalMode;
}