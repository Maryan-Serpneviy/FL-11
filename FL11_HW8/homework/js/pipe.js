function pipe(num, ...funcs) {
    if (funcs.length > 0) {
        for (let i = 0; i < funcs.length; i++) {
            num = funcs[i](num);
        }
    }
    return num;
}

const addOne = x => x + 1;

pipe(1, addOne);
pipe(2, addOne, addOne);
pipe(3, addOne, addOne, addOne);