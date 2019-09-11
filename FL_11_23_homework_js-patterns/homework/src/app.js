class Order {
    constructor(name, orderTotalPrice) {
        this.name = name;
        this.orderTotalPrice = orderTotalPrice;
    }

    makeOrder() {
        let sum;
        if (this.nightDiscount || this.weekendDiscount)  {
            sum = this.orderTotalPrice - (this.orderTotalPrice * 0.05) - this.bonus;
        } else {
            sum = this.orderTotalPrice - this.bonus;
        }
        return `Price after discount and including bonuses is ${sum}`;
    }
}

const getDiscount = order => {
    const weekend = [0, 6]; // Sun: 0, Sat: 6
    const date = new Date();

    if (date.getHours() >= 23 || date.getHours() < 6) { // 23:00 - 6:00, hopefully
        order.nightDiscount = true;
    }
    if (weekend.indexOf(date.getDay()) !== -1) {
        order.weekendDiscount = true;
    }
};

const setBonus = order => {
    const total = order.orderTotalPrice;
    const bonus = total / 20;
    order.bonus = bonus;
};

const Maryan = new Order('Maryan', 500);
console.log(Maryan)

getDiscount(Maryan);
console.log(Maryan);

setBonus(Maryan);
console.log(Maryan);

console.log(Maryan.makeOrder());