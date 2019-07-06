const coordinates = [
    {
        point: 'ax',
        varName: 'a1'
    },
    {
        point: 'ay',
        varName: 'a2'
    },
    {
        point: 'bx',
        varName: 'b1'
    },
    {
        point: 'by',
        varName: 'b2'
    },
    {
        point: 'cx',
        varName: 'c1'
    },
    {
        point: 'cy',
        varName: 'c2'
    }
];

for (let i = 0; i < coordinates.length; ++i) {
    const pointValue = parseFloat(prompt(coordinates[i].point), '');
    if (!isFinite(pointValue) || isNaN(pointValue)) {
        alert('Error! Value is invalid or missing');
        break;
    } else {
        coordinates[i].value = pointValue;
    }
}
let cx = (coordinates[0].value + coordinates[2].value) / 2;
let cy = (coordinates[1].value + coordinates[3].value) / 2;

console.log(coordinates[4].value === cx && coordinates[5].value === cy);