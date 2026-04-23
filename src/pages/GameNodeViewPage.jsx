import GameNodeView from '../components/GameNodeView';
import useStore from '../components/useStore';

export default function GameNodeViewPage() {
    const gameNode = useStore((state) => {
        const tree = state.gameTree;
        if (!tree || !tree.nodes) return null;
        return tree.nodes[state.currentNodeIndex] ?? null;
    });

    return (
        <div>
            <GameNodeView gameNode={gameNode} />
        </div>
    );
}
