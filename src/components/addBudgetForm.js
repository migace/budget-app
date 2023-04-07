export const createAddBudgetForm = (currentBalance) => {
  const parent = document.createElement("div");
  const infoEl = document.createElement("p");

  const checkBalance = () => {
    const currentAmount = parent.querySelector("#amount").value;
    const submitBtn = parent.querySelector("button[type=submit]");
    const type = parent.querySelector("input[name=type]:checked").value;

    if (type === "withdrawal" && currentAmount > currentBalance) {
      submitBtn.disabled = true;
      submitBtn.classList.add("bg-red-500");
      infoEl.innerText = "You don't have enough money to withdraw";
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove("bg-red-500");
      infoEl.innerText = "";
    }
  };

  parent.innerHTML = `
    <form id="add-budget-form">
      <div class="mb-6">
        <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
        <input id="amount" name="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="300" required>
      </div>
      <div class="mb-6">
        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>
        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a category</option>
          <option value="work">Work</option>
          <option value="food">Food</option>
          <option value="holidays">Holidays</option>
          <option value="pleasures">Pleasures</option>
        </select>
      </div>
      <div class="flex items-center mb-4">
        <input checked id="default-radio-1" type="radio" value="deposit" name="type" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Deposit</label>
      </div>
      <div class="flex items-center mb-4">
        <input id="default-radio-2" type="radio" value="withdrawal" name="type" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Withdrawal</label>
      </div>
      <div class="flex items-center">
        <button type="submit" class="mr-4 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
      </div>
    </form>
  `;

  parent.querySelector("button[type=submit]").parentNode.append(infoEl);
  parent.querySelectorAll("input[type=radio]").forEach((item) => {
    item.addEventListener("change", checkBalance);
  });
  parent
    .querySelector("input[name=amount]")
    .addEventListener("input", checkBalance);

  return parent;
};
