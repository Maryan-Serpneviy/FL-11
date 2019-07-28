'use strict';

const rootNode = document.getElementById('root');

const todoItems = [
    {isDone: false, id: 12345, description: 'Todo 1'}
];

// Your code goes here

//rootNode.appendChild(/* Append your list item node*/);

const mainTemplate = () =>
    `<div id="main-page">
        <h1 class="heading">"Simple" TODO application</h1>
        <button id="add-task" class="btn">Add new task</button>
        <div class="task-container">
            <p class="empty">TODO is empty</p>
        </div>
        <div></div>
    </div>`;

const addTemplate = () =>
    `<div id="add-page">
        <h1 class="heading">Add task</h1>
        <input type="text" id="add-task__input" autocomplete="off">
        <br>
        <button id="add-task__btn-cancel" class="btn">Cancel</button>
        <button id="add-task__btn-save" class="btn">Save changes</button>
        <div class="task-container" hidden></div>
    </div>`;

const editTemplate = () =>
    `<div id="edit-page">
        <h1 class="heading">Edit task</h1>
        <input type="text" id="edit-task__input" autocomplete="off">
        <br>
        <button id="edit-task__btn-cancel" class="btn">Cancel</button>
        <button id="edit-task__btn-save" class="btn">Save changes</button>
    </div>`;

window.onload = () => {
    location.hash = '#/main';
    content.mainPage.render();
    const addBtn = rootNode.querySelector('#add-task');
    addBtn.addEventListener('click', () => {
        location.hash = '#/add';
    });
    
    //localStorage.clear();
}

window.addEventListener('hashchange', () => {
    if (location.hash === '#/add') {
        content.addPage.render();
    } else if (location.hash === '#/main') {
        content.mainPage.render();
    } else if (location.hash === '#/edit') {
        content.editPage.render();
    }
});

const content = {
    inputVal: null,
    mainPage: {
        render() {
            rootNode.innerHTML = mainTemplate();
            const addBtn = rootNode.querySelector('#add-task');
            const taskContainer = rootNode.querySelector('.task-container');
            taskContainer.innerHTML = localStorage.getItem('taskList');
            const check = taskContainer.querySelectorAll('.task-check');
            const edit = taskContainer.querySelectorAll('.task-text');
            const del = taskContainer.querySelectorAll('.task-del');
            
            addBtn.addEventListener('click', () => {
                location.hash = '#/add';
            });
            this.addEvents({check, edit, del})
        },
        addEvents(elems) {
            Array.from(elems.check).forEach(elem => {
                elem.addEventListener('click', checkTask);
            });
            Array.from(elems.del).forEach(elem => {
                elem.addEventListener('click', removeTask);
            });
        }
    },
    addPage: {
        REQUIRED_LENGTH: 0,
        render() {
            rootNode.innerHTML = addTemplate();
            const taskInput = rootNode.querySelector('#add-task__input');
            const btnCancel = rootNode.querySelector('#add-task__btn-cancel');
            const btnAdd = rootNode.querySelector('#add-task__btn-save');
            
            taskInput.focus();
            btnAdd.disabled = true;
            taskInput.addEventListener('keyup', () => {
                this.validateInput(taskInput, btnAdd);
            });
            btnCancel.addEventListener('click', () => {
                location.hash = '#/main';
            });
            btnAdd.addEventListener('click', () => {
                this.renderTask();
            });
        },
        validateInput(input, btn) {
            input.value.length > this.REQUIRED_LENGTH ?
            btnEnabled(btn) : btnDisabled(btn);
            this.setInputValue(input.value);
        },
        setInputValue(inputVal) {
            this.inputVal = inputVal;
        },
        renderTask() {
            const taskContainer = rootNode.querySelector('.task-container');
            const taskItem = document.createElement('div');
            taskItem.classList.add('task');
            const taskTemplate = () =>
             `<input type="checkbox" class="task-check">
            <span class="task-text">${this.inputVal}</span>
            <button class="task-del"> X </button>
            <br>`;
            taskItem.innerHTML = taskTemplate();
            taskContainer.innerHTML = localStorage.getItem('taskList');
            taskContainer.appendChild(taskItem);
            storeTaskList(taskContainer);
            location.hash = '#/main';
        }
    },
    editPage: {
        render() {
            rootNode.innerHTML = editTemplate();
        }
    }
};

const btnEnabled = function(btn) {
    btn.disabled = false;
};

const btnDisabled = function(btn) {
    btn.disabled = true;
};

const checkTask = function() {
    this.setAttribute('checked', true);
};

const removeTask = function() {
    this.parentNode.remove();
};

// local storage
const storeTaskList = (container) => {
    const taskList = container.innerHTML;
    localStorage.setItem('taskList', taskList);
};




