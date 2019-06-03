const box6 = {
    color:'green',
    position: 1 ,
    clickMe: function(){
        document.querySelector('.green').addEventListener('click',()=>{
            let str = `this is a box number ${this.position} and it is ${this.color}`;
            alert(str);
        });
    }
}
//box6.clickMe();

/*const box66 = {
    color:'green',
    position: 1 ,
    clickMe: function(){
        document.querySelector('.green').addEventListener('click',()=>{
            let str = `this is a box number ${this.position} and it is ${this.color}`;
            alert(str);
        });
    }
}
box66.clickMe();
*/

// function Person(name){
//     this.name = name;
// }
// //ES5
// Person.prototype.myFriends5 = function(friends){
//     var arr = friends.map(function(el){
//         return this.name + ' is friends with '+el;
//     }.bind(this));
//     console.log(arr);
// }
// var friends = ['Bob', 'Jane','Mark'];
// new Person('John').myFriends5(friends);

// //ES6
// Person.prototype.myFriends6 = function(friends){
//     let arr = friends.map(el => `${this.name} is friends with ${el}`);
//     console.log(arr);
// }

// var friends = ['Bob', 'Jane','Mark'];
// new Person('Mike').myFriends6(friends);

// let john = ['John', 26, 'Basketball'];
// const [name, age, hobby] = ['John', 26, 'Basketball'];
// console.log(name);
// console.log(age);
// console.log(hobby);

// const obj = {
//     firstName:'Mike',
//     lastName:'Jones'
// };

// const {firstName, lastName} = obj;
// console.log(firstName);
// console.log(lastName);
// const boxes = document.querySelectorAll('.box');

// Array.from(boxes).map(x => x.style.backgroundColor = 'dodgerblue');

// let question = new Map();
// question.set('question','How many licks does it take to get to the center of a tootsie pop?');
// question.set(1, 'One');
// question.set(2, 'Two');
// question.set(3, 'Three');
// question.set(4, 'We will never know');
// question.set('answer',4);
// question.set(true,'WoW! your good!');
// question.set(false,'Nope!');

// console.log(question.get('question'));
// //console.log(question.size);

// // question.forEach((k,v)=> console.log(`this is ${k}, and it's set to ${v}`));

// for(let [key,value] of question.entries()){
//     if(typeof(key) === 'number'){
//         console.log(`${key}) ${value}`);
//     }   
// }

// const ans = parseInt(prompt('Write the correct answer'));

// console.log(question.get(ans ===question.get('answer')));

// class Person6{
//     constructor(name, yearOfBirth, job){
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }

//     calculateAge(){
//         let age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }
// }

// class Athlete6 extends Person6{
//     constructor(name, yearOfBirth, job, olympicGames, medals){
//         super(name, yearOfBirth, job);
//         this.olympicGames = olympicGames;
//         this.medals = medals;
//     }

//     wonMedal(){
//         this.medals++;
//         console.log(this.medals);
//     }
// }

// const johnAthlete6 = new Athlete6('john',1990, 'Assassin', 3, 10);

// johnAthlete6.wonMedal();
// johnAthlete6.calculateAge();

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
class Town{
    constructor(name, build){
        this.name = name;
        this.build = build;
    };
}

class Parks extends Town{
    constructor(name, build, numTrees, area){
        super(name, build);
        this.numTrees = numTrees;
        this.area = area;
    }
    //1) Tree density of each park in the town (forumla: number of trees/park area)
    treeDensity(){
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density}`);
    }
    //2) Average age of each town's park (forumla: sum of all ages/number of parks)
    avrgAge(){
        const sum = 
    }
    //3) The name of the park that has more than 1000 trees
}
class Streets extends Town{
    constructor(name, build, length, size = 'normal'){
        super(name, build);
        this.length = length;
        this.size = size;
    }
    sizeClassification() {
        const classification = new Map();
        classification.set(1,'tiny');
        classification.set(2,'small');
        classification.set(3,'normal');
        classification.set(4,'big');
        classification.set(5,'huge');
    }
    //4) Total and average length of the town's streets
    //5) Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
}