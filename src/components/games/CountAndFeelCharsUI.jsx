import CountAndFeelChars from "../../games/CountAndFeelChars";
import generateGameParams from "../../games/generateGameParams";
import enforceGlobalGameOutcome from "../../games/enforceGlobalGameOutcome";
import Button from "../Button";
import FormField from '../FormField';
import useStore from '../useStore';
import { useNavigate } from "react-router";
import { useState, useReducer, useRef, useCallback, useEffect } from 'react';

const reducer = (state, action) => {
    switch(action.type) {
        case 'update_input':
            return {...state, [action.payload.name]: action.payload.value};
        case 'play_round':
            return {
                ...state, 
                round: action.payload.round,
                targetChar: action.payload.targetChar,
                sequelae: action.payload.sequelae,
                carrots: action.payload.carrots,
                wins: action.payload.wins,
                losses: action.payload.losses,
                chars: action.payload.chars,
                feelings: [...state.feelings, state.feeling],
                guesses: [...state.guesses, state.guess],
            };
        case 'game_over':
            return {...state, gameOver: true};
        default:
            return state;
    }
}

export default function CountAndFeelCharsUI(){
    const navigate = useNavigate();
    const [input, setInput] = useState({guess: '', feeling: ''});

    const nodeId = useStore((s) => s.gameTree?.nodes?.[s.currentNodeIndex]?._id);
    const savedSubGameState = useStore((s) => (nodeId ? s.subGameStates?.[nodeId] : null));
    const saveSubGameState = useStore((s) => s.saveSubGameState);

    const gameRef = useRef(null);
    if(!gameRef.current) {
        if (savedSubGameState) {
            gameRef.current = CountAndFeelChars.restore(savedSubGameState);
        } else {
            const gameParams = generateGameParams('CountAndFeelChars');
            gameRef.current = new CountAndFeelChars(
                gameParams.maxRounds,
                gameParams.minChars,
                gameParams.maxChars,
                gameParams.asciiRange
            );
        }
    }
    const currentGame = gameRef.current;
    const [gameState, dispatchGameState] = useReducer(reducer, gameRef.current);

    const handleChange = useCallback((e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}));
        dispatchGameState({type: 'update_input', payload: {name: e.target.name, value: e.target.value}});
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (currentGame.gameOver) return;
        const guess = Number(input.guess);
        const feeling = input.feeling || 'meh';
        const { sequelae, carrots, gameOver } = currentGame.playRound(feeling, guess);
        dispatchGameState({
            type: 'play_round',
            payload: {
                        sequelae,
                        carrots,
                        wins: currentGame.wins,
                        losses: currentGame.losses,
                        chars: currentGame.chars,
                        feelings: currentGame.feelings,
                        guesses: currentGame.guesses,
                        targetChar: currentGame.targetChar,
                        round: currentGame.round,
                        gameOver: gameOver
                    }
        });
        saveSubGameState(nodeId, currentGame.serialize());
    }, [currentGame, input, nodeId, saveSubGameState]);


    const isGameOver = gameState.gameOver || currentGame.gameOver;

    useEffect(() => {
        if (!isGameOver) return;
        dispatchGameState({type: 'game_over'});
        saveSubGameState(nodeId, currentGame.serialize());

        const globalOutcome = enforceGlobalGameOutcome(useStore.getState());
        if (globalOutcome === "win") {
            navigate('/win');
            useStore.getState().endGame();
        } else if (globalOutcome === "lose") {
            navigate('/lose');
            useStore.getState().endGame();
        }
    }, [isGameOver, nodeId, currentGame, saveSubGameState, navigate]);

    return (
        <div id="count-and-feel-chars-ui">
            {isGameOver ? (
                <h3 id="game-over-result">
                    Game Over! Final Sequelae: {gameState.sequelae || currentGame.sequelae},
                    Final Carrots: {gameState.carrots || currentGame.carrots},
                    Wins: {gameState.wins || currentGame.wins},
                    Losses: {gameState.losses || currentGame.losses}
                </h3>
            ) : (
                <>
                    <h2 id="round-display">Round: {gameState.round || currentGame.round}</h2>
                    <h2 id="target-char-display">Target Symbol: {gameState.targetChar || currentGame.targetChar}</h2>
                    <h2 id="sequelae-display">Net Sequelae Change: {gameState.sequelae || currentGame.sequelae}</h2>
                    <h2 id="carrots-display">Net Carrot Change: {gameState.carrots || currentGame.carrots}</h2>
                    <h2 id="wins-display">Wins: {gameState.wins || currentGame.wins}</h2>
                    <h2 id="losses-display">Losses: {gameState.losses || currentGame.losses}</h2>
                    <h2 id="feelings-display">Feelings: {gameState.feelings ? currentGame.feelings.length : 0}</h2>
                    <h2 id="guesses-display">Guesses: {gameState.guesses ? currentGame.guesses.length : 0}</h2>
                    <p id="chars-display">{(gameState.chars && gameState.chars.join('')) || currentGame.chars.join('')}</p>
                    <FormField  id="guess" label="How many target symbols are there?" type="text" name="guess" onChange={handleChange} />
                    <FormField id="feeling" label="How does that make you feel?" type="text" name="feeling" onChange={handleChange} />
                    <Button id="submit-game" type="submit" onChange={handleChange} onClick={handleSubmit} label="Submit to Overlords" disabled={false} />
                </>
            )}
        </div>
    );

}