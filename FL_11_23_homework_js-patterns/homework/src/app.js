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
    const WEEKEND = [0, 6]; // Sun: 0, Sat: 6
    const DISCOUNT_VAL = 0.1;
    const NIGHT_HOUR = 23;
    const MORNING_HOUR = 6;

    if (!order.discount) {
        order.bonus ?
        order.discount = (order.orderTotalPrice + order.bonus) * DISCOUNT_VAL :
        order.discount = order.orderTotalPrice * DISCOUNT_VAL;
        
        if (date.getHours() >= NIGHT_HOUR || date.getHours() < MORNING_HOUR || WEEKEND.indexOf(date.getDay()) !== -1) {
            order.orderTotalPrice -= order.discount;
        }
    }
};

const setBonus = order => {
    const BONUS_VAL = 0.05;

    if (!order.bonus) {
        order.discount ?
        order.bonus = (order.orderTotalPrice + order.discount) * BONUS_VAL :
        order.bonus = order.orderTotalPrice * BONUS_VAL;
        
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
