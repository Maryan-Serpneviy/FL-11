import constants from './constants.js';
import { timeoutableFetch } from './ajax.js';
import { hideEditForm } from './main.js';
import { showLoader, hideLoader } from './utils.js';

const statusHandler = (status, action) => {
    const errorBlock = document.querySelector('.download-error');
    const errorMessage = document.querySelector('.download-error__message');
    const errorClose = document.querySelector('.download-error__close');
    const SUCCESS = '#28a745';
    const DANGER = '#dc3545';
    const RELOAD_TIMEOUT = 5000;
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
        case 'timeout':
            message = `Server connection timeout. Page will be reloaded`;
            setTimeout(() => {
                location.reload();
            }, RELOAD_TIMEOUT);
            break;
        default:
            message = `Response status: ${status}`;
    }
    errorBlock.style = `visibility: visible; background-color:${bgColor};`;
    errorMessage.textContent = message;
    errorClose.addEventListener('click', () => {
        errorBlock.style = constants.VANISH;
    });
    setTimeout(() => {
        errorBlock.style = constants.VANISH;
    }, errorCloseTimeout);       
};

async function updateHandler(elem, elemNodes, method, action) {
    showLoader();
    const response = await timeoutableFetch(`${constants.API}/users/${elem.id}`, {
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

export { statusHandler, updateHandler }

/*
const updateHandler = (elem, elemNodes, method, action) => {
    showLoader();
    timeoutableFetch(`${constants.API}/users/${elem.id}`, {
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
