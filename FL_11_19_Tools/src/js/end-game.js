'use strict';

const stopGame = () => {
    startButtons.removeEventListener('click', initGameHandler);
    Array.from(startButtons.children).forEach(elem => {
        btnDisable(elem);
    });
    btnEnable(btnReset);
};

const showGameResult = () => {
    let result;
    if (yourPoints > opponentPoints) {
        result = `You've <b>WON!</b>`;
    } else if (yourPoints < opponentPoints) {
        result = `You've <b>LOST!</b>`;
    } else {
        result = `<b>DRAW!</b>`;
    }
    gameStatus.innerHTML += `YOU: <b>${yourPoints}</b> point(s), OPPONENT: <b>${opponentPoints}</b> point(s). ${result}`;
    yourPoints = 0;
    opponentPoints = 0;
};
