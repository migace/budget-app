export class BudgetState {
  #state = [];

  add({ amount, category, type }) {
    this.#state.push({
      id: this.#state.length + 1,
      amount,
      category,
      type,
    });

    this.#saveState();
  }

  getBalance() {
    return this.#state.reduce((acc, curr) => {
      if (curr.type === "deposit") {
        return acc + curr.amount;
      }

      return acc - curr.amount;
    }, 0);
  }

  loadInitialBudget() {
    this.#state = this.#loadState();
  }

  get state() {
    return this.#state;
  }

  #saveState() {
    localStorage.setItem("budget", JSON.stringify(this.#state));
  }

  #loadState() {
    const budget = localStorage.getItem("budget");

    if (budget) {
      return JSON.parse(budget);
    }

    return [];
  }
}
