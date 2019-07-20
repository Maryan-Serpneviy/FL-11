'use strict';

const MAX_STAT = 100;

function generateRandom() {
    return parseInt(Math.random() * MAX_STAT);
}

class Fighter {
    constructor(fighter) {
        this.name = fighter.name;
        this.damage = fighter.damage;
        this.hp = fighter.hp;
        this.hpTotal = fighter.hp;
        this.agility = fighter.agility;
        this.wins = 0;
        this.losses = 0;
    }
    getName() {
        return this.name;
    }
    getDamage() {
        return this.damage;
    }
    getHealth() {
        return this.hp;
    }
    getAgility() {
        return this.agility;
    }

    attack(defender) {
        if (generateRandom() < MAX_STAT - defender.getAgility()) {
            defender.hp -= this.damage;
            console.log(`${this.getName()} make ${this.getDamage()} damage to ${defender.getName()}`)
        } else {
            console.log(`${defender.getName()} attack missed`);
        }
        
    }

    heal(heal) {
        if (heal + this.getHealth() > this.hpTotal) {
            this.hp = this.hpTotal;
        } else {
            this.hp += heal;
        }
    }

    dealDamage(dmg) {
        if(this.getHealth() - dmg < 0) {
            this.hp = 0;
        } else {
            this.hp -= dmg;
        }
    }

    addWin() {
        this.wins += 1;
    }
    addLoss() {
        this.losses += 1;
    }

    logCombatHistory() {
        console.log(`Name ${this.getName()}, Wins: ${this.wins}, Losses ${this.losses}`);
    }
}
const fighter1 = new Fighter({name: 'DanilaAlkash', damage: 20, hp: 125, agility: 25});
const fighter2 = new Fighter({name: 'ValeraBomzh', damage: 15, hp: 150, agility: 20});

function battle(fighterOne, fighterTwo) {
    fighterOne.attack(fighterTwo);
    fighterTwo.attack(fighterOne);

    if (fighterOne.getHealth() <= 0) {
        fighterOne.addLoss();
        fighterTwo.addWin();
        console.log(`${fighterOne.getName()} is out of vodka and can't fight.`);
    } else if (fighterTwo.getHealth() <= 0) {
        fighterTwo.addLoss();
        fighterOne.addWin();
        console.log(`${fighterTwo.getName()} is out of vodka and can't fight.`);
    } else {
        battle(fighterOne, fighterTwo);
    }
}

battle(fighter1, fighter2);