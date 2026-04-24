import { create } from 'zustand';
import insertNodesIntoGameTree from './InsertNodesIntoGameTree';
import { DrawGameTree } from './DrawGameTree';
import { getTraversalOrder } from './traverseGameTree';

const useStore = create((set) => ({
    gameTree: { nodes: [] },
    gameTreeDisplayObj: null,
    currentNode: null,
    isLoading: false,
    error: null,
    lose: false,
    win: false,
    sequelae: 0,
    carrots: 0,
    traversalMode: 'inOrder', // Default traversal mode
    currentNodeIndex: 0,
    updateCurrentNodeIndex: (index) => set({ currentNodeIndex: index }),
    incrementSequelae: () => set((state) => ({ sequelae: state.sequelae + 1 })),
    incrementCarrots: () => set((state) => ({ carrots: state.carrots + 1 })),
    decrementSequelae: () => set((state) => ({ sequelae: state.sequelae - 1 })),
    decrementCarrots: () => set((state) => ({ carrots: state.carrots - 1 })),
    winGame: () => set({ win: true, lose: false }),
    loseGame: () => set({ lose: true, win: false }),
    setGameTree: async () => {
        set({ isLoading: true, error: null });
        try {
            const gameTree = await insertNodesIntoGameTree();
            const traversalMode = useStore.getState().traversalMode;
            const order = getTraversalOrder(gameTree, traversalMode);
            const currentNodeIndex = order.length > 0 ? order[0] : 0;
            set({ gameTree, currentNodeIndex, isLoading: false });
            console.log("Game tree set in store:", gameTree);
        } catch (error) {
            console.error("Error fetching game tree:", error);
            set({ error: error.message, isLoading: false });
        }
    },
    setGameTreeDisplayObj: async (canvas) => {
        const gameTree = useStore.getState().gameTree;
        if (!gameTree || !gameTree.nodes) {
            console.log("Game tree is not available or has invalid structure:", gameTree);
            console.error("Invalid game tree structure:", gameTree);
            return;
        }
        if (!canvas) {
            console.log("Canvas is not mounted yet, skipping setGameTreeDisplayObj");
            return;
        }
        const drawGameTree = new DrawGameTree(gameTree, canvas);
        console.log("DrawGameTree instance created:", drawGameTree);
        if (drawGameTree && drawGameTree.ctx && drawGameTree.domCanvas) {
            drawGameTree.ctx.clearRect(0, 0, drawGameTree.domCanvas.width, drawGameTree.domCanvas.height);
        }
        drawGameTree.bfs();
        set({ gameTreeDisplayObj: drawGameTree });
    },
    setCurrentNode: (node) => set({ currentNode: node }),
    advanceTraversal: () => {
        const state = useStore.getState();
        const order = getTraversalOrder(state.gameTree, state.traversalMode);
        if (order.length === 0) return;

        const currentPos = order.findIndex((index) => index === state.currentNodeIndex);
        const nextPos = currentPos < 0 ? 0 : Math.min((currentPos + 1) % (order.length), order.length - 1);
        const nextIndex = order[nextPos];
        console.log('next index: ', nextIndex);

        set({ currentNodeIndex: nextIndex });
    },
    setTraversalMode: (mode) => set((state) => {
        const order = getTraversalOrder(state.gameTree, mode);
        return {
            traversalMode: mode,
            currentNodeIndex: order.length > 0 ? order[0] : state.currentNodeIndex,
        };
    }),
}));

export default useStore;