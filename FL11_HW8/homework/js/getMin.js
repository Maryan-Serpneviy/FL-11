function getMin(...args) {
    let min = args[0];
    for (let i = 0; i < args.length; i++) {
        if (args[i] < min) {
            min = args[i];
        }
    }
    return min;
    // return Math.min(args)
}

getMin(5, 0, -1.5, 2, -1);
