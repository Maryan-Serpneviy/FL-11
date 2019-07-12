function pipe(num) {
    for (let i = 1; i < arguments.length; i++) {
        num = arguments[i](num);
    }
    return num;
}

const addOne = x => x + 1;

console.log(pipe(1, addOne));
console.log(pipe(2, addOne, addOne));
console.log(pipe(3, addOne, addOne, addOne));