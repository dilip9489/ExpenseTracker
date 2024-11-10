import React, { useState } from "react";
import "../AddIncome/AddIncomeForm.css";

function AddIncomeForm({ addIncome, onCancel }) {
  const [income, setIncome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(income);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    addIncome(amount);
    setIncome("");
    onCancel();
  };

  return (
    <div className="add-income">
      <h2 className="add">Add Balance</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input-income"
          type="number"
          placeholder="Income Amount"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <button type="submit" className="add-balance">
          Add Balance
        </button>
        <button className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddIncomeForm;
