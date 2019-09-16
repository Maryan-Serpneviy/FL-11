import constants from './constants.js';
import { fetchData } from './ajax.js';

const rootNode = document.querySelector('#root');
const btnReload = document.querySelector('#btn-reload');
const hint = document.querySelector('#hint');
const hintHide = document.querySelector('.hint-hide');

const getUserPosts = function() {
    const userId = parseInt(this.parentNode.children[1].textContent);
    fetchData('posts', userId);
};

const showLoader = () => {
    document.querySelector('.loader').classList.remove('hidden');
    rootNode.classList.add('hidden');
};

const hideLoader = () => {
    document.querySelector('.loader').classList.add('hidden');
    rootNode.classList.remove('hidden');
};

btnReload.addEventListener('click', () => {
    location.reload();
});

hintHide.addEventListener('click', () => {
    hint.style = constants.VANISH;
});

document.addEventListener('keydown', () => {
    hint.style = constants.VANISH;
});

document.addEventListener('click', () => {
    hint.style = constants.VANISH;
});

export { getUserPosts, showLoader, hideLoader };