import constants from './constants.js';
import { fetchData } from './ajax.js';
import { updateHandler } from './handlers.js';

const rootNode = document.querySelector('#root');
const main = document.querySelector('#main');
const getUsers = document.querySelector('#btn-fetch-data');
const btnReload = document.querySelector('#btn-reload');
const usersList = document.querySelector('#users-list');
const posts = document.querySelector('#posts');
const btnGoBack = rootNode.querySelector('#btn-go-back');

window.addEventListener('hashchange', () => {
    if (location.hash === '#/posts') {
        localStorage.setItem('users', usersList.innerHTML);
        usersList.innerHTML = '';
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
        posts.innerHTML = '';

        const nodes = {
            userName: main.querySelectorAll('.user__username'),
            editUser: main.querySelectorAll('#edit-icon'),
        };

        nodes.userName.forEach(elem => {
            elem.addEventListener('click', function() {
                const userId = parseInt(this.parentNode.children[1].textContent);
                fetchData('posts', userId);
                main.innerHTML = '';
                location.hash = '#/posts';
            });
        });

        nodes.editUser.forEach(elem => {
            elem.addEventListener('click', function() {
                const userName = this.parentNode.children[2].textContent;
                this.parentNode.children[3].value = userName;

                showEditForm(this.parentNode);
                document.addEventListener('keydown', evt => {
                    if (evt.key === 'Escape') {
                        hideEditForm(this.parentNode);
                    }
                });
            });
            elem.addEventListener('mousedown', function() {
                hideEditForm(this.parentNode);
            });     
        })
    }
});

const showEditForm = user => {
    user.querySelector('.user__username').classList.add('hidden');
    user.querySelector('.user__edit').classList.remove('hidden');
    user.querySelector('.user__edit').focus();
    user.querySelector('#edit-icon').style.display = 'none';
    user.querySelector('#save-icon').style.display = 'block';
    user.querySelector('#delete-icon').style.display = 'block';

    eventsHandler(user);
};

const eventsHandler = (user) => {
    const userId = user.children[1].textContent.replace('.', '');
    const userName = user.querySelector('.user__username');
    const editForm = user.querySelector('.user__edit');

    user.querySelector('.user__edit').addEventListener('keydown', evt => {
        if (evt.key === 'Enter') {
            updateHandler(userId, { userName, editForm }, 'PUT', 'updated');
            hideEditForm(user);
        }
    });

    user.querySelector('#save-icon').addEventListener('click', () => {
        updateHandler(userId, { userName, editForm }, 'PUT', 'updated');
        hideEditForm(user);
    });

    user.querySelector('#delete-icon').addEventListener('click', function() {
        const delRecord = confirm('Are you sure you want to DELETE this record from server?');
        if (delRecord) {
            updateHandler(userId, { userName, editForm }, 'DELETE', 'removed');    
            hideEditForm(user);
            setTimeout(() => {
                this.parentNode.style = constants.VANISH;
                setTimeout(() => {
                    this.parentNode.remove();                      
                }, 400);
            }, 1000);
        }
    });

    const editBtns = user.parentNode.querySelectorAll('.edit-btn');
    editBtns.forEach(elem => {
        elem.addEventListener('mousedown', () => {
            hideEditForm(user);
        });
    });
};

const hideEditForm = user => {
    user.querySelector('.user__username').classList.remove('hidden');
    user.querySelector('.user__edit').classList.add('hidden');
    user.querySelector('#edit-icon').style.display = 'block';
    user.querySelector('#save-icon').style.display = 'none';
    user.querySelector('#delete-icon').style.display = 'none';
};

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