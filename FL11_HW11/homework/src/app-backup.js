'use strict';

const btnAddBox = document.querySelector('#add-box-icon');
const actionInput = document.querySelector('#add-action');
const REQUIRED_LENGTH = 0;

// enable / disable plus button
const btnEnabled = function() {
    btnAddBox.classList.remove('btn-disabled');
    btnAddBox.classList.add('btn-enabled');
};

const btnDisabled = function() {
    btnAddBox.classList.remove('btn-enabled');
    btnAddBox.classList.add('btn-disabled');
};

actionInput.addEventListener('keyup', function(evt) {
    if (actionInput.value.length > REQUIRED_LENGTH) {
        btnEnabled();
        //inputValue.push(evt.key);
    } else {
        btnDisabled();
    }
});

// clone action from template
function getInputValue() {
    const actionInputValue = actionInput.value;
    console.log(actionInputValue);
    return actionInputValue;
}

const createAction = function() {
    const todoTemplate = document.querySelector('#todo-template')
        .content
        .querySelector('.todo');
    //const actionElem = todoFragment.appendChild(todoTemplate.cloneNode(true));
    const actionElem = todoTemplate.cloneNode(true);
    console.log(actionElem);
    //todoContainer.appendChild(todoFragment);
    

    const actionInputValue = actionInput.value;
    //console.log(actionInputValue);
    
    const todoValue = document.querySelector('#todo__check_label');
    //todoValue.textContent = getInputValue()//actionInput.value;

    actionInput.value = '';
    actionInput.focus();
    btnDisabled();

    return actionElem;
};

const renderAction = function() {
    const todoContainer = document.querySelector('#todo__list');
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createAction());
    todoContainer.appendChild(fragment);
};

btnAddBox.addEventListener('click', function() {
    if (actionInput.value.length > REQUIRED_LENGTH) {
        renderAction();
    }
});


let sample = '  count white space  ';
let countWhiteSpace = /\s/g;
//let noWSinbeginning = ^[^-\s][\w\s-]+$;
let result = sample.match(countWhiteSpace);
//console.log(result);
//console.log(sample.trim());


// add todo acton √
const inputRefresh = function() {

}

/*
// remove todo action
const btnRemoveAction = document.querySelector('#delete-icon');

btnRemoveAction.addEventListener('click', function() {
    removeAction();
});

const removeAction = function() {
    
}
*/