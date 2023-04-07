import { createAppbar } from "./components/appbar";
import { createAddBudgetForm } from "./components/addBudgetForm";
import { BudgetState } from "./BudgetState";
import { createBudgetTable } from "./components/budgetTable";
import { createChart } from "./components/chart";

const appEl = document.getElementById("app");
const budgetState = new BudgetState();

budgetState.loadInitialBudget();

const createUi = () => {
  const appBar = createAppbar(budgetState.getBalance());
  const budgetForm = createAddBudgetForm(budgetState.getBalance());
  const financeTable = createBudgetTable(budgetState.state);

  appEl.innerHTML = `
    <div class="mb-8">
      ${appBar}
    </div>
    <div class="container mx-auto max-w-screen-xl">
      <div class="flex gap-16 mb-20">
        <div class="w-[50%]">
          <h4 class="mb-6 text-3xl">Deposits and withdrawals</h4>
          <div id="budget-form"></div>
        </div>
        <div id="finance-table" class="w-[50%]">
          <h4 class="mb-6 text-3xl">Finance</h4>
        </div>
      </div>
      <div class="mb-20">
        <canvas class="w-full" id="budget-chart"></canvas>
      </div>
    </div>
  `;

  appEl.querySelector("#budget-form").append(budgetForm);
  appEl.querySelector("#finance-table").append(financeTable);
};

const update = () => {
  createUi();

  createChart(document.getElementById("budget-chart"), budgetState.state);
};
update();

const addBudgetFormEl = document.getElementById("add-budget-form");

addBudgetFormEl.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const amount = +ev.target.elements.amount.value;
  const category = ev.target.elements.category.value;
  const type = ev.target.elements.type.value;

  budgetState.add({ amount, category, type });
  update();
});
