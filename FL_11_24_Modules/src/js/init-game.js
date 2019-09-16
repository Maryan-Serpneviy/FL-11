import { processRoundResult, showGameResult as defineResult /* rename imported value */ } from './round.js';
import * as endGame from './end-game.js';
// import stopGame, /* <= default import, {} omitted */ { btnEnable, btnDisable } from './end-game.js';
// all imported values are constants

const startButtons = document.querySelector('.game__start-buttons');
const btnReset = document.querySelector('.btn-reset');
const gameStatus = document.querySelector('.game__status');
const gameStatusInfo = document.querySelector('.game__status--info');

let rounds = 0;

const initGameHandler = evt => {
    gameStatusInfo.classList.add('hidden');
    if (evt.target.tagName === 'IMG') {
        initGame(evt.target.className.slice(4, evt.target.length));        
    }
};

const resetGameHandler = () => {
    rounds = 0;
    gameStatus.innerHTML = '';
    gameStatusInfo.classList.remove('hidden');
    Array.from(startButtons.children).forEach(elem => {
        endGame.enable(elem);
    });
    endGame.disable(btnReset);
    startButtons.addEventListener('click', initGameHandler);
};

startButtons.addEventListener('click', initGameHandler);
btnReset.addEventListener('click', resetGameHandler);

const initGame = move => {
    const opponentMoves = ['Rock', 'Paper', 'Scissors'];
    const opponentMove = opponentMoves[Math.floor(Math.random() * opponentMoves.length)];
    rounds++;
    
    gameStatus.innerHTML += `<i>Round ${rounds}</i>, <b>${move}</b> vs. <u>${opponentMove}</u>, ${processRoundResult(move, opponentMove)}<br>`;
    if (rounds >= 3) {
        endGame.complete();
        defineResult(); // renamed imported value
    }
};

export default initGameHandler; // default export omits {} braces
// only one export default by module