import constants from './constants.js';

const rootNode = document.querySelector('#root');

export const showLoader = () => {
    document.querySelector('.loader').classList.remove('hidden');
    rootNode.classList.add('hidden');
};
export const hideLoader = () => {
    document.querySelector('.loader').classList.add('hidden');
    rootNode.classList.remove('hidden');
};

const hint = document.querySelector('#hint');
const hintHide = document.querySelector('.hint-hide');
hintHide.addEventListener('click', () => {
    hint.style = constants.VANISH;
})

document.addEventListener('keydown', () => {
    hint.style = constants.VANISH;
});

document.addEventListener('click', () => {
    hint.style = constants.VANISH;
})