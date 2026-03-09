import React from "react";
import Transaction from "./Transaction";

// TransactionsList component renders a table of transactions.
// It maps over the transactions array and renders each as a Transaction component.
function TransactionsList({ transactions }) {
  // Create an array of Transaction components for each transaction
  const transactionComponent = transactions.map((transaction) => {
    return <Transaction key={transaction.id} transaction={transaction} />;
  });

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          {/* Table headers for the transaction columns */}
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">DELETE</h3>
          </th>
        </tr>
        {/* Render the list of transaction rows */}
        {transactionComponent}
      </tbody>
    </table>
  );
}

export default TransactionsList;
