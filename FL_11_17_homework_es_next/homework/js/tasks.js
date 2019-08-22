// 1. Create a function which finds max element in array
// Use Math.max()
const maxElement = arr => Math.max(...arr);

const array = [1, 2, 3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2];
console.log('1.');
console.log(maxElement(array));

// 2. Create function which copies array
const copyArray = arr => Array.from(arr);

const copiedArray = copyArray(array);
console.log('2.');
console.log(array, copiedArray);
console.log(array === copiedArray);

// 3. Create function to enhance element with unique id. Here is how function should be invoked:
// Use Symbol() as a unique identifier
// As a result, returned object should have extra property - unique identifier. 
// Returned object should be copy of the passed parameter. 
// Original object should not contain this id.

const addUniqueId = obj => {
    const UNIQUE_ID = Symbol('id');
    obj.id = UNIQUE_ID;
    return obj;
};

console.log('3. ?');
console.log(addUniqueId({name: 123}));

// 4. Write a function which regroups object properties
// Destruct old object and construct new
const oldObj = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};

// using Object.create()
/*
const regroupObject = obj => {
    return Object.create(obj, {
        university: {
            value: obj.details.university
        },
        user: {
            value: {
                age: obj.details.age,
                firstName: obj.name,
                id: obj.details.id
            }
        }
    });
};
*/

// using desctructuring
const regroupObject = obj => {
    const {name: firstName, details: {id, age, university}} = obj;
    return {
        university,
        user: {
            age,
            firstName,
            id
        }
    };
};

console.log('4');
console.log(regroupObject(oldObj));

// 5. Create a function which finds unique elements in array
// Use one of the new data types
const arrayFive = [1,1,23,3,4,5,6,5,4,23,2,1,1,1,1,1];

const findUniqueElements = arr => {
    const mySet = new Set();
    arr.forEach(elem => mySet.add(elem));
    return mySet;
};

console.log('5.');
console.log(findUniqueElements(array));

// 6. Create a function which masks phone number, leaves only last 4 digits
// Use padStart
const phoneNumber = '0123456789';

const hideNumber = num => num.slice(6, 10).padStart(10, '*');

console.log('6.');
console.log(hideNumber(phoneNumber));

// 7. Create function which has all parameters always required. If they are not - throw error.
// Use default parameters feature
const required = () => { throw new Error('Missing property'); };

const add = (param1 = required(), param2 = required()) => param1 + param2;

console.log('7.');
console.log(add(1, 3));
//console.log(add(1));

// 8. Create a function which calls some API
// and logs array of ‘name’ fields in alphabetical order. Use promises.
const ME = 'Maryan-Serpneviy';
const Alisa = 'AlisaSkryp';

const fetchGitRepos_Promise = user => {
    const repos = [];
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(result => result.json())
    .then(data => {
        for (let item in data) {
            repos.push(JSON.stringify(data[item].name));
        }
    });
    repos.sort();
    return repos;
};

console.log('8');
console.log(fetchGitRepos_Promise(ME));

// 9. Rewrite previous task using async/await instead of promises.
async function fetchGitRepos_async_await(user) {
    const repos = [];
    const result = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await result.json();
    for (let item in data) {
        repos.push(JSON.stringify(data[item].name));
    }
    repos.sort();
    return repos;
}

console.log('9');
fetchGitRepos_async_await(ME).then(data => console.log(data));