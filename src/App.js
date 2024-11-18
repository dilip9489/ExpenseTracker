import { useState, useEffect } from "react";
import "./App.css";
import WalletBalance from "./components/Wallet Js/WalletBalance";
import AddIncomeForm from "./components/AddIncome/AddIncomeForm";
import Expense from "./components/Expenses/Expense";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import EditExpenseForm from "./components/EditExpenseForm/EditExpenseForm";
import ExpenseTrends from "./components/ExpenseTrends/ExpenseTrends";
import ExpenseSummary from "./components/ExpenseSummary/ExpenseSummary";

function App() {
  const [walletBalance, setWalletBalance] = useState(
    () => Number(localStorage.getItem("walletBalance")) || 5000
  );

  const [expenses, setExpenses] = useState(
    () => JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const addIncome = (amount) => {
    setWalletBalance(walletBalance + amount);
  };
  const addExpense = (expense) => {
    if (expense.amount > walletBalance) {
      alert("Insufficient balance!");
      return;
    }
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense.amount);
  };

  const deleteExpense = (id, amount) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    setWalletBalance(walletBalance + amount);
  };

  const [editingExpense, setEditingExpense] = useState(null);

  const editExpense = (id) => {
    const expenseToEdit = expenses.find((exp) => exp.id === id);
    setEditingExpense(expenseToEdit);
  };

  const saveEditedExpense = (updatedExpense) => {
    const oldExpense = expenses.find((exp) => exp.id === updatedExpense.id);
    const amountDifference = updatedExpense.amount - oldExpense.amount;

    setWalletBalance(walletBalance - amountDifference);

    setExpenses(
      expenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    );

    setEditingExpense(null);
  };

  return (
    <div className="App">
      <h1 style={{ marginLeft: "30px", color: "#ffffff" }}>Expense Tracker</h1>
      <div className="app-item">
        <div className="div-item">
          <WalletBalance balance={walletBalance} addIncome={addIncome} />
          <Expense expense={expenses} addExpense={addExpense} />
          <ExpenseTrends expenses={expenses} />
        </div>
        <div className="list-div">
          <div className="list">
            {expenses.length > 0 && (
              <div className="list1">
                <h1 style={{ color: "#ffffff" }}>Recent Transactions</h1>
                <ExpenseList
                  expenses={expenses}
                  deleteExpense={deleteExpense}
                  editExpense={saveEditedExpense}
                />
              </div>
            )}
            {expenses.length > 0 && (
              <div className="list2">
                <h1 style={{ color: "#ffffff" }}>Top Expenses</h1>
                <ExpenseSummary expenses={expenses} />
              </div>
            )}

            {editingExpense && (
              <EditExpenseForm
                expense={editingExpense}
                 
                cancelEdit={() => setEditingExpense(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
