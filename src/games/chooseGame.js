const chooseGame = () => {
    const gameNumber = Math.floor(Math.random() * 3);
    switch (gameNumber) {
        case 0:
            return 'countAndFeelChars';
        case 1:
            return 'connectPlumbingAndTingle';
        case 2:
            return 'freqOrderings';
        default:
            return 'countAndFeelChars';
    }
}

export default chooseGame;