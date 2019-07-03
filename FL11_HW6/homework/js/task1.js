let a1 = +prompt('ax:');
let a2 = +prompt('ay:');
let b1 = +prompt('bx:');
let b2 = +prompt('by:');
let c1 = +prompt('cx:');
let c2 = +prompt('cy:');

let cx = (a1 + b1) / 2;
let cy = (a2 + b2) / 2;

if (isNaN(a1) || isNaN(a2) || isNaN(b1) || isNaN(b2) || isNaN(c1) || isNaN(c2)) {
    console.log('Error! Type integers only');
} else if (c1 === cx && c2 === cy) {
    console.log(true);
} else {
    console.log(false);
}