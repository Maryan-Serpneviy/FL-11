'use strict';

const startButtons = document.querySelector('.game__start-buttons');
const gameStatus = document.querySelector('.game__status');
const btnReset = document.querySelector('.btn-reset');

let rounds = 0;
let yourPoints = 0;
let opponentPoints = 0;

const initGame = move => {
    const opponentMoves = ['Rock', 'Paper', 'Scissors'];
    const opponentMove = opponentMoves[Math.floor(Math.random() * opponentMoves.length)];
    rounds++;

    gameStatus.innerHTML += `<i>Round ${rounds}</i>, <b>${move}</b> vs. <u>${opponentMove}</u>, ${processRoundResult(move, opponentMove)}<br>`;
    if (rounds >= 3) {
        stopGame();
        showGameResult();
    }
};

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

const stopGame = () => {
    startButtons.removeEventListener('click', initGameHandler);
    Array.from(startButtons.children).forEach(elem => {
        elem.disabled = true;
        elem.style.backgroundColor = 'lightgray';
    });
};

const showGameResult = () => {
    let result;
    if (yourPoints > opponentPoints) {
        result = `You've WON!`;
    } else if (yourPoints < opponentPoints) {
        result = `You've LOST!`;
    } else {
        result = `DRAW!`;
    }
    gameStatus.innerHTML += `YOU: <b>${yourPoints}</b> point(s), OPPONENT: <b>${opponentPoints}</b> point(s). <b>${result}</b>`;
    yourPoints = 0;
    opponentPoints = 0;
};

// events 
const initGameHandler = evt => {
    if (evt.target.tagName === 'IMG') {
        initGame(evt.target.className.slice(4, evt.target.length));        
    }
};

startButtons.addEventListener('click', initGameHandler);

const resetGameHandler = () => {
    rounds = 0;
    gameStatus.innerHTML = '';
    Array.from(startButtons.children).forEach(elem => {
        elem.disabled = false;
        elem.style = '';
    });
    startButtons.addEventListener('click', initGameHandler);
};

btnReset.addEventListener('click', resetGameHandler);