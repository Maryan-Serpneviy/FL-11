'use strict';

class Order {
    constructor (name, orderTotalPrice) {
        this.name = name;
        this.orderTotalPrice = orderTotalPrice;
        this.bonus = 0;
    }

    makeOrder() {
        let sum;
        this.nightDiscount || this.weekendDiscount ?
        sum = this.orderTotalPrice - (this.orderTotalPrice * 0.1) - this.bonus :
        sum = this.orderTotalPrice - this.bonus;

        return `Price after discount and including bonuses is ${sum}`;
    }

    static getDiscount(order) {
        const weekend = [0, 6]; // Sun: 0, Sat: 6
        const date = new Date();
    
        if (date.getHours() >= 23 || date.getHours() < 6) { // 23:00 - 6:00, hopefully
            order.nightDiscount = true;
        }
        if (weekend.indexOf(date.getDay()) !== -1) {
            order.weekendDiscount = true;
        }
    }

    static setBonus(order) {
        order.bonus = order.orderTotalPrice / 20;
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

const setBonus = order => order.bonus = order.orderTotalPrice / 20;

const Maryan = new Order('Maryan', 500);
console.log(Maryan)

getDiscount(Maryan);
Order.getDiscount(Maryan);
console.log(Maryan);

console.log(Maryan.makeOrder());

Order.setBonus(Maryan);
setBonus(Maryan);
console.log(Maryan);

console.log(Maryan.makeOrder());