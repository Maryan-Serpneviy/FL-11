// Object.assign() polyfill

Object.maryankoAssign = function(target, ...objects) {
    for (let i = 0; i < objects.length; i++) {
        for (let prop in objects[i]) {
            if (Object.prototype.hasOwnProperty.call(objects[i], prop)) {
            target[prop] = objects[i][prop];
            }
        }
    }
    return target;
};


const target = { prop: 'target obj' }
const a = { a: 1 };
const b = { b: 2 };
const c = { c: 3 };
const copy = Object.maryankoAssign(target, a, b, c);
console.log(copy);
a.a = 100;
console.log(copy);
console.log(target);





