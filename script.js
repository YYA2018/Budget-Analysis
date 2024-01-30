//SELECTORS & VARIABLES 🕸️

const budgetIn = document.querySelector(".budget");
const expenseTypeIn = document.querySelector(".expense-type");
const expenseIn = document.querySelector(".expense");

const setBudgetBtn = document.querySelector(".set-btn");
const checkBtn = document.querySelector(".check-btn");

const budgetAmount = document.querySelector(".budget-amount");
const expenseAmount = document.querySelector(".expense-amount");
const balanceAmount = document.querySelector(".balance-amount");

const itemName = document.querySelector(".list-item-name");
const itemCost = document.querySelector(".list-item-amount");

let editBtns = document.querySelectorAll(".fa-pen-to-square");
let deleteBtns = document.querySelectorAll(".fa-trash-can");

const listSec = document.querySelector(".list-section");

let totalBudget = 0;
let totalExpenses = 0;
let finalBalance = 0;

let expensesArr = [];
let newItem, newCost;
let i = 0;

// FUNCTIONS ⚙️
const calText = function () {
  totalExpenses = expensesArr.reduce((sum, current) => sum + current, 0);
  finalBalance = totalBudget - totalExpenses;

  expenseAmount.textContent = totalExpenses;
  balanceAmount.textContent = finalBalance;
};

const calculator = function (state) {
  if (state == "normal" && expenseIn.value !== "") {
    newItem = expenseTypeIn.value;
    newCost = Number(expenseIn.value);
    expensesArr.push(newCost);

    calText();

    // clear the input fields
    expenseTypeIn.value = "";
    expenseIn.value = "";
  } else {
    calText();
  }
};

const elementModifier = function (element) {
  expensesArr[
    element.parentElement
      .querySelector(".list-item-amount")
      .getAttribute("data-id")
  ] = 0;

  totalExpenses = expensesArr.reduce((sum, current) => sum + current, 0);
  calculator();

  element.parentElement.remove();
};
//ACTIONS 🧨

setBudgetBtn.addEventListener("click", () => {
  if (budgetIn.value !== "") {
    budgetAmount.textContent = ""; //clear previous value
    totalBudget = budgetIn.value;
    budgetAmount.textContent = totalBudget; //show new value
    budgetIn.value = "";
    calculator();
  } else {
    alert("Enter a positive numerical value!");
  }
});

checkBtn.addEventListener("click", () => {
  if (expenseIn.value !== "" && expenseTypeIn.value !== "") {
    calculator("normal");

    //adding new value to list
    let element = `
        <div class="list-div">
          <div class="list-item-name">${newItem}</div>
          <div class="list-item-amount" data-id="${i}">${newCost}</div>
          <i class="fa-regular fa-pen-to-square"></i>
          <i class="fa-solid fa-trash-can"></i>
        </div>
  `;
    listSec.insertAdjacentHTML("beforeend", element);
    i++;

    //adding event listeners to btns created
    editBtns = document.querySelectorAll(".fa-pen-to-square");
    deleteBtns = document.querySelectorAll(".fa-trash-can");

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        elementModifier(btn);
      });
    });

    editBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let targetItem =
          btn.parentElement.querySelector(".list-item-name").textContent;
        let targetCost =
          btn.parentElement.querySelector(".list-item-amount").textContent;

        elementModifier(btn);

        expenseTypeIn.value = targetItem;
        expenseIn.value = targetCost;
      });
    });
  } else {
    alert("Kindly, fill all expenses inputs!");
  }
});
