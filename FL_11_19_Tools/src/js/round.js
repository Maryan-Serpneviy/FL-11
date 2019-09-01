'use strict';

let yourPoints = 0;
let opponentPoints = 0;

const processRoundResult = (yourMove, opponentMove) => {
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