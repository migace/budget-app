import { CATEGORIES, TYPE } from "../constants";
import ChevronUp from "../assets/icons/chevronUp.svg";
import ChevronDown from "../assets/icons/chevronDown.svg";

export const createBudgetTable = (data) => {
  let tableBody;
  const createTableRows = (data) => {
    const parent = document.createElement("tbody");
    const rows = data.map((item) => {
      const textClass =
        item.type === "deposit" ? "text-green-500" : "text-red-500";

      return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4">
            ${item.id}
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ${textClass}">
            ${item.amount}
          </td>
          <td class="px-6 py-4">
            ${CATEGORIES[item.category]}
          </td>
          <td class="px-6 py-4">
            ${TYPE[item.type]}
          </td>           
        </tr>
      `;
    });

    parent.innerHTML = rows.join("");

    return parent;
  };

  const chevUp = document.createElement("img");
  const chevDown = document.createElement("img");
  const parent = document.createElement("div");

  parent.innerHTML = `
    <div class="relative overflow-auto max-h-96">
      <table id="finance-table" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              ID
            </th>
            <th scope="col" class="px-6 py-3 flex items-center">
              Amount
              <div id="sort" class="flex flex-col ml-2">
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              Type
            </th>
          </tr>         
        </thead>        
      </table>
    </div>
  `;

  chevUp.src = ChevronUp;
  chevUp.classList.add("h-4", "w-4");
  chevDown.src = ChevronDown;
  chevDown.classList.add("h-4", "w-4");

  chevUp.addEventListener("click", () => {
    tableBody.remove();
    tableBody = createTableRows(data.sort((a, b) => a.amount - b.amount));
    parent.querySelector("#finance-table").append(tableBody);
  });

  chevDown.addEventListener("click", () => {
    tableBody.remove();
    tableBody = createTableRows(data.sort((a, b) => b.amount - a.amount));
    parent.querySelector("#finance-table").append(tableBody);
  });

  parent.querySelector("#sort").appendChild(chevUp);
  parent.querySelector("#sort").appendChild(chevDown);
  tableBody = createTableRows(data);
  parent.querySelector("#finance-table").append(tableBody);

  return parent;
};
