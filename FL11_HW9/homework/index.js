// 0. Write function, which returns array of numbers from string parameter.
function getNumbers(str) {
    /* initial solution
    const strNumbers = [];
    for (const i in strSplit) {
        if (!isNaN(strSplit[i])) {
            strNumbers.push(strSplit[i]);
        }
    }
    return strNumbers;
    */
   const strSplit = str.split('');
   const strNumbers = filterArray(strSplit, elem => !isNaN(elem));
   return strNumbers;
}
console.log(getNumbers('string'));
console.log(getNumbers('n1um3ber95'));

// 1. Write a function that could receive different amount of parameters (n1, n2, ...n)
// that have different data types (string, number, boolean, etc.)
// and returns an object where keys are data types of received parameters and value are their count.
function findTypes(...data) {
    const obj = {};
    for (let i = 0; i < data.length; i++) {
        const dataType = typeof data[i];
        dataType in obj? obj[dataType]++ : obj[dataType] = 1;
    }
    return obj;
}
console.log(findTypes('number'));
console.log(findTypes(null, true, 'hello'));
console.log(findTypes({}, [], null, 'hello', 'world', function() { /**/ }, undefined, true, false));

// 2. Write function, which iterates over array and executes function on each element.
function executeforEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]);
    }
}
// executeforEach([1,2,3], el => console.log(el));

// 3. Write function, which returns transformed array based on function, 
// which passed as a parameter. Reuse function from task 2.
function mapArray (array, callback) {
    const mappedArray = [];
    executeforEach(array, elem => {
      mappedArray.push(callback(elem));
    });
    return mappedArray;
}
// console.log(mapArray([2, 5, 8], el => el + 3)); // returns [5, 8, 11]

// 4. Write function, which returns filtered array based on function, 
// which passed as a parameter. Reuse function from task 2.
function filterArray(array, callback) {
    const filteredArray = [];
    executeforEach(array, elem => {
        if (callback(elem)) {
            filteredArray.push(elem);
        }
    });
    return filteredArray;
}
// console.log(filterArray([2, 5, 8], el => el > 3)); // returns [5, 8]

// 5. Write function, which returns formatted date.
// every month should be showed as 3 letters (e.g. Feb, Apr or Dec);
function showFormattedDate(unformattedDate) {
    const monthFormatter = new Intl.DateTimeFormat('en', {month: 'short'});
    const formatted = {
        month: monthFormatter.format(unformattedDate),
        date: unformattedDate.getDate(),
        year: unformattedDate.getFullYear()
    };
    return `Date: ${formatted.month} ${formatted.date} ${formatted.year}`;
}
console.log(showFormattedDate(new Date('2019-01-27T01:10:00'))); // returns 'Date: Jan 27 2019'

// 6. Write function, which returns Boolean value, 
// is received string parameter can be converted to valid date.
function canConvertToDate(dateString) {
    if (!isNaN(Date.parse(dateString))) {
        return true;
    }
    return false;
}
console.log(canConvertToDate('2016-13-18T00:00:00')); // false
console.log(canConvertToDate('2016-03-18T00:00:00')); // true

// 7. Write function, which returns difference between two dates in days
function daysBetween(date1, date2) {
    date1 = Date.parse(date1);
    date2 = Date.parse(date2);
    const DAYS = 24;
    const HOURS = 60;
    const MINUTES = 60;
    const SECONDS = 1000;
    return Math.abs(Math.round((date1 - date2) / (DAYS*HOURS*MINUTES*SECONDS)));
}
console.log(daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'))); // 32

// 8. Write function, which returns amount of people, who are over 18. 
// Reuse function from task 4,7
const data = [
    {
      '_id': '5b5e3168c6bf40f2c1235cd6',
      'index': 0,
      'birthday': '2016-03-18T00:00:00',
      'eyeColor': 'green',
      'name': 'Stein',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e3168e328c0d72e4f27d8',
      'index': 1,
      'birthday': '1991-02-11T00:00:00',
      'eyeColor': 'blue',
      'name': 'Cortez',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5b5e3168cc79132b631c666a',
      'index': 2,
      'birthday': '1984-04-17T00:00:00',
      'eyeColor': 'blue',
      'name': 'Suzette',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e31682093adcc6cd0dde5',
      'index': 3,
      'birthday': '1994-04-17T00:00:00',
      'eyeColor': 'green',
      'name': 'George',
      'favoriteFruit': 'banana'
    }
];

function getAmountOfAdultPeople(data) {
    const YEAR = 365;
    const FULL_AGE = 18;
    const today = new Date();
    const peopleAge = [];
    for (let i = 0; i < data.length; i++) {
        peopleAge.push(Math.round(daysBetween(today, new Date(data[i]['birthday'])) / YEAR));
    }
    return filterArray(peopleAge, elem => elem >= FULL_AGE).length;
}
console.log(getAmountOfAdultPeople(data));

// 9. Write function, which returns array of keys of an object.
function keys(obj) {
    const keys = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
}
console.log(keys({keyOne: 1, keyTwo: 2, keyThree: 3}));

// 10. Write function, which returns array of values of an object.
function values(obj) {
    const values = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            values.push(obj[key]);
        }
    }
    return values;
}
console.log(values({keyOne: 1, keyTwo: 2, keyThree: 3}));