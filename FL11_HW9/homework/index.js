// 0. Write function, which returns array of numbers from string parameter.
// getNumbers('string'); // returns [] 
// getNumbers('n1um3ber95'); // returns [1,3,9,5] 

Array.prototype.filterMyArray = function(callback, context) {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
        if (callback.call(context, this[i], i, this)) {
            arr.push(this[i]);
        }
    }
    return arr;
};

function getNumbers(str) {
    /*
    const strNumbers = [];
    for (const i in strSplit) {
        if (!isNaN(strSplit[i])) {
            strNumbers.push(strSplit[i]);
        }
    }
    return strNumbers;
    */
   const strSplit = str.split('');
   const strNumbers = strSplit.filterMyArray(elem => !isNaN(elem));
   //const strNumbers = filterArray(strSplit, elem => !isNaN(elem));
   return strNumbers;
}

getNumbers('string');
getNumbers('n1um3ber95');

// 1. Write a function that could receive different amount of parameters (n1, n2, ...n)
// that have different data types (string, number, boolean, etc.)
// and returns an object where keys are data types of received parameters
// and value are their count. For example:
// findTypes('number') // returns {'string':1} 
// findTypes(null, 5, 'hello') // returns {'object':1, 'number':1, 'string':1}

function findTypes(...data) {
    /*
    let numCount = 0;
    let strCount = 0;
    let boolCount = 0;
    let undefinedCount = 0;
    let objCount = 0;
    let fnCount = 0;
    const obj = {};
    for (let i = 0; i < data.length; i++) {
        switch (typeof data[i]) {
            case 'number':
                numCount++;
                obj[typeof data[i]] = numCount;
            break;
            case 'string':
                strCount++;
                obj[typeof data[i]] = strCount;
            break;
            case 'boolean':
                boolCount++;
                obj[typeof data[i]] = boolCount;
            break;
            case 'undefined':
                undefinedCount++;
                obj[typeof data[i]] = undefinedCount;
            break;
            case 'object':
                objCount++;
                obj[typeof data[i]] = objCount;
            break;
            case 'function':
                fnCount++;
                obj[typeof data[i]] = fnCount;
            break;
            default:
                break;
        }
    }
    return obj;
    */
   const obj = {};
   for (let i = 0; i < data.length; i++) {
       const dataType = typeof data[i];
       dataType in obj? obj[dataType]++ : obj[dataType] = 1;
       /*
       if (typeof data[i] in obj) {
           obj[typeof data[i]]++;
       } else {
           obj[typeof data[i]] = 1;
       }
       */
       /*
       switch(true) {
           case typeof data[i] in obj:
               obj[typeof data[i]]++;
               break;
           default:
               obj[typeof data[i]] = 1;
       }
       */
      
   }
   return obj;
}

console.log(findTypes('number'));
console.log(findTypes(null, true, 'hello'));
console.log(findTypes({}, [], null, 'hello', 'world', function() { /**/ }, undefined, true, false));

// 2. Write function, which iterates over array and executes function on each element.
//executeforEach([1,2,3], function(el) { console.log(el) }); // logs 1 2 3

function executeforEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]);
    }
}

executeforEach([1,2,3], el => console.log(el));

// 3. Write function, which returns transformed array based on function, 
// which passed as a parameter. Reuse function from task 2.
// mapArray([2, 5, 8], function(el) { return el + 3 }); // returns [5, 8, 11]

function mapArray (array, callback) {
    const mappedArray = [];
    executeforEach(array, elem => {
      mappedArray.push(callback(elem));
    });
    return mappedArray;
}

console.log(mapArray([2, 5, 8], el => el + 3));

// 4. Write function, which returns filtered array based on function, 
// which passed as a parameter. Reuse function from task 2.
// filterArray([2, 5, 8], function(el) { return el > 3 }) // returns [5, 8];

function filterArray(array, callback) {
    const filteredArray = [];
    executeforEach(array, elem => {
        if (callback(elem)) {
            filteredArray.push(elem);
        }
    });
    return filteredArray;
}

console.log(filterArray([2, 5, 8], el => el > 3)); // returns [5, 8]

// 5. Write function, which returns formatted date.
// showFormattedDate(new Date('2019-01-27T01:10:00'));
// returns 'Date: Jan 27 2019'
// every month should be showed as 3 letters (e.g. Feb, Apr or Dec);

function showFormattedDate(unformattedDate) {
    const monthFormatter = new Intl.DateTimeFormat('en', {month: 'short'});
    const formatted = {
        month: monthFormatter.format(unformattedDate),
        date: unformattedDate.getDate(),
        year: unformattedDate.getFullYear()
    };
    return `Date: ${formatted.month} ${formatted.date} ${formatted.year}`;
    /*
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = unformattedDate.getMonth();
    const date = unformattedDate.getDate();
    const year = unformattedDate.getFullYear();
    for (let i = 0; i < months.length; i++) {
        if (month === months.indexOf(months[i])) {
            month = months[i];
        }
    }
    */
    //return `Date: ${month} ${date} ${year}`;
}

console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));

// 6. Write function, which returns Boolean value, 
// is received string parameter can be converted to valid date.
// canConvertToDate('2016-13-18T00:00:00'); // false
// canConvertToDate('2016-03-18T00:00:00'); // true

function canConvertToDate(dateString) {
    if (!isNaN(Date.parse(dateString))) {
        return true;
    }
    return false;
}

canConvertToDate('2016-13-18T00:00:00');
canConvertToDate('2016-03-18T00:00:00');

// 7. Write function, which returns difference between two dates in days
// daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'));  // 32

function daysBetween(date1, date2) {
    date1 = Date.parse(date1);
    date2 = Date.parse(date2);
    const DAYS = 24;
    const HOURS = 60;
    const MINUTES = 60;
    const SECONDS = 1000;
    return Math.abs(Math.round((date1 - date2) / (DAYS*HOURS*MINUTES*SECONDS)));
}

daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'));

// 8. Write function, which returns amount of people, who are over 18. 
// Reuse function from task 4,7
// getAmountOfAdultPeople(data) // returns 3;

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

function isOverEighteen(date) {
    const currentYear = new Date().getFullYear();
    const personBirthday = new Date(date).getFullYear();
    const FULL_AGE = 18;
    const isFirstBigger = (date1, date2) => date1 > date2;
    return isFirstBigger(currentYear - personBirthday, FULL_AGE);
}

function getAmountOfAdultPeople(data) {
    const YEAR = 365;
    const FULL_AGE = 18;
    const today = new Date();
    const peopleAge = [];
    for (let i = 0; i < data.length; i++) {
        peopleAge.push(Math.round(daysBetween(today, new Date(data[i]['birthday'])) / YEAR));
    }
    //return filterArray(birthDates, elem => isOverEighteen(elem)).length;
    //return filterArray(peopleAge, elem => elem >= FULL_AGE).length;
    return peopleAge.filterMyArray(elem => elem >= FULL_AGE).length;
}

console.log(getAmountOfAdultPeople(data));

// 9. Write function, which returns array of keys of an object.
// keys({keyOne: 1, keyTwo: 2, keyThree: 3}) // returns [“keyOne”, “keyTwo”, “keyThree”]

function keys(obj) {
    const keys = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            keys.push(key);
        }
    }
    return keys;
    //return Object.keys(obj);
}

keys({keyOne: 1, keyTwo: 2, keyThree: 3});

// 10. Write function, which returns array of values of an object.
// values({keyOne: 1, keyTwo: 2, keyThree: 3}) // returns [1, 2, 3]

function values(obj) {
    const values = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            values.push(obj[key]);
        }
    }
    return values;
}

values({keyOne: 1, keyTwo: 2, keyThree: 3});

//////////////////////////////////////////////////////////////////////////////////////

//const array1 = [2,5,8];

/*
Array.prototype.filterMyArrayShlioshka = function(callback, context) {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
        if (callback.call(context, this[i], i, this)) {
            arr.push(this[i]);
        }
    }
    return arr;
};

console.log(array1.filterMyArrayShliooshka(elem => elem > 3)); // returns [5, 8]

//console.log(Array instanceof Object);

/*
Object.Array.defineProperty(
    Object.Array.prototype,
    'filterMyArrShliooshka', {
        value: function (callback, context) {
            //const rand = Math.floor(Math.random() * this.length);
            //return this[rand];
            const arr = [];
            for (let i = 0; i < this.length; i++) {
            if (callback.call(context, this[i], i, this)) {
                arr.push(this[i]);
                }
            }
            return this[arr];
        }
    }
);
*/

//console.log(array1.filterMyArrShliooshka(elem => elem > 3));

/* work but del
function filterThisArrayShliooshka(array, callback) {
    const filteredArray = [];

    function executeforEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
            callback(array[i]);
        }
    }
    executeforEach(array, elem => {
        if (callback(elem)) {
            filteredArray.push(elem);
        }
    });
    
    return filteredArray;
}

console.log(filterThisArrayShliooshka(array1, function(el) { return el > 3 })); // returns [5, 8]
*/

/* error is not defined
Array.prototype.filterThisArrayShliooshka = function(array, callback) {
    const filteredArray = [];

    function executeforEach(array, callback) {
        for (let i = 0; i < array.length; i++) {
            callback(array[i]);
        }
    }
    executeforEach(array, elem => {
        if (callback(elem)) {
            filteredArray.push(elem);
        }
    });
    
    return filteredArray;
};

filterThisArrayShliooshka(array1, function(el) { return el > 3 });
//console.log(filterThisArrayShliooshka(array1, function(el) { return el > 3 })); // returns [5, 8]
*/

/*
function filter(arr, callback) {
    console.log(arr.filterMyArrayShliooshka(callback));
}

filter(array1, function(el) { return el > 3 });
*/