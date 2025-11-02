import React from "react";
import LoanBook from "./LoanBook";
import "./Overlay.css";

export default function Overlay({ onClose, books }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Manage Loans</h2>
        <button className="quit-btn" onClick={onClose}>
          Quit
        </button>
      </div>

      <LoanBook books={books} />
    </div>
  );
}
