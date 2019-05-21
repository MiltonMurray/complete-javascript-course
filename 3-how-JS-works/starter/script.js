///////////////////////////////////////
// Lecture: Hoisting

// calcAge(1993);


// function calcAge(year){
//     console.log(2019 - year);
//     console.log(this);
// }


// let retirement = (year) =>{
//     console.log(65 - (2019 - year));
// }
// retirement(1993)










///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









