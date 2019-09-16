import { fetchData } from './ajax.js';

const rootNode = document.querySelector('#root');
const main = document.querySelector('#main');
const getUsers = document.querySelector('#btn-fetch-data');
const btnReload = document.querySelector('#btn-reload');
const usersList = document.querySelector('#users-list');
const posts = document.querySelector('#posts');
const btnGoBack = rootNode.querySelector('#btn-go-back');

window.addEventListener('hashchange', () => {
    if (location.hash === '#/posts') {
        localStorage.setItem('users', usersList.innerHTML); // paste users in ls
        usersList.innerHTML = ''; // clear users
        getUsers.classList.add('hidden');
        btnReload.classList.add('hidden');

        const goBack = document.querySelector('#btn-go-back');
        goBack.addEventListener('click', () => {
            posts.innerHTML = '';
            location.hash = '#/main';
        });
    } else if (location.hash === '#/main') {
        btnGoBack.classList.add('hidden');
        getUsers.classList.remove('hidden');
        btnReload.classList.remove('hidden');
        
        usersList.innerHTML = localStorage.getItem('users');
        localStorage.clear();

        main.innerHTML = usersList.innerHTML;
        posts.innerHTML = ''; // clear posts

        const userNames = main.querySelectorAll('.user__username');
        userNames.forEach((elem) => {
            elem.addEventListener('click', function() {
                const userId = parseInt(this.parentNode.children[1].textContent);
                fetchData('posts', userId);
                main.innerHTML = '';
                location.hash = '#/posts';
            });
        })

        
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
    btnGoBack.classList.remove('hidden');
    btnGoBack.addEventListener('click', () => {
        location.hash = '#/main';
    });
};

export { loadPosts };
