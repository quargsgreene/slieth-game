import { create } from 'zustand';
import insertNodesIntoGameTree from './InsertNodesIntoGameTree';

const useStore = create((set) => ({
    gameTree: [],
    isLoading: false,
    error: null,
    lose: false,
    win: false,
    sequelae: 0,
    carrots: 0,
    traversalMode: 'in-order',
    currentNodeIndex: 0,
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
            set({ gameTree, isLoading: false });
            console.log("Game tree set in store:", gameTree);
        } catch (error) {
            console.error("Error fetching game tree:", error);
            set({ error: error.message, isLoading: false });
        }
    }
}));

export default useStore;