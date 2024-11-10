import React from "react";
import { useState } from "react";
import AddExpenseForm from "../AddExpense/AddExpenseForm.js";

import "../Expenses/Expense.css";

const Expense = ({ expense, addExpense }) => {
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

  const handleClick = () => {
    setShowAddExpenseForm((prev) => !prev);
  };
  const onCancel = () => {
    setShowAddExpenseForm(false);
  };
  console.log(expense); //array of objects
  const totalAmount = expense.reduce(
    (total, exp) => total + Number(exp.amount),
    0
  );
  return (
    <div className="expense-container">
      <div className={`expense ${showAddExpenseForm ? "blurred" : ""}`}>
        <h2 className="display-expense">
          Expenses: <span>${totalAmount}</span>
        </h2>
        <button className="addExpense" onClick={handleClick}>
          + Add Expense
        </button>
      </div>

      {showAddExpenseForm && (
        <>
          <div className="backdrop" onClick={onCancel}></div>
          <div className="centered-form">
            <AddExpenseForm addExpense={addExpense} onCancel={onCancel} />
          </div>
        </>
      )}
    </div>
  );
};
export default Expense;
