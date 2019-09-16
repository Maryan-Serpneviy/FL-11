// import all modules here

// var a = 1;

// function b() {
//     var b = 2;
//     c(b)
// }

// function c(val) {
//     var c = 3;
//     val = 4;
//     console.log(val);
// }
// b();

function b() {
    var b = 2;
    return b;
}

function c() {
    var c = b();
    console.log(b(c));
}
b();
c();

// var a = 1;

// function b() {
//     window.b = 2;
// }

// function c() {
//     var c = 3;
//     b = 4;
//     console.log(b);
// }
// b();
// c();



