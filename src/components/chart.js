import Chart from "chart.js/auto";

export const createChart = (ctx, data) => {
  const currentBalance = data.reduce((acc, curr) => {
    if (curr.type === "deposit") {
      return acc + curr.amount;
    }

    return acc - curr.amount;
  }, 0);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((item) => item.id),
      datasets: [
        {
          label: "Finance",
          backgroundColor:
            currentBalance === 0 ? "rgb(239 68 68)" : "rgb(34 197 94)",
          borderColor:
            currentBalance === 0 ? "rgb(239 68 68)" : "rgb(34 197 94)",
          data: data.map((_, index, arr) => {
            return arr.slice(0, index + 1).reduce((acc, curr) => {
              if (curr.type === "deposit") {
                return acc + curr.amount;
              }

              return acc - curr.amount;
            }, 0);
          }),
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            callback: function (value) {
              return "ID: " + value;
            },
          },
        },
        y: {
          ticks: {
            callback: function (value) {
              return "$" + value;
            },
          },
        },
      },
    },
  });
};
