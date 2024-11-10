import React, { useState } from "react";

function EditExpenseForm({ expense, saveEditedExpense, cancelEdit }) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExpense = {
      ...expense,
      title,
      amount: Number(amount),
      category,
      date,
    };
    saveEditedExpense(updatedExpense);
  };

  return (
    <div className="Expenses">
      <h2 className="Add">Add Expense</h2>
      <form onSubmit={handleSubmit} className="handleExpense">
        <input
          className="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <input
          className="category"
          type="text"
          placeholder="Select Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          className="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="expenseAdded">
          Save
        </button>
        <button type="button" className="cancelExpense" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditExpenseForm;
