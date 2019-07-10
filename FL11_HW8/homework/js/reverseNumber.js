const reverseNumber = num => parseInt(
    num.toString().split('').reverse().join('')
) * Math.sign(num);

console.log(reverseNumber(123));
console.log(reverseNumber(-456));
console.log(reverseNumber(10000));