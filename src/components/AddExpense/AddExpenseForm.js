import React, { useState } from "react";
import "../AddExpense/AddExpense.css";

function AddExpenseForm({ addExpense, onCancel }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert("All fields are required!");
      return;
    }
    const expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };
    addExpense(expense);
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
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
          onChange={handleDateChange}
          required
        />
        <br />
        <button type="submit" className="expenseAdded">
          Add Expense
        </button>
        <button className="cancelExpense" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddExpenseForm;
