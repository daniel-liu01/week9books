import React, { useState } from "react";
import "./LoanBook.css";

export default function LoanBook({ books, updateBookStatus }) {
  const [borrower, setBorrower] = useState("John Smith");
  const [selectedBook, setSelectedBook] = useState("");
  const [weeks, setWeeks] = useState(1);

  // Borrow a book
  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedBook) return alert("Please select a book.");

    const bookObj = books.find((b) => b.id === selectedBook);
    if (!bookObj) return;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + weeks * 7);

    // Save due date in the book object
    updateBookStatus(bookObj.id, "On Loan", dueDate.toLocaleDateString());

    setSelectedBook("");
    setWeeks(1);
  }

  // Return a book
  function handleReturn(bookId) {
    updateBookStatus(bookId, "Available", null);
  }

  // Get all books currently on loan
  const loans = books.filter((b) => b.status === "On Loan");

  return (
    <div className="loan-manager">
      <form onSubmit={handleSubmit} className="loan-form">
        <label>
          Borrower:
          <input
            className="fields"
            type="text"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          />
        </label>

        <label>
          Book:
          <select
            className="fields"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">Select a book</option>
            {books
              .filter((b) => b.status !== "On Loan")
              .map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
          </select>
        </label>

        <label>
          Loan period (in weeks):
          <input
            className="fields"
            type="number"
            min="1"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
          />
        </label>

        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>

      <div className="loan-list">
        <h3>Currently on loan</h3>
        {loans.length === 0 ? (
          <p>No active loans</p>
        ) : (
          loans.map((loan) => (
            <div key={loan.id} className="loan-item">
              <p>
                <strong>Borrower:</strong> John Smith
              </p>
              <p>
                <strong>Book:</strong> {loan.title}
              </p>
              <p>
                <strong>Due date:</strong> {loan.dueDate}
              </p>
              <button
                className="return-btn"
                onClick={() => handleReturn(loan.id)}
              >
                Return Book
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
