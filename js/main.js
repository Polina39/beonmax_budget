'use strict';

let btnStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let money, time;

    expensesBtn.disabled = true;
    optionalExpensesBtn.disabled = true;
    countBudgetBtn.disabled = true;

    btnStart.addEventListener('click', function() {
        time = prompt('Введите дату в формате YYYY-MM-DD', '');
        money = +prompt("Ваш бюджет на месяц?", '');
    
        while (isNaN(money) || money == '' || money == null) {
            money = +prompt("Ваш бюджет на месяц?", '');
        }
        appData.budget = money;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed(); //toFixed - округляет значение до целого
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDay();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;
    });

    expensesBtn.addEventListener('click', function() {
        let sum = 0;

        for (let i=0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;

            if ((typeof (a)) === 'string' && (typeof (a)) != null && a != '' && b != '' &&
             (typeof (b)) != null && a.length < 50) {
                 console.log('done');
                appData.expenses[a] = b;
                sum += +b;
            } else {
                console.log ('bad result');
                i--;
            }
        }
        expensesValue.textContent = sum;  
    });

    optionalExpensesBtn.addEventListener('click', function() {
        for (let i = 0; i < optionalExpensesItem.length; i++) {
            let opt = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + " ";
            }
    });

    countBudgetBtn.addEventListener('click', function() {

        if (appData.budget != undefined) {
            appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;
    
            if(appData.moneyPerDay <= 500){
                levelValue.textContent = 'Низкий уровень достатка';
            } else if (appData.moneyPerDay > 500 && appData.moneyPerDay <= 2000) {
                levelValue.textContent = 'Средний уровень достатка';
            } else if (appData.moneyPerDay > 2000){
                levelValue.textContent = 'Высокий уровень достатка';
            } else {
                levelValue.textContent = 'Произошла ошибка';
            }
        } else {
            dayBudgetValue.textContent = 'Произошла ошибка';
        }
    });

    incomeItem.addEventListener('input', function() {
        let items = incomeItem.value;
        appData.income = items.split(', '); //делаем из строки массив и помещаем в массив
        incomeValue.textContent = appData.income;
    });

    checkSavings.addEventListener('click', function() {
        if (appData.savings == true) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    });

    sumValue.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;

                appData.monthIncome = sum/100/12*percent;
                appData.yearIncome = sum/100*percent;

                monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
                yearsavingsValue.textContent = appData.yearIncome.toFixed(1);

        }
    });

    percentValue.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;

                appData.monthIncome = sum/100/12*percent;
                appData.yearIncome = sum/100*percent;

                monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
                yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    });

    let appData = {
        budget: money,
        expenses: {},
        optionalExpenses: {},
        income: [],
        timeData: time,
        savings: false,
        };
        