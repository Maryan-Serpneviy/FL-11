// 1. get userlist GET /users
const btnFetchData = document.querySelector('#btn-fetch-data');
const URL = 'https://jsonplaceholder.typicode.com';

/*
fetch(URL)
  .then(response => response.json())
  .then(json => console.log(json.url))
  .catch(error => console.error(error));
*/

const fetchData = data => {
    const users = [];
    fetch(`${URL}/${data}`)
    .then(response => {
        statusHandler(response.status, 'downloaded');
        return response.json();
    })
    .then(data => {
        for (let user in data) {
            users.push(data[user]);
        }
    })
    return users;
};
/*
btnFetchData.addEventListener('click', () => {
    displayUsers(fetchData('users'));
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
        updateHandler(user, nodes, 'PUT', 'updated');
    });

    // 4. Add possibility to delete user DELETE /user/${id}
    nodes.deleteUser.addEventListener('click', function() {
        updateHandler(user, nodes, 'DELETE', 'removed');
        this.parentNode.remove();
    });

    nodes.userName.addEventListener('click', () => {
        alert('username');
    });
    return userElement;
};

const displayUsers = users => {
    setTimeout(() => {
        users.forEach(elem => usersList.appendChild(renderUser(elem)));
    }, 100);
};

displayUsers(fetchData('users'));

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

const statusHandler = (status, action) => {
    const errorBlock = document.querySelector('.download-error');
    const errorMessage = document.querySelector('.download-error__message');
    const errorClose = document.querySelector('.download-error__close');
    let errorCloseTimeout = 10000;
    let message;
    let bgColor;
    status === 200 ? bgColor = '#28a745' : bgColor = '#dc3545';

    switch (status) {
        case 200:
            message = `Data ${action} successfully`;
            errorCloseTimeout = 2500;
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
        errorBlock.style = 'transform: scale(0); transition: all 0.4s ease';
    });
    setTimeout(() => {
        errorBlock.style = 'transform: scale(0); transition: all 0.4s ease';
    }, errorCloseTimeout);       
};

// 5. Show spinner on every request call
const showLoader = () => {
    document.querySelector('.loader').classList.remove('hidden');
};

const hideLoader = () => {
    document.querySelector('.loader').classList.add('hidden');
};