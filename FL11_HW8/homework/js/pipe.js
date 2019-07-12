function pipe(num, ...funcs) {
    for (let i = 0; i < funcs.length; i++) {
        num = funcs[i](num);
    }
    return num;
}

const addOne = x => x + 1;

console.log(pipe(1, addOne));
console.log(pipe(2, addOne, addOne));
console.log(pipe(3, addOne, addOne, addOne));