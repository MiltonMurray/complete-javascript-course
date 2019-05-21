
const John = {
    points: [89, 120, 103],
    calcAvg: function (){
        let add = (acc, a)=>{return acc +a;}
        let result = this.points.reduce(add) / this.points.length;
        return result;
    }
};

const Mark = {
    points: [116, 94, 123],
    calcAvg: function (){
        let add = (acc, a)=>{return acc +a;}
        let result = this.points.reduce(add) / this.points.length;
        return result;
    }
};
const Mary = {
    points: [97, 134, 185],
    calcAvg: function (){
        let add = (acc, a)=>{return acc +a;}
        let result = this.points.reduce(add) / this.points.length;
        return result;
    }
};

let johnAvg = John.calcAvg();
let markAvg = Mark.calcAvg();
let maryAvg = Mary.calcAvg();

function result (){
    if(johnAvg !== markAvg){
        return johnAvg > maryAvg ? console.log('John wins') : console.log('Mark wins');
    }else{
        return "Draw";
    }
}
console.log(result());
