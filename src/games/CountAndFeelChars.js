class CountAndFeelChars {
    constructor(maxRounds, minChars, maxChars, asciiRange) {
        this.maxRounds = maxRounds;
        this.minChars = minChars;
        this.maxChars = maxChars;
        this.asciiRange = asciiRange;
        this.chars = this.generateRandomChars();
        this.targetChar = this.chooseTargetChar();
        this.round = 0;
        this.sequelae = 0;
        this.carrots = 0;
        this.guessError = 0;
        this.feelingError = 0;
        this.guess = null;
        this.feeling = '';
        this.targetCharCount = 0;
        this.targetChar = null;
        this.wins = 0;
        this.losses = 0;
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

    evaluateTargetCharCountGuess(guess) {
        this.targetCharCount = this.countChars(this.targetChar);
        this.guessError = Math.abs(guess - this.targetCharCount);
        return this.guessError;
    }

    evaluateCharCountFeeling(feeling) {
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
        this.sequelae = Math.cbrt(this.guessError + this.feelingError) * 100 + this.losses;
        return this.sequelae;
    }

    calculateCarrots() {
        this.carrots = Math.cbrt(this.guessError + this.feelingError) * 100 + this.wins;
        return this.carrots;
    }

    resetGame() {
        this.round = 0;
        this.guess = null;
        this.feeling = '';
        this.targetCharCount = 0;
        this.targetChar = null;
        this.chars = [];
        this.targetChar = null;
        this.guessError = 0;
        this.feelingError = 0;
    }

    nextRound() {
        if (this.round >= this.maxRounds) {
            return;
        }
        this.resetGame();
        this.generateRandomChars();
        this.chooseTargetChar();
        this.round++;
        return this.round;
    }

    endGame() {
        return this.round >= this.maxRounds;
    }

    winGame() {
        this.wins++;
        return this.wins;
    }

    loseGame() {
        this.losses++;
        return this.losses;
    }

    playRound() {
        this.nextRound();
        this.evaluateTargetCharCountGuess(this.guess);
        this.evaluateCharCountFeeling(this.feeling);
        this.calculateSequelae();
        this.calculateCarrots();
        return this.sequelae, this.carrots;
    }

    playGame() {
        while (!this.endGame()) {
            this.playRound();
        }
        return {resultingSequelae: this.sequelae, resultingCarrots: this.carrots};
    }

}

export default CountAndFeelChars;