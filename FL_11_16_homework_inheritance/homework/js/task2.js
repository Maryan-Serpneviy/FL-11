// Object.create() polyfill

Object.create = (function() {
    function Temp() { /*_*/ }
    return function (o) {
        Temp.prototype = o;
        const obj = new Temp();
        if (arguments.length > 1) {
            let Properties = Object(arguments[1]);
            for (let prop in Properties) {
                if (Object.prototype.hasOwnProperty.call(Properties, prop)) {
                    obj[prop] = Properties[prop];
                }
            }
        }
        return obj;
    };
})();

const chosenOne = {
    name: 'Neo'
};

const neo = Object.create(chosenOne, {
    action: {
        value: 'knock knock'
    }
});

console.log(neo);