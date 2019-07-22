'use strict';

const REQUIRED_LENGTH = 1;
let MAX_TASKS = 10;
const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const btnAddBox = document.querySelector('#add-box-icon');
const actionInput = document.querySelector('#add-action');

// enable / disable plus button
const btnEnabled = function() {
    btnAddBox.classList.remove('btn-disabled');
    btnAddBox.classList.add('btn-enabled');
};

const btnDisabled = function() {
    btnAddBox.classList.remove('btn-enabled');
    btnAddBox.classList.add('btn-disabled');
};

actionInput.addEventListener('keyup', function() {
    const CURRENT_LENGTH = actionInput.value.length;
    CURRENT_LENGTH >= REQUIRED_LENGTH ? btnEnabled() : btnDisabled();
});

// generate action from template
const getInputValue = () => actionInput.value;

const createAction = function() {
    const todoTemplate = document.querySelector('#todo-template')
        .content
        .querySelector('.todo-item');
    const todoFragment = document.createDocumentFragment();
    const actionElem = todoFragment.appendChild(todoTemplate.cloneNode(true));
    return actionElem;
};

const renderedNodes = [];
let nodeCount = 1;
const renderAction = function(elem, clear) {
    let renderedNode = '';
    const todoContainer = document.querySelector('#todo__list');
    elem = createAction(inputClear);

    const getInputValue = () => actionInput.value;
    
    if (MAX_TASKS > 0) {
        todoContainer.appendChild(elem);
        let todoText = document.querySelector('#todo__check_label');
        todoText.classList.remove(`label${nodeCount - 1}`);
        todoText.classList.add(`label${nodeCount}`);
        renderedNode = todoText;
        renderedNodes.push(renderedNode);
        
        addTodoText();
        checkboxDisable();
        
    } else {
        alert('maximum tasks reached');
        MAX_TASKS = 1;
    }
    
    MAX_TASKS--;
    nodeCount++;
    // parsing input value to action text
    clear(actionInput);
};

function addTodoText(elem) {
    //elem.textContent = getInputValue();
    console.log(renderedNodes);
}



const inputClear = function(input) {
    input.value = '';
    input.focus();
    btnDisabled();
};
/*
const setActionText = function() {
    const actionInputValue = actionInput.value;
    

    const todoText = document.querySelector('#todo__check_label');
    todoText.textContent = getInputValue()//actionInput.value;
};
*/
// add action events
const addAction = () => {
    if (actionInput.value.length >= REQUIRED_LENGTH) {
        renderAction(createAction(), inputClear);
    }
};

btnAddBox.addEventListener('click', () => {
    addAction();
});

actionInput.addEventListener('keydown', evt => {
    if (evt.keyCode === ENTER_KEYCODE) {
        addAction();
    }
});

// edit action


// checkbox


const checkboxDisable = function() {
    const checkAction = document.querySelectorAll('#todo__check');
    for (let i = 0; i < checkAction.length; i++) {
        checkAction[i].addEventListener('click', (e) => {
            
            if (checkAction[i].checked) {
                checkAction[i].disabled = true;
            }
        });
    }
};



/*
getCreatedButtons().check.addEventListener('click', function() {
    console.log('checked');
});
*/


//const elementExists = !!document.querySelector('#todo__check');
//console.log(elementExists);
/*
if(checkAction != null) {
    checkAction.addEventListener('DOMNodeInsertedIntoDocument', () => {
      console.log('checkbox checked');
});
}
*/


let sample = '  count white space  ';
let countWhiteSpace = /\s/g;
//let noWSinbeginning = ^[^-\s][\w\s-]+$;
let result = sample.match(countWhiteSpace);
//console.log(result);
//console.log(sample.trim());


// add todo acton √


 
