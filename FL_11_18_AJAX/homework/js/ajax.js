import constants from './constants.js';
import { statusHandler } from './handlers.js';
import { displayUsers } from './main.js';
import { loadPosts } from './posts.js';

const btnFetchData = document.querySelector('#btn-fetch-data');

window.addEventListener('DOMContentLoaded', () => {
    location.hash = '#/main';
    localStorage.clear();
    btnFetchData.addEventListener('click', renderMain);
});

const renderMain = () => fetchData('users');

async function fetchData(dataType, id) {
    const response = await timeoutableFetch(`${constants.API}/${dataType}`);
    statusHandler(response.status, 'downloaded');
    const data = await response.json();
    if (dataType === 'users') {
        displayUsers(data);
    } else if (dataType === 'posts') {
        loadPosts(data, id);
    }
}

const timeoutableFetch = (url, options = {}) => {
    let { timeout = constants.CONNECTION_TIMEOUT, ...rest } = options;
    if (rest.signal) throw new Error("Signal not supported in timeoutable fetch");
    const controller = new AbortController();
    const { signal } = controller;
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
        reject(statusHandler('timeout'));
        controller.abort();
        }, timeout);
        fetch(url, { signal, ...rest })
        .finally(() => clearTimeout(timer))
        .then(resolve, reject);
    });
};

export { fetchData, timeoutableFetch, renderMain };

/*
const fetchData = (dataType, id) => {
    timeoutableFetch(`${constants.API}/${dataType}`)
    .then(response => {
        statusHandler(response.status, 'downloaded');
        return response.json();
    })
    .then(data => {
        if (dataType === 'users') {
            displayUsers(data);
        } else if (dataType === 'posts') {
            loadPosts(data, id);
        }
    })
};
*/