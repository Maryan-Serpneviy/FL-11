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

    if (!order.discount) {
        order.bonus ?
        order.discount = (order.orderTotalPrice + order.bonus) * 0.1 :
        order.discount = order.orderTotalPrice * 0.1;
        
        if (date.getHours() >= 23 || date.getHours() < 6 || weekend.indexOf(date.getDay()) !== -1) {
            order.orderTotalPrice -= order.discount;
        }
    }
};

const setBonus = order => {
    if (!order.bonus) {
        order.discount ?
        order.bonus = (order.orderTotalPrice + order.discount) / 20 :
        order.bonus = order.orderTotalPrice / 20;
        
        order.orderTotalPrice -= order.bonus;
    }
};

const Maryan = new Order('Maryan', 500);
console.log(Maryan);

setBonus(Maryan);
console.log(Maryan);
console.log(Maryan.makeOrder());

getDiscount(Maryan);
console.log(Maryan);
console.log(Maryan.makeOrder());
