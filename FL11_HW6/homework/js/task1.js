let a1 = parseFloat(prompt('ax:'));
let a2 = parseFloat(prompt('ay:'));
let b1 = parseFloat(prompt('bx:'));
let b2 = parseFloat(prompt('by:'));
let c1 = parseFloat(prompt('cx:'));
let c2 = parseFloat(prompt('cy:'));
let cx = (a1 + b1) / 2;
let cy = (a2 + b2) / 2;

if (isNaN(a1) || isNaN(a2) || isNaN(b1) || isNaN(b2) || isNaN(c1) || isNaN(c2)) {
    console.log('Error! Not all values are valid');
} else {
    c1 === cx && c2 === cy ? console.log(true) : console.log(false);  
}