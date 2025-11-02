import React from "react";
import "./ManageLoans.css";

export default function ManageLoans({ onClick }) {
  return (
    <button className="manage-loans-btn" onClick={onClick}>
      Manage Loans
    </button>
  );
}
