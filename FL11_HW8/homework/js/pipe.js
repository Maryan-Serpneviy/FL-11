function pipe(num) {
    for (let i = 1; i < arguments.length; i++) {
        num = arguments[i](num);
    }
    return num;
}

const addOne = x => x + 1;

pipe(1, addOne);
pipe(2, addOne, addOne);
pipe(3, addOne, addOne, addOne);
