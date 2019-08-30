'use strict';

const btnFetchData = document.querySelector('#btn-fetch-data');
const URL = 'https://jsonplaceholder.typicode.com';
const VANISH = 'transform: scale(0); transition: all 0.4s ease';
const RENDER_TIMEOUT = 200;

window.addEventListener('DOMContentLoaded', () => {
    location.hash = '#/main';
    localStorage.clear();
    btnFetchData.addEventListener('click', renderMain);
});

// promises
const fetchData = dataType => {
    const fetched = [];
    fetch(`${URL}/${dataType}`)
    .then(response => {
        statusHandler(response.status, 'downloaded');
        return response.json();
    })
    .then(data => {
        for (let elem in data) {
            fetched.push(data[elem]);
        }
    })
    return fetched;
};
// async/await
/*
async function fetchData(dataType) {
    const fetched = [];
    const response = await fetch(`${URL}/${dataType}`);
    statusHandler(response.status, 'downloaded');
    const data = await response.json();
    for (let elem in data) {
        fetched.push(data[elem]);
    }
    return fetched;
};
*/
const usersList = document.querySelector('#users-list');

const renderUser = user => {
    const userTemplate = document.querySelector('#user-template')
    .content
    .querySelector('.user');
    const userElement = userTemplate.cloneNode(true);

    const nodes = {
        userId: userElement.querySelector('.user__id'),
        userName: userElement.querySelector('.user__username'),
        editUser: userElement.querySelector('#edit-icon'),
        editForm: userElement.querySelector('.user__edit'),
        saveUser: userElement.querySelector('#save-icon'),
        deleteUser: userElement.querySelector('#delete-icon')
    };

    nodes.userId.textContent = `${user.id}.`;
    nodes.userName.textContent = user.username;
    nodes.editForm.value = nodes.userName.textContent;

    nodes.editUser.addEventListener('click', () => {
        showEditForm(nodes);
        document.addEventListener('keydown', evt => {
            if (evt.key === 'Escape') {
                hideEditForm(nodes);
            }
        });
    });

    nodes.saveUser.addEventListener('click', () => {
        updateHandler(user, nodes, 'PUT', 'updated');
    });

    nodes.deleteUser.addEventListener('click', function() {
        const delRecord = confirm('Are you sure you want to DELETE this record from server?');
        if (delRecord) {
            hideEditForm(nodes);
            updateHandler(user, nodes, 'DELETE', 'removed');    
            setTimeout(() => {
                this.parentNode.style = VANISH;
                setTimeout(() => {
                    this.parentNode.remove();                      
                }, 400);
            }, 1000);
        }
    });

    nodes.userName.addEventListener('click', function() {
        const userId = parseInt(this.parentNode.children[1].textContent);
        loadPosts(userId);
    });
    return userElement;
};

const displayUsers = users => {
    usersList.innerHTML = '';
    setTimeout(() => {
        users.forEach(elem => usersList.appendChild(renderUser(elem)));
    }, RENDER_TIMEOUT);
    btnFetchData.removeEventListener('click', renderMain);
    btnFetchData.disabled = true;
};

const renderMain = () => displayUsers(fetchData('users'));

//displayUsers(fetchData('users'));

const showEditForm = user => {
    user.userName.classList.add('hidden');
    user.editForm.classList.remove('hidden');
    user.editUser.style.display = 'none';
    user.saveUser.style.display = 'block';
    user.deleteUser.style.display = 'block';
    user.editForm.focus();
    const editBtns = document.querySelectorAll('#edit-icon');
    editBtns.forEach(elem => {
        elem.addEventListener('mousedown', () => {
            hideEditForm(user);
        });
    });
};

const hideEditForm = user => {
    user.userName.classList.remove('hidden');
    user.editUser.style.display = 'block';
    user.editForm.classList.add('hidden');
    user.saveUser.style.display = 'none';
    user.deleteUser.style.display = 'none';
};

// handle remote data
// promises
/*
const updateHandler = (elem, elemNodes, method, action) => {
    showLoader();
    fetch(`${URL}/users/${elem.id}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(elem)
    })
    .then(update => {
        elemNodes.userName.textContent = elemNodes.editForm.value;
        statusHandler(update.status, action);
        hideEditForm(elemNodes);
        console.log(update);
        hideLoader();
    });
};
*/
// async/await
async function updateHandler(elem, elemNodes, method, action) {
    showLoader();
    const response = await fetch(`${URL}/users/${elem.id}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(elem)
    });
    const update = await response;;
    elemNodes.userName.textContent = elemNodes.editForm.value;
    statusHandler(update.status, action);
    hideEditForm(elemNodes);
    console.log(update);
    hideLoader();
}

const statusHandler = (status, action) => {
    const errorBlock = document.querySelector('.download-error');
    const errorMessage = document.querySelector('.download-error__message');
    const errorClose = document.querySelector('.download-error__close');
    const SUCCESS = '#28a745';
    const DANGER = '#dc3545';
    let errorCloseTimeout = 10000;
    let message;
    let bgColor;
    status === 200 ? bgColor = SUCCESS : bgColor = DANGER;

    switch (status) {
        case 200:
            message = `Data ${action} successfully`;
            errorCloseTimeout = 2000;
            break;
        case 400:
            message = `Error! 400: Bad Request`;
            break;
        case 401:
            message = `Error! 401: User not authorized`;
            break;
        case 404:
            message = `Error! 404: Not found`;
            break;
        case 500:
            message = `Error! 500: Internal server error`;
            break;
        default:
            message = `Response status: ${status}`;
    }
    errorBlock.style = `visibility: visible; background-color:${bgColor};`;
    errorMessage.textContent = message;
    errorClose.addEventListener('click', () => {
        errorBlock.style = VANISH;
    });
    setTimeout(() => {
        errorBlock.style = VANISH;
    }, errorCloseTimeout);       
};

const showLoader = () => document.querySelector('.loader').classList.remove('hidden');
const hideLoader = () => document.querySelector('.loader').classList.add('hidden');

// hashchange and render posts
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

const loadPosts = id => {
    const postsData = fetchData('posts');
    setTimeout(() => {
        const filteredPosts = postsData.filter(elem => elem.userId === id)
        .map(elem => ({post: elem.title, comment: elem.body}));
        displayPosts(filteredPosts);
    }, RENDER_TIMEOUT);
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

const hint = document.querySelector('#hint');
const hintHide = document.querySelector('.hint-hide');
hintHide.addEventListener('click', () => {
    hint.style = VANISH;
})