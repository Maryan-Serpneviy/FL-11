'use strict';

const btnDisable = btn => {
    btn.disabled = true;
    btn.style.backgroundColor = 'lightgray';
};

const btnEnable = btn => {
    btn.disabled = false;
    btn.style = '';
};

const btnReset = document.querySelector('.btn-reset');
const resetGameHandler = () => {
    rounds = 0;
    gameStatus.innerHTML = '';
    gameStatusInfo.classList.remove('hidden');
    Array.from(startButtons.children).forEach(elem => {
        btnEnable(elem);
    });
    btnDisable(btnReset);
    startButtons.addEventListener('click', initGameHandler);
};
btnDisable(btnReset);
btnReset.addEventListener('click', resetGameHandler);