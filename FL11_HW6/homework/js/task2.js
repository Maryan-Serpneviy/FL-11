const triangleSides = [
    {
        side: 'a length:'
    },
    {
        side: 'b length:'
    },
    {
        side: 'c length:'
    }
];
const triangles = {
    equivalent:  {
        value: 'Equivalent triangle'
    },
    isosceles: {
        value: 'Isosceles triangle'
    },
    normal: {
        value: 'Normal triangle'
    },
    none: {
        value: 'Triangle doesn\'t exist'
    } 
};

// checking and writing values from user
for (let i = 0; i < triangleSides.length; ++i) {
    const triangleSide = parseFloat(prompt(triangleSides[i].side), '');
    if (!isFinite(triangleSide) || isNaN(triangleSide)) {
        alert('Error! Value is invalid or missing');
        break;
    } else {
        triangleSides[i].value = triangleSide;
    }
}
const a = triangleSides[0].value;
const b = triangleSides[1].value;
const c = triangleSides[2].value;

if (a > 0 && b > 0 && c > 0) { // each side length must be more than 0
    if (a + b > c && a + c > b && b + c > a) { // check if triangle exists
        if (a === b && a === c && b === c) {
            console.log(triangles.equivalent.value);
        } else if (a === b || a === c || b === c) {
            console.log(triangles.isosceles.value);
        } else if (a !== b && a !== c && b !== c) {
            console.log(triangles.normal.value);
        }
    } else {
        console.log(triangles.none.value);
    }
} else {
    console.log(triangles.none.value); // triangle doesn't exist if some side is negative
}