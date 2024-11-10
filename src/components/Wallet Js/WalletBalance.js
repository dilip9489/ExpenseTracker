import React from "react";
import { useState } from "react";
import AddIncomeForm from "../AddIncome/AddIncomeForm";
import "../Wallet Js/WalletBalance.css";

const WalletBalance = ({ balance, addIncome }) => {
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);

  const handleClick = () => {
    setShowAddIncomeForm((prev) => !prev);
  };
  const onCancel = () => {
    setShowAddIncomeForm(false); // Hide the form when Cancel is clicked
  };

  return (
    <div className="income-container">
      <div className={`wallet-balance ${showAddIncomeForm ? "blurred" : ""}`}>
        <h2 className="display-balance">
          Wallet Balance: <span>${balance}</span>
        </h2>
        <button className="addIncome" onClick={handleClick}>
          + Add Income
        </button>
      </div>

      {showAddIncomeForm && (
        <>
          <div className="backdrop" onClick={onCancel}></div>
          <div className="centered-form">
            <AddIncomeForm addIncome={addIncome} onCancel={onCancel} />
          </div>
        </>
      )}
    </div>
  );
};
export default WalletBalance;
