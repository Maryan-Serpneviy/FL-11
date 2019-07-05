let a = parseFloat(prompt('a length:'));
let b = parseFloat(prompt('b length:'));
let c = parseFloat(prompt('c length:'));

if (isNaN(a) || isNaN(b) || isNaN(c)) { // check for numbers
    console.log('Error! Not all values are valid');
} else if (a > 0 && b > 0 && c > 0) { // each side length must be more than 0
    if (a + b > c && a + c > b && b + c > a) { // check if triangle exists
        if (a === b && a === c && b === c) {
            console.log('Equivalent triangle');
        } else if (a === b || a === c || b === c) {
            console.log('Isosceles triangle');
        } else if (a !== b && a !== c && b !== c) {
            console.log('Normal triangle');
        }
    } else {
        console.log('Triangle doesn\'t exist');
    }
}
