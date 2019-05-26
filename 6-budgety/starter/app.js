/**
 * BUDGET CONTROLLER
 * This module controls users budget
 */
let budgetController = (()=>{
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

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
        container: '.container'
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
            newHtml = newHtml.replace('%value%', obj.value);

            //insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
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
    };

    let updateBudget = function(){
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. returns the budget 
        let budget = budgetCtrl.getBudget();

        // 3. Display the budget on UI
        UICtrl.displayBudget(budget);
    }

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
        }        
    };

    let ctrlDeleteItem = (event)=>{
        let itemID,splitID;
        itemID = console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);

        if(itemID){
            //inc-1
            splitID = itemID.split('-');
        }
    };

    return {
        init: function(){
            console.log('App Started');
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