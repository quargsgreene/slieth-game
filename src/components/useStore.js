import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import insertNodesIntoGameTree from './InsertNodesIntoGameTree.js';
import { DrawGameTree } from './DrawGameTree.js';
import { getTraversalOrder } from './traverseGameTree.js';
import updateNodeIndex from './updateNodeIndex.js';

const useStore = create(
    persist(
        (set, get) => ({
            hasSavedGame: !!localStorage.getItem('sliethGameId'),
            inProgress: false,
            gameTree: { nodes: [] },
            gameId: null,
            gameTreeId: null,
            root: null,
            gameTreeDisplayObj: null,
            // currentNode: null,
            isLoading: false,
            error: null,
            isStarting: false,
            isResuming: false,
            lose: false,
            win: false,
            sequelae: 0,
            carrots: 0,
            traversalMode: 'inOrder', // Default traversal mode
            currentNodeIndex: 0,
            toggleInProgress: () => set((state) => ({inProgress: !state.inProgress})),
            toggleIsLoading: () => set((state) => ({isLoading: !state.isLoading})),
            setError: (error) => set({error: error}),
            refreshSavedGameAvailability: () => {
                const savedGameId = localStorage.getItem('sliethGameId');
                set({ hasSavedGame: !!savedGameId });
            },
            updateCurrentNodeIndex: (index) => set({ currentNodeIndex: index }),
            incrementSequelae: () => set((state) => ({ sequelae: state.sequelae + 1 })),
            incrementCarrots: () => set((state) => ({ carrots: state.carrots + 1 })),
            decrementSequelae: () => set((state) => ({ sequelae: state.sequelae - 1 })),
            decrementCarrots: () => set((state) => ({ carrots: state.carrots - 1 })),
            winGame: () => set({ win: true, lose: false }),
            loseGame: () => set({ lose: true, win: false }),
            setGameTree: async () => {
                if (get().isStarting) {
                    return false;
                }

                set({ isLoading: true, isStarting: true, error: null });
                try {
                    const { gameTree, game } = await insertNodesIntoGameTree();
                    const traversalMode = get().traversalMode;
                    const order = getTraversalOrder(gameTree, traversalMode);
                    const currentNodeIndex = order.length > 0 ? order[0] : 0;
                    const root = gameTree.nodes[0];
                    const gameId = game?.gameId || null;
                    const gameTreeId = game?._id || null;
                    if (gameId) {
                        localStorage.setItem('sliethGameId', gameId);
                    }
                    set({
                        gameTree,
                        root,
                        currentNodeIndex,
                        gameId,
                        gameTreeId,
                        hasSavedGame: !!gameId,
                        isLoading: false,
                        isStarting: false,
                    });
                    console.log("Game tree set in store: ", gameTree);
                    return true;
                } catch (error) {
                    console.error("Error fetching game tree:", error);
                    set({ error: error.message, isLoading: false, isStarting: false });
                    return false;
                }
            },
            loadGameTreeByGameId: async (gameId) => {
                set({ isLoading: true, error: null });
                if (!gameId) {
                    set({ error: 'No saved game id found', isLoading: false, hasSavedGame: false });
                    return false;
                }

                try {
                    const response = await fetch(`/api/game/external/${encodeURIComponent(gameId)}`);
                    if (!response.ok) {
                        const message = response.status === 404 ? 'Saved game not found' : 'Failed to load saved game';
                        if (response.status === 404) {
                            localStorage.removeItem('sliethGameId');
                        }
                        set({ error: message, isLoading: false, hasSavedGame: false });
                        return false;
                    }

                    const gameTree = await response.json();
                    const traversalMode = gameTree.traversalMode || get().traversalMode;
                    const order = getTraversalOrder(gameTree, traversalMode);
                    const currentNodeIndex = gameTree.currentNodeIndex ?? (order.length > 0 ? order[0] : 0);
                    const root = gameTree.root ?? gameTree.nodes?.[0] ?? null;

                    set({
                        gameTree,
                        gameId,
                        gameTreeId: gameTree._id ?? null,
                        root,
                        traversalMode,
                        currentNodeIndex,
                        lose: gameTree.lose,
                        win: gameTree.win,
                        sequelae: gameTree.sequelae,
                        carrots: gameTree.carrots,
                        hasSavedGame: true,
                        isLoading: false,
                    });
                    return true;
                } catch (error) {
                    console.error('Error loading game tree by gameId:', error);
                    set({ error: error.message, isLoading: false, hasSavedGame: false });
                    return false;
                }
            },
            resumeGame: async () => {
                if (get().isResuming) {
                    return false;
                }
                const gameId = localStorage.getItem('sliethGameId');
                if (!gameId) {
                    set({ hasSavedGame: false, error: 'No saved game id found' });
                    return false;
                }

                set({ isResuming: true });
                try {
                    return await get().loadGameTreeByGameId(gameId);
                } finally {
                    set({ isResuming: false, hasSavedGame: !!localStorage.getItem('sliethGameId') });
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

                const gameTreeId = state.gameTreeId;
                const currentPos = order.findIndex((index) => index === state.currentNodeIndex);
                const nextPos = currentPos < 0 ? 0 : Math.min((currentPos + 1) % (order.length), order.length - 1);
                const nextIndex = order[nextPos];
                console.log('next index: ', nextIndex);

                set({ currentNodeIndex: nextIndex });
                updateNodeIndex(nextIndex, gameTreeId);
            },
            setTraversalMode: (mode) => set((state) => {
                const order = getTraversalOrder(state.gameTree, mode);
                return {
                    traversalMode: mode,
                    currentNodeIndex: order.length > 0 ? order[0] : state.currentNodeIndex,
                };
            }),
        }),
        {
            name: 'slieth-game-storage',
            partialize: (state) => ({
                hasSavedGame: state.hasSavedGame,
                inProgress: state.inProgress,
                gameTree: state.gameTree,
                gameId: state.gameId,
                gameTreeId: state.gameTreeId,
                root: state.root,
                isLoading: state.isLoading,
                error: state.error,
                isStarting: state.isStarting,
                isResuming: state.isResuming,
                lose: state.lose,
                win: state.win,
                sequelae: state.sequelae,
                carrots: state.carrots,
                traversalMode: state.traversalMode,
                currentNodeIndex: state.currentNodeIndex,
            }),
        }
    )
)

export default useStore;