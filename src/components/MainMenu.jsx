import { useNavigate } from "react-router";
import { useEffect } from "react";
import Button from "./Button";
import useStore from "./useStore";


export function MainMenu() {
    const navigate = useNavigate();
    const setGameTree = useStore((state) => state.setGameTree);
    const resumeGameAction = useStore((state) => state.resumeGame);
    const refreshSavedGameAvailability = useStore((state) => state.refreshSavedGameAvailability);
    const hasSavedGame = useStore((state) => state.hasSavedGame);
    const isStarting = useStore((state) => state.isStarting);
    const isResuming = useStore((state) => state.isResuming);
    const isLoading = useStore((state) => state.isLoading);

    useEffect(() => {
        refreshSavedGameAvailability();
    }, [refreshSavedGameAvailability]);

    const startGame = async () => {
        if (isStarting || isResuming || isLoading) {
            return;
        }

        const started = await setGameTree();
        if (!started) {
            return;
        }

        navigate('/game');
    }

    const resumeGame = async () => {
        if (!hasSavedGame || isStarting || isResuming || isLoading) {
            return;
        }

        const resumed = await resumeGameAction();
        if (!resumed) {
            return;
        }

        navigate('/game');
    }

    return (
        <>
            <Button id="start" onClick={startGame} label={isStarting ? "Starting..." : "Start"} disabled={isStarting || isResuming || isLoading} />
            <Button id="resume" onClick={resumeGame} label={isResuming ? "Resuming..." : "Resume"} disabled={!hasSavedGame || isStarting || isResuming || isLoading} />
        </>
    );
}