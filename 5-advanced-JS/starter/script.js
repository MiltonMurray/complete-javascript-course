//Function Constructor
// let john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

/*
let Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person.prototype.calculateAge = function(){
    console.log(2019 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

let john = new Person('John', 1993, 'Teacher');
let jane = new Person('Jane', 1990,'Software Engineer');
let mark = new Person('Mark', 1948, 'Retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
*/

//Primitives vs Objects
/*
let years = [1990, 1993, 1970, 2007, 2001];

function arrayCalc(arr, fn){
    let arrRes = [...arr];
    return arrRes.map(x => fn(x));
}

function calculateAge(el){return 2019 - el};
function isFullAge(el){return el >= 18};
function maxHeartRate(el){
    if(el > 17 && el < 82){
        return Math.round(206.9 - (0.67 * el));
    }else{
        return -1;
    }   
}

let ages = arrayCalc(years, calculateAge);
let fullAges = arrayCalc(ages, isFullAge);
let rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(rates);
*/

//Function returning functions
/*
function interviewQuestions(job){
    if(job === 'designer'){
        return (name)=>{
            console.log(name + ', can you please explain what you ask');
        }
    }else if(job ==='teacher'){
        return (name)=>{
            return console.log('what subject do you teach '+ name);
        }
    }else{
        return (name)=>{
            console.log('What do you do');
        }
    }
}

let teacherQuestion = interviewQuestions('teacher');

teacherQuestion('John');
*/

//IIFE
/*
(function(luck){
    let score = Math.random() * 10;
    console.log(score >= 5 - luck) ;
})(5);

(()=>{
    console.log('A Immediately Invoked function');
})();

*/

//Closures
/*
function retirement(retirementAge){
    let a = ' years left till retirement.';
    return (yearOfBirth)=>{
        let age = 2019 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

retirementUS = retirement(66);
retirementGermany = retirement(65);
retirementIceland = retirement(67);

retirementUS(1993);
retirementGermany(1993);
retirementIceland(1993);
*/
//retirement(66)(1990);
/*
function interviewQuestions(job){
    if(job === 'designer'){
        return (name)=>{
            console.log(name + ', can you please explain what you ask');
        }
    }else if(job ==='teacher'){
        return (name)=>{
            return console.log('what subject do you teach '+ name);
        }
    }else{
        return (name)=>{
            console.log('What do you do');
        }
    }
}
*/
/*
function interviewQuestions(job){
    return (name)=>{
        if(job === 'designer'){
            console.log(name + ', can you please explain what you ask');          
        }else if(job ==='teacher'){           
            return console.log('what subject do you teach '+ name);           
        }else{           
            console.log('What do you do');            
        }
    };
}

interviewQuestions('designer')('Milton');
*/
//Bind, Call, Apply
/*
let john = {
    name: 'John', 
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if(style==='formal'){
            console.log('Good '+timeOfDay+' Ladies and Gentlemen! I\'m '
            + this.name+', I\'m a '+ this.job+' and I\'m '+this.age+' years old.');
        }else if(style==='friendly'){
            console.log();
        }
    }
};

let samantha = {
    name: 'Samantha', 
    age: 25,
    job: 'Marketer'
};

//john.presentation('formal', 'Morning');

john.presentation.call(samantha,'formal','Afternoon');

let years = [1990, 1993, 1970, 2007, 2001];

function arrayCalc(arr, fn){
    let arrRes = [...arr];
    return arrRes.map(x => fn(x));
}

function calculateAge(el){return 2019 - el};
function isFullAge(el,limit){return el < limit};

let ages = arrayCalc(years, calculateAge);
let fullJapan = arrayCalc(ages, isFullAge.bind(this,17));

console.log(ages);
console.log(fullJapan);
*/
/*
(()=>{
    function Question(question, answers, correct ){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.display = function(){
        console.log(this.question);
        let an = [...this.answers]
        let out = an.map(x => console.log( an.indexOf(x)+1 +') '+x));
        return out;
        
    }
    
    Question.prototype.checkAnswer = function(a){
        return a === this.correct ? console.log('Correct') : console.log('False');
    }
    
    let q1 = new Question('Are you gonna make it?', ['Yes','No'],1);
    let q2 = new Question('Who gonna stop you?',['Me','Them','No one'],3);
    let q3 = new Question('What are you?',['A beast','A animal','A Savage','All of the above'],4);
    
    let picks = [q1,q2,q3];
    let rn = Math.floor(Math.random()*3);
    
    picks[rn].display();
    
    let answer = parseInt(prompt('Select the correct Answer'));
    
    picks[rn].checkAnswer(answer);
})();
*/

(()=>{
    function Question(question, answers, correct ){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.display = function(){
        console.log(this.question);
        let an = [...this.answers]
        let out = an.map(x => console.log( an.indexOf(x)+1 +') '+x));
        return out;
        
    }
    
    Question.prototype.checkAnswer = function(a){
        return a === this.correct ? console.log('Correct') : console.log('False');
    }
    
    let q1 = new Question('Are you gonna make it?', ['Yes','No'],1);
    let q2 = new Question('Who gonna stop you?',['Me','Them','No one'],3);
    let q3 = new Question('What are you?',['A beast','A animal','A Savage','All of the above'],4);
    
    let picks = [q1,q2,q3];
    let rn = Math.floor(Math.random()*3);
    
    picks[rn].display();
    
    let answer = parseInt(prompt('Select the correct Answer'));
    
    picks[rn].checkAnswer(answer);
})();
