'use strict';

let MAX_ACTIONS = 10;
const REQUIRED_LENGTH = 1;
const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const btnAddBox = document.querySelector('#add-box-icon');
const actionInput = document.querySelector('#add-action');
const overflow = document.querySelector('.items-overflow');

window.onload = () => {
    actionInput.focus();
}

// validate input
const btnEnabled = () => {
    btnAddBox.classList.remove('btn-disabled');
    btnAddBox.classList.add('btn-enabled');
};

const btnDisabled = () => {
    btnAddBox.classList.remove('btn-enabled');
    btnAddBox.classList.add('btn-disabled');
};

const validInput = () => {
    const CURRENT_LENGTH = actionInput.value.length;
    CURRENT_LENGTH >= REQUIRED_LENGTH ? btnEnabled() : btnDisabled();
};

actionInput.addEventListener('keyup', validInput);

// generate action from template
const taskTemplate = () =>
`<div class="todo__action">
  <input id="todo__check" type="checkbox">
  <label id="todo__check_label" for="todo__check">${actionInput.value}</label>
  <i id="edit-icon" class="material-icons icon">edit</i>
</div>
<form class="edit-form hidden">
    <input id="todo__edit" type="text">
    <i id="save-icon" class="material-icons icon">save</i>
</form>
<i id="delete-icon" class="material-icons icon">delete</i>`;

const renderAction = (clear, disable) => {
    const actionContainer = document.querySelector('#todo__list');
    if (MAX_ACTIONS > 0) {
        const actionItem = document.createElement('div');
        actionItem.classList.add('todo-item');
        actionItem.innerHTML = taskTemplate();
        actionContainer.appendChild(actionItem);
        addEvents(actionItem);
    } else {
        overflow.classList.remove('hidden');
        actionInput.disabled = true;
        MAX_ACTIONS = 1;
    }
    MAX_ACTIONS--;
    clear(actionInput);
    disable(actionInput);
};

const inputClear = input => {
    input.value = '';
    input.focus();
    btnDisabled();
};

const inputDisable = input => {
    if (MAX_ACTIONS === 0) {
        input.disabled = true;
        overflow.classList.remove('hidden');
    }    
};

// add action events
const addAction = () => {
    if (actionInput.value.length >= REQUIRED_LENGTH) {
        renderAction(inputClear, inputDisable);
    }
};

actionInput.addEventListener('keydown', evt => {
    if (evt.keyCode === ENTER_KEYCODE) {
        addAction();
    }
});

btnAddBox.addEventListener('click', addAction);

const addEvents = action => {
    const check = action.querySelector('#todo__check');
    check.addEventListener('click', checkAction);
    const btnDel = action.querySelector('#delete-icon');
    btnDel.addEventListener('click', removeAction);
    const btnEdit = action.querySelector('#edit-icon');
    btnEdit.addEventListener('click', editAction);
};

const checkAction = function() {
    this.disabled = true;
    this.parentNode.children[2].removeEventListener('click', editAction);
};

const removeAction = function() {
    this.parentNode.remove();
    MAX_ACTIONS++;
    overflow.classList.add('hidden');
    if (MAX_ACTIONS > 0) {
        actionInput.disabled = false;
    } 
};

// EDIT
const editAction = function() {
    const actionNodes = {
        action: this.parentNode,
        actionText: this.parentNode.children[1],
        editForm: this.parentNode.parentNode.children[1],
        editInput: this.parentNode.parentNode.children[1].children[0],
        btnSave: this.parentNode.parentNode.children[1].children[1],
        btnDel: this.parentNode.parentNode.children[2]   
    };
    actionNodes.action.classList.add('hidden');
    actionNodes.btnDel.classList.add('hidden');
    actionNodes.editForm.classList.remove('hidden');

    editInputValue(actionNodes);
    saveInputValue(actionNodes);

    return actionNodes;
};

const editInputValue = function(nodes) {
    nodes.editInput.focus();
    nodes.editInput.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ESC_KEYCODE) {
            nodes.editForm.classList.add('hidden');
            nodes.action.classList.remove('hidden');
            nodes.btnDel.classList.remove('hidden');
        } else if (event.keyCode === ENTER_KEYCODE) {
            evt.preventDefault();
            nodes.actionText.textContent = nodes.editInput.value;
            nodes.editForm.classList.add('hidden');
            nodes.action.classList.remove('hidden');
            nodes.btnDel.classList.remove('hidden');
        }
    });  
};

const saveInputValue = function(nodes) {
    nodes.btnSave.addEventListener('click', () => {
        nodes.actionText.textContent = nodes.editInput.value;
        nodes.editForm.classList.add('hidden');
        nodes.action.classList.remove('hidden');
        nodes.btnDel.classList.remove('hidden');
    });
};