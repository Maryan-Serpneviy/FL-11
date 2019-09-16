import constants from './constants.js';
import { fetchData } from './ajax.js';
import { updateHandler } from './handlers.js';

const btnFetchData = document.querySelector('#btn-fetch-data');

const displayUsers = users => {
    const usersList = document.querySelector('#users-list');
    usersList.innerHTML = '';
    users.forEach(elem => usersList.appendChild(renderUser(elem)));
    btnFetchData.removeEventListener('click', fetchData);
    btnFetchData.disabled = true;
    btnFetchData.style.backgroundColor = 'rgb(253, 231, 231)';
};

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
            if (evt.key === 'Enter') {
                alert('Enter');
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
                this.parentNode.style = constants.VANISH;
                setTimeout(() => {
                    this.parentNode.remove();                      
                }, 400);
            }, 1000);
        }
    });

    nodes.userName.addEventListener('click', function() {
        const userId = parseInt(this.parentNode.children[1].textContent);
        fetchData('posts', userId);
    });
    return userElement;
};

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

export { displayUsers, hideEditForm };