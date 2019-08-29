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

    // 3. When editing is finished update user on the server(call PUT method) 
    nodes.saveUser.addEventListener('click', () => {
        // showSpinner();
        fetch(`${URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        .then(update => {
            nodes.userName.textContent = nodes.editForm.value;
            statusHandler(update.status);
            hideEditForm(nodes);
            console.log(update.text());
            // hideSpinner();
        });
    });

    nodes.deleteUser.addEventListener('click', function() {
        // showSpinner();
        fetch(`${URL}/users/${user.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        .then(update => {
            nodes.userName.textContent = nodes.editForm.value;
            statusHandler(update.status);
            hideEditForm(nodes);
            // hideSpinner();
        });
        this.parentNode.remove();
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

const statusHandler = (status, action) => {
    const errorBlock = document.querySelector('.download-error');
    const errorMessage = document.querySelector('.download-error__message');
    const errorClose = document.querySelector('.download-error__close');
    let errorCloseTimeout = 10000;
    let error;
    let bgColor;
    status === 200 ? bgColor = '#28a745' : bgColor = '#dc3545';

    switch (status) {
        case 200:
            error = `Record updated successfully`;
            errorCloseTimeout = 2500;
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
    }, errorCloseTimeout);       
};

// 4. Add possibility to delete user DELETE /user/${id}
