class Order {
    constructor (name, orderTotalPrice) {
        this.name = name;
        this.orderTotalPrice = orderTotalPrice;
    }

    makeOrder() {
        return `Price after discount and including bonuses is ${this.orderTotalPrice}`;
    }
}

const getDiscount = order => {
    const date = new Date();
    const weekend = [0, 5]; // Sun: 0, Sat: 6
    const discount = order.orderTotalPrice * 0.1;

    if (!order.discount) {
        if (date.getHours() >= 23 || date.getHours() < 6 || weekend.indexOf(date.getDay()) !== -1) {
            order.discount = true;
            order.orderTotalPrice -= discount;
        }
    }
};

const setBonus = order => {
    if (!order.bonus) {
        order.bonus = order.orderTotalPrice / 20;
        order.orderTotalPrice -= order.bonus;
    }
};

const Maryan = new Order('Maryan', 500);
console.log(Maryan);

getDiscount(Maryan);
console.log(Maryan);
console.log(Maryan.makeOrder());

setBonus(Maryan);
console.log(Maryan);
console.log(Maryan.makeOrder());