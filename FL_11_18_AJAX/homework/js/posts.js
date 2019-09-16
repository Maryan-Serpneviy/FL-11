import { renderMain } from './ajax.js';

const rootNode = document.querySelector('#root');
const main = document.querySelector('#main')
const posts = document.querySelector('#posts');

window.addEventListener('hashchange', () => {
    if (location.hash === '#/posts') {
        localStorage.setItem('main', main.innerHTML); // save main in ls
        main.innerHTML = ''; // clear main
    } else if (location.hash === '#/main') {
        posts.innerHTML = ''; // clear posts
        if (localStorage.getItem('main')) {
            main.innerHTML = localStorage.getItem('main');
        }
        localStorage.clear();
        document.querySelector('#users-list').innerHTML = '';
        const btnFetchData = document.querySelector('#btn-fetch-data');
        btnFetchData.addEventListener('click', renderMain);
        location.reload();
    }
});

const loadPosts = (users, id) => {
    const filteredPosts = users.filter(elem => elem.userId === id)
        .map(elem => ({post: elem.title, comment: elem.body}));
    displayPosts(filteredPosts);
    location.hash = '#/posts';
};

const renderPost = obj => {
    const postTemplate = document.querySelector('#post-template')
    .content
    .querySelector('.post-container');
    const postElement = postTemplate.cloneNode(true);
    const userPost = postElement.querySelector('.user__post');
    const userComment = postElement.querySelector('.user__comment');
    userPost.textContent = obj.post;
    userComment.textContent = obj.comment;

    return postElement;
};

const displayPosts = data => {
    data.forEach(elem => posts.appendChild(renderPost(elem)));
    posts.innerHTML = `<button id="btn-go-back">GO BACK</button>` + posts.innerHTML;
    const btnGoBack = rootNode.querySelector('#btn-go-back');
    btnGoBack.addEventListener('click', () => {
        location.hash = '#/main';
    });
};

export { loadPosts };
