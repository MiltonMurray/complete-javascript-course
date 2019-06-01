/**
 * BUDGET CONTROLLER
 * This module controls users budget
 */
let budgetController = (()=>{
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value/ totalIncome) *100);
        }else{
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = function(type){
        let sum = 0;
        data.allItems[type].map(x => sum += x.value);
        data.totals[type] = sum;
    }

    let data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage:-1
    };

    return{
        addItem: function(type, des, val){
            let newItem, ID;
            
            //create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            

            //create new item based on inc or exp
            if(type === 'exp'){
                newItem = new Expense(ID, des,val);
            } else if(type === 'inc'){
                newItem = new Income(ID, des,val);
            }
            
            //pushed into data structure
            data.allItems[type].push(newItem);

            //return new element
            return newItem;
        },

        deleteItem: function(type, id){
            let ids, index;
            //id = 3
            //data.allItems[type][id];

            // ids =[1 2 4 6 8]
            //index = 3

            ids = data.allItems[type].map(curr => curr.id);

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function(){
            //calc total income and exp
            calculateTotal('exp');
            calculateTotal('inc');

            //calc budget: inc - exp
            data.budget = data.totals.inc - data.totals.exp;

            //calc percentage of inc spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
            
        },
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },
        getPercentages: function(){
            let allPerc = data.allItems.exp.map(x => x.getPercentage());

            return allPerc;
        },
        getBudget: function(){
            return{ 
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function(){
            console.log(data);
        }
    };
})();







//--------------------------------------------------------------------------
/**
 * UI CONTROLLER
 * This module controls the user interface
 */
let UIController = (()=>{
    let DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    let formatNumber = function(num, type){
        let numSplit;
        /**
         * + or - before number
         * exactly  2 decimal points 
         * comma separating  the thousands
         * 
         * 2310.4534 --> + 2,300.45
         */

         num = Math.abs(num);
         num = num.toFixed(2);

         numSplit = num.split('.')
         int = numSplit[0];
         if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3,3);
         }
         dec = numSplit[1];

         
         return (type === 'exp'? sign = '-': sign = '+') + ' '+ int +'.'+ dec;

    }
    let nodeListForEach = function(list, callback){
        for(var i=0; i < list.length; i++){
            callback(list[i], i);
        }
    };
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value, //either inc or exp
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
            };           
        }, 
        addListItem: function(obj, type){
            let html, newHtml, element;
            //create a HTML string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            //replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%',formatNumber(obj.value, type));

            //insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID){
            let ele = document.getElementById(selectorID);
            ele.parentNode.removeChild(ele);
        },
        clearFields: function(){
            let fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDesc+ ','+DOMstrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach((curr, i, arr) => {
                curr.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(obj){
            let type;
            obj.budget > 0? type = 'inc': type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        displayMonth: function(){
            let now, year, month;
            now = new Date();
            //let christmas = new Date(2016, 11, 25);
            months =['January','February','March','April','May','June','July','August','September','October','November','December'];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] +' '+ year;

        },
        displayPercentages: function(percentages){
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
           

            nodeListForEach(fields, function(curr, index){
                if(percentages[index] > 0){
                    curr.textContent = percentages[index] + '%';
                }else{
                    curr.textContent = '---'
                }
                
            });     
        },
        changedType: function(){
            let fields = document.querySelectorAll(
                DOMstrings.inputType + ','+
                DOMstrings.inputDesc + ','+
                DOMstrings.inputValue);

            nodeListForEach(fields, function(curr){
                curr.classList.toggle("red-focus");
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();







//---------------------------------------------------------------------------
/**
 * GLOBAL APP CONTROLLER
 * This module controls communication between modules
 */
let appController = ((budgetCtrl, UICtrl)=>{

    let setupEventListeners = function(){
        DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress',(event)=>{           
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }         
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType)
    };

    let updateBudget = function(){
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. returns the budget 
        let budget = budgetCtrl.getBudget();

        // 3. Display the budget on UI
        UICtrl.displayBudget(budget);
    };

    let updatePercentages = function(){

        //calculate the percentages
        budgetCtrl.calculatePercentages();

        //read percentages from the budget controller
        let percentages = budgetCtrl.getPercentages();

        //update the user interface with new percentages
        UICtrl.displayPercentages(percentages);
    };

    let ctrlAddItem = function(){
        let input, newItem;

        // 1. Get the field input Data
        input = UICtrl.getInput();

        if(input.description !=="" && !isNaN(input.value) && input.value > 0){
            // 2. Add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //3.5 Clear the fields
            UICtrl.clearFields();

            // 4 . Calculate and update budget
            updateBudget();

            //5. calculate and update percentages
            updatePercentages();
        }        
    };

    let ctrlDeleteItem = (event)=>{
        let itemID,splitID,type,ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //Delete item from data structure
            budgetCtrl.deleteItem(type,ID);

            //Delete item from user interface
            UICtrl.deleteListItem(itemID);

            //Update and show new budget
            updateBudget();

            //calculate and update percentages
            updatePercentages();

        }
    };

    return {
        init: function(){
            console.log('App Started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({ 
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }
 
})(budgetController, UIController);

appController.init();