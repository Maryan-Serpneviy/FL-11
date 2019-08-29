// 1. get userlist GET /users
const btnFetchData = document.querySelector('#btn-fetch-data');
const URL = 'https://jsonplaceholder.typicode.com';

const getUsers = () => {
    const users = [];
    fetch(`${URL}/users`)
    .then(response => response.json())
    .then(data => {
        for (let user in data) {
            users.push(data[user]);
        }
    });
    return users;
};
/*
btnFetchData.addEventListener('click', () => {
    displayUsers(getUsers());
});
*/

// 2. Display them as list with possibility to edit.
const usersList = document.querySelector('#users-list');
const userTemplate = document.querySelector('#display-user-template')
    .content
    .querySelector('.user');

const renderUser = user => {
    const userElement = userTemplate.cloneNode(true);

    const userId = userElement.querySelector('.user__id');
    const userName = userElement.querySelector('.user__username');
    const editUser = userElement.querySelector('#edit-icon');
    const editForm = userElement.querySelector('.user__edit');
    const saveUser = userElement.querySelector('#save-icon');
    userId.textContent = `${user.id}.`;
    userName.textContent = user.username;
    editForm.value = userName.textContent;

    editUser.addEventListener('click', () => {
        showEditForm({userName, editUser, editForm, saveUser});
        document.addEventListener('keydown', evt => {
            if (evt.key === 'Escape') {
                hideEditForm({userName, editUser, editForm, saveUser});
            }
        });
    });

    saveUser.addEventListener('click', function() {
        // showSpinner()
        fetch(`${URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        .then(update => {
            userName.textContent = editForm.value;
            updateHandler(update.status);
            hideEditForm({userName, editUser, editForm, saveUser});
        });
    });
    return userElement;
};

const displayUsers = users => {
    setTimeout(() => {
        users.forEach(elem => usersList.appendChild(renderUser(elem)));
    }, 100);
};

displayUsers(getUsers());

const showEditForm = user => {
    user.userName.classList.add('hidden');
    user.editForm.classList.remove('hidden');
    user.editUser.style.display = 'none';
    user.saveUser.style.display = 'block';
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
};

const updateHandler = status => {
    const errorBlock = document.querySelector('.download-error');
    const errorMessage = document.querySelector('.download-error__message');
    const errorClose = document.querySelector('.download-error__close')
    let error;
    let bgColor;
    status === 200 ? bgColor = '#28a745' : bgColor = '#dc3545';

    switch (status) {
        case 200:
            error = `Record updated successfully`;
            break;
        case 400:
            error = `Error! 400: Bad Request`;
            break;
        case 401:
            error = `Error! 401: User not authorized`;
            break;
        case 404:
            error = `Error! 404: Not found`;
            break;
        case 500:
            error = `Error! 500: Internal server error`;
            break;
        default:
            error = `Response status: ${status}`;
    }
    errorBlock.style = `visibility: visible; background-color:${bgColor};`;
    errorMessage.textContent = error;
    errorClose.addEventListener('click', () => {
        errorBlock.style = 'transform: scale(0); transition: all 0.4s ease';
    });
    setTimeout(() => {
        errorBlock.style = 'transform: scale(0); transition: all 0.4s ease';
    }, 3000);       
};

// 3. When editing is finished update user on the server(call PUT method) 
const onUserEdit = () => {
    
};