import useStore from '../components/useStore';
import calculateScore from './score';
import { changeTraversalMode } from './changeTraversalMode';

class CountAndFeelChars {
    constructor(maxRounds=5, minChars=5, maxChars=20, asciiRange={min: 33, max: 126}) {
        this.maxRounds = maxRounds;
        this.minChars = minChars;
        this.maxChars = maxChars;
        this.asciiRange = asciiRange;
        this.chars = [];
        this.targetChar = this.chooseTargetChar();
        this.round = 1;
        this.sequelae = 0;
        this.carrots = 0;
        this.guessError = 0;
        this.feelingError = 0;
        this.guesses = [];
        this.feelings = [];
        this.targetCharCount = 0;
        this.targetChar = null;
        this.wins = 0;
        this.losses = 0;
        this.gameOver = false;

        this.generateRandomChars();
        this.chooseTargetChar();
    }

    generateRandomChars() {
        const numberOfCharsToGenerate = Math.floor(Math.random() * (this.maxChars - this.minChars + 1)) + this.minChars;
        for (let i = 0; i < numberOfCharsToGenerate; i++) {
            const randomChar = String.fromCharCode(Math.floor(Math.random() * (this.asciiRange.max - this.asciiRange.min + 1)) + this.asciiRange.min);
            this.chars.push(randomChar);
        }
        return this.chars;
    }

    chooseTargetChar() {
        this.targetChar = this.chars[Math.floor(Math.random() * this.chars.length)];
        return this.targetChar;
    }

    countChars(char) {
        const count = this.chars.filter(c => c === char).length;
        return count;
    }

    evaluateTargetCharCountGuess(guess=9000) {
        if(typeof guess !== 'number' || isNaN(Number(guess)) || guess < 0) {
            if(typeof guess === 'string' && guess.trim() !== '' && !isNaN(Number(guess))) {
                guess = guess.charCodeAt(Math.floor(Math.random() * guess.length)); 
            } else if ( Number(guess) < 0){
                guess = 10;
            } else {
                guess = 9001; // default high guess for invalid input
            }
        }
        this.targetCharCount = this.countChars(this.targetChar);
        this.guessError = Math.abs(guess - this.targetCharCount);

        return this.guessError;
    }

    evaluateCharCountFeeling(feeling='meh') {
        let targetCharCountInFeeling = 0;
   
        for (const char of feeling) {
            if (char === this.targetChar) {
                targetCharCountInFeeling++;
            }
        }
        this.feelingError = Math.cbrt(Math.abs(targetCharCountInFeeling - this.targetCharCount) / this.chars.length) * 100;
        return this.feelingError;
    }

    calculateSequelae() {
        this.sequelae += Math.round(Math.cbrt(Math.abs(this.guessError - this.feelingError)) * 100 + 2 * this.losses);
        return this.sequelae;
    }

    calculateCarrots() {
        this.carrots += Math.round((Math.cbrt(this.guessError + this.feelingError) * 100 + Math.PI * this.wins));
        return this.carrots;
    }

    resetGame(guess=9000, feeling='meh') {
        this.guesses.push(guess);
        this.feelings.push(feeling);
        this.targetCharCount = 0;
        this.targetChar = null;
        this.chars = [];
        this.targetChar = null;
        this.guessError = 0;
        this.feelingError = 0;
    }

    nextRound(guess, feeling) {
        this.resetGame(guess, feeling);
        if (this.round >= this.maxRounds) {
            this.gameOver = true;
            return;
        }
        this.round++;
        this.generateRandomChars();
        this.chooseTargetChar();
        return this.round;
    }

    winGame() {
        this.wins++;
        return this.wins;
    }

    loseGame() {
        this.losses++;
        return this.losses;
    }

    playRound(feeling='meh', guess=9000) {      
        const guessError = this.evaluateTargetCharCountGuess(guess);
        const feelingError = this.evaluateCharCountFeeling(feeling);
        if (guessError > 0) {
            this.loseGame();
        } else {
            this.winGame();
        }
        this.calculateSequelae();
        this.calculateCarrots();
        this.nextRound(guess, feeling);
        return { sequelae: this.sequelae, carrots: this.carrots, gameOver: this.gameOver };
    }

    playGame() {
        const store = useStore.getState();
        const sequelae = store.sequelae;
        const carrots = store.carrots;
        while (!this.gameOver) {
            this.playRound();
        }
        // update global state with final results after the loop ends
        store.updateSubGameState({ sequelae: this.sequelae, carrots: this.carrots });
        const scoreChange = calculateScore(this.sequelae, this.carrots, store.traversalMode, store.currentNodeIndex, store.gameTree.nodes);
        store.updateScore(scoreChange);
        store.updateSequelae(this.sequelae);
        store.updateCarrots(this.carrots);
        store.updateScore(scoreChange);
        
        if(this.wins > this.losses) {
            changeTraversalMode(store.traversalMode, 'win');
        } else if (this.losses > this.wins) {
            changeTraversalMode(store.traversalMode, 'lose');
        }

        return {resultingSequelae: this.sequelae, resultingCarrots: this.carrots};
    }

    serialize() {
        return {
            maxRounds: this.maxRounds,
            minChars: this.minChars,
            maxChars: this.maxChars,
            asciiRange: this.asciiRange,
            chars: this.chars,
            targetChar: this.targetChar,
            round: this.round,
            sequelae: this.sequelae,
            carrots: this.carrots,
            guessError: this.guessError,
            feelingError: this.feelingError,
            guesses: this.guesses,
            feelings: this.feelings,
            targetCharCount: this.targetCharCount,
            wins: this.wins,
            losses: this.losses,
            gameOver: this.gameOver,
        };
    }

    static restore(data) {
        const game = new CountAndFeelChars(data.maxRounds, data.minChars, data.maxChars, data.asciiRange);
        Object.assign(game, data);
        return game;
    }

}

export default CountAndFeelChars;