// pokemon prototype
function Pokemon(name, type, specie, fly = false) {
    this.name = name;
    this.type = type;
    this.specie = specie;
    this.fly = fly;

    this.getType = function() { /*_*/ }
    this.getSpecie = function() {
        return this.specie;
    }
    this.canFly = function() {
        return this.fly;
    }
    this.getPokemonType = function() {
        return this.type;
    }
    this.evolve = function() { /*_*/ }
}

function Charmander(name) {
    Pokemon.call(this, name); // call parent prototype
    this.type = 'Fire';
    this.specie = 'Lizard Pokemon';
}

function Charmeleon(name) {
    Pokemon.call(this, name);
    this.type = 'Fire';
    this.specie = 'Flame Pokemon';
}

function Charizard(name) {
    Pokemon.call(this, name);
    this.type = 'Fire';
    this.specie = 'Flame Pokemon';
    this.fly = true;
}

function Pichu(name) {
    Pokemon.call(this, name);
    this.specie = 'Mouse Pokemon';
}

function Pikachu(name) {
    Pokemon.call(this, name);
    this.specie = 'Mouse Pokemon';
}

function Raichu(name) {
    Pokemon.call(this, name);
    this.specie = 'Mouse Pokemon';
}

const charmander = new Charmander('Sam');
console.log(charmander.getSpecie());