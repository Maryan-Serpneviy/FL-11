'use strict';

const startButtons = document.querySelector('.game__start-buttons');
const gameStatus = document.querySelector('.game__status');
const gameStatusInfo = document.querySelector('.game__status--info');

let rounds = 0;

const initGameHandler = evt => {
    gameStatusInfo.classList.add('hidden');
    if (evt.target.tagName === 'IMG') {
        initGame(evt.target.className.slice(4, evt.target.length));        
    }
};

startButtons.addEventListener('click', initGameHandler);

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