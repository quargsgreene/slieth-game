const enforceGlobalGameOutcome = (store) => {
    const score = store.score;
    const gameTreeSize = store.gameTree?.nodes?.length || 0;
    if (gameTreeSize === 0) {
        return;
    }
    if (score >= 100 || store.sequelae >= 1000) {
        store.loseGame();
        return "lose";
    } else if (gameTreeSize > 1000 && score <= 100) {
        store.winGame();
        return "win";
    } else {
        return;
    }
};

export default enforceGlobalGameOutcome;