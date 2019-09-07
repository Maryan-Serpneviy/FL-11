const gameStatus = document.querySelector('.game__status');

let yourPoints = 0;
let opponentPoints = 0;

// immediate export of variable declaration
export const processRoundResult = (yourMove, opponentMove) => {
    const y = `You've`;
    let result;
    if (yourMove === 'Rock' && opponentMove === 'Scissors') {
        yourPoints++;
        result = `${y} <b>WON!</b>`;
    } else if (yourMove === 'Rock' && opponentMove === 'Paper') {
        opponentPoints++;
        result = `${y} <b>LOST!</b>`;
    } else if (yourMove === 'Paper' && opponentMove === 'Rock') {
        yourPoints++;
        result = `${y} <b>WON!</b>`;
    } else if (yourMove === 'Paper' && opponentMove === 'Scissors') {
        opponentPoints++;
        result = `${y} <b>LOST!</b>`;
    } else if (yourMove === 'Scissors' && opponentMove === 'Paper') {
        yourPoints++;
        result = `${y} <b>WON!</b>`;
    } else if (yourMove === 'Scissors' && opponentMove === 'Rock') {
        opponentPoints++;
        result = `${y} <b>LOST!</b>`;
    } else {
        result = `<b>DRAW!</b>`;
    }
    return result;
};

// immediate export of variable declaration
export const showGameResult = () => {
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