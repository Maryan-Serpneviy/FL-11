import init from './init-game.js'; // default import omits {} braces

const startButtons = document.querySelector('.game__start-buttons');
const btnReset = document.querySelector('.btn-reset');

const btnDisable = btn => {
    btn.disabled = true;
    btn.style.backgroundColor = 'lightgray';
};

const btnEnable = btn => {
    btn.disabled = false;
    btn.style = '';
};

const stopGame = () => {
    startButtons.removeEventListener('click', init); // renamed import
    Array.from(startButtons.children).forEach(elem => {
        btnDisable(elem);
    });
    btnEnable(btnReset);
};

btnDisable(btnReset);

export { btnDisable as disable, btnEnable as enable, stopGame as complete };