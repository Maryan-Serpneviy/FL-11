function reverseNumber(num) {
    let reversedNum = 0;
    while (num !== 0) {
        reversedNum *= 10;
        reversedNum += num % 10;
        num -= num % 10;
        num /= 10;
    }
    return reversedNum;
}
console.log(reverseNumber(123));
console.log(reverseNumber(-456));
console.log(reverseNumber(10000));