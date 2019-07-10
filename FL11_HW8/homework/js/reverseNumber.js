function reverseNumber(num) {
    return parseInt(num.toString().split('').reverse().join('')) * Math.sign(num);
}

reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);