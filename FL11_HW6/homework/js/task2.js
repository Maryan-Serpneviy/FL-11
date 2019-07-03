let a = +prompt('a length:');
let b = +prompt('b length:');
let c = +prompt('c length:');

if (isNaN(a) || isNaN(b) || isNaN(c)) {
    console.log('Error! Triangle length must be a positive integer number')
} else if (a > 0 && b > 0 && c > 0) {
    if (a + b > c && a + c > b && b + c > a) {
        console.log('Triangle exists'); //5 8 6
    } else {
        console.log('Triangle doesn\'t exist');
    }
}
