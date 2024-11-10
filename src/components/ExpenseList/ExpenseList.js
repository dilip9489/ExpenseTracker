import React from "react";
import { useState } from "react";
import {
  FaEdit,
  FaTimesCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../ExpenseList/ExpenseList.css";
import EditExpenseForm from "../EditExpenseForm/EditExpenseForm";

const ITEMS_PER_PAGE = 4;
function ExpenseList({ expenses, deleteExpense, editExpense }) {
  const [isEditing, setIsEditing] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Calculating total pages
  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);

  // Getting current expenses for the page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentExpenses = expenses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Navigate to previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Navigate to next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openEditForm = (expense) => {
    setExpenseToEdit(expense);
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
    setExpenseToEdit(null);
  };

  const saveEditedExpense = (updatedExpense) => {
    editExpense(updatedExpense);
    closeEditForm();
  };
  return (
    <div>
      <div className={`expense-list ${isEditing ? "blurred" : ""}`}>
        {currentExpenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="item">
              <h3>{expense.title}</h3>
              <p>{expense.date}</p>
            </div>

            <div className="expense-amount-and-buttons">
              <p
                style={{ width: "37px", marginRight: "10px", color: "orange" }}
              >
                ${expense.amount}
              </p>
              <button
                className="edit-button"
                onClick={() => openEditForm(expense)}
              >
                <FaEdit />
              </button>
              <button
                className="delete-button"
                onClick={() =>
                  deleteExpense(expense.id, Number(expense.amount))
                }
              >
                <FaTimesCircle />
              </button>
            </div>
          </div>
        ))}
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            <FaChevronLeft /> Prev
          </button>
          <span className="page">
            {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next <FaChevronRight />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <EditExpenseForm
              expense={expenseToEdit}
              saveEditedExpense={saveEditedExpense}
              cancelEdit={closeEditForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
