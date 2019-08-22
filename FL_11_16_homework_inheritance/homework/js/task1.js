// Object.assign() polyfill

Object.maryankoAssign = function(mergedObj) {
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] !== 'object') {
            throw TypeError('All arguments must be type of "object"');
        }
        if (arguments.length > 0) {
            for (let prop in arguments[i]) {
                if (Object.prototype.hasOwnProperty.call(arguments[i], prop)) {
                mergedObj[prop] = arguments[i][prop];
                }
            }
        }
    }
    return mergedObj;
};

const target = { prop: 'target obj' };
const a = { a: 1 };
const b = { b: 2 };
const c = { c: 3 };
console.log(target);
Object.maryankoAssign(target, a, b, c);
a.a = 100;
console.log(target);
console.log(Object.maryankoAssign(5, a, b, c));