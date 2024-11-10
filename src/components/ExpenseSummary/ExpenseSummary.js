import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import "../ExpenseSummary/ExpenseSummary.css";
function ExpenseSummary({ expenses }) {
  const categories = [...new Set(expenses.map((exp) => exp.category))];
  const data = categories.map((cat) => ({
    name: cat,
    value: expenses
      .filter((exp) => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="expense-summary">
      <BarChart
        width={500}
        height={300}
        data={data}
        layout="vertical" // To make the bars horizontal
        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        barSize={20}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default ExpenseSummary;
