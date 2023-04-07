export const createAppbar = (balance = 0) => {
  const balanceClass = balance >= 0 ? "text-green-500" : "text-red-500";

  return `
    <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center">
        💰
          <span class="ml-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BudgetApp
          </span>
        </a>       
        <div class="hidden w-full md:block md:w-auto ${balanceClass}">
          ${balance}$
        </div>
      </div>
    </nav>
    `;
};
