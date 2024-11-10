import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import "../ExpenseTrends/ExpenseTrends.css";

function ExpenseTrends({ expenses }) {
  console.log(expenses);
  const categories = [...new Set(expenses.map((exp) => exp.category))];
  console.log(categories);
  const data = categories.map((cat) => {
    const filteredExpenses = expenses.filter((exp) => exp.category === cat);
    const categoryTotal = filteredExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    // console.log(`Category: ${cat}, Filtered Expenses:`, filteredExpenses);
    // console.log(`Category Total for ${cat}:`, categoryTotal);

    return {
      name: cat,
      value: categoryTotal,
    };
  });

  console.log("Data:", data);

  const totalExpense = data.reduce((sum, entry) => sum + entry.value, 0);
  console.log(totalExpense);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
  ];

  return (
    <div className="expense-trends">
      <PieChart width={350} height={220}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          label={({ name, value }) =>
            totalExpense > 0
              ? `${((value / totalExpense) * 100).toFixed(2)}%`
              : `${name}: 0%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>

      <div className="legend">
        {data.map((entry, index) => (
          <div key={`legend-item-${index}`} className="legend-item">
            <span
              className="legend-color"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
                display: "inline-block",
              }}
            ></span>
            <span className="name">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseTrends;
