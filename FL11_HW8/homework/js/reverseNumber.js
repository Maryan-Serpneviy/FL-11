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

reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);