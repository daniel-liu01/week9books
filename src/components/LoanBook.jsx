import React, { useState } from "react";
import "./LoanBook.css";

export default function LoanBook({ books }) {
  const [borrower, setBorrower] = useState("John Smith");
  const [selectedBook, setSelectedBook] = useState("");
  const [weeks, setWeeks] = useState(1);
  const [loans, setLoans] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedBook) return alert("Please select a book.");

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + weeks * 7);

    const newLoan = {
      borrower,
      book: selectedBook,
      dueDate: dueDate.toLocaleDateString(),
    };

    setLoans([...loans, newLoan]);
    setSelectedBook("");
    setWeeks(1);
  }

  return (
    <div className="loan-manager">
      <form onSubmit={handleSubmit} className="loan-form">
        <label>
          Borrower:
          <input
            type="text"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          />
        </label>

        <label>
          Book:
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">Select a book</option>
            {books.map((b) => (
              <option key={b.id} value={b.title}>
                {b.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Loan period (in weeks):
          <input
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
          loans.map((loan, i) => (
            <div key={i} className="loan-item">
              <p><strong>Borrower:</strong> {loan.borrower}</p>
              <p><strong>Book:</strong> {loan.book}</p>
              <p><strong>Due date:</strong> {loan.dueDate}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
