import React from "react";

// Transaction component renders a single row in the transactions table.
// It displays the transaction's date, description, category, and amount.
function Transaction({ transaction }) {
  return (
    <tr>
      {/* Display transaction date */}
      <td>{transaction.date}</td>
      {/* Display transaction description */}
      <td>{transaction.description}</td>
      {/* Display transaction category */}
      <td>{transaction.category}</td>
      {/* Display transaction amount */}
      <td>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
