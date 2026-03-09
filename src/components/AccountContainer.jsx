import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

// AccountContainer is the main component that manages the state of transactions,
// handles fetching data from the API, adding new transactions, searching, and sorting.
// It renders the search bar, add form, sort dropdown, and the list of transactions.
function AccountContainer() {
  // State to hold the list of transactions fetched from the server
  const [transactions, setTransactions] = useState([]);
  // State to hold the current search query for filtering transactions
  const [search, setSearch] = useState("");

  // useEffect hook to fetch transactions from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then(r => r.json())
      .then(data => setTransactions(data));
  }, []);

  // Function to handle posting a new transaction to the API and updating the state
  function postTransaction(newTransaction) {
    fetch('http://localhost:6001/transactions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
      .then(r => r.json())
      .then(data => setTransactions([...transactions, data])); // Add the new transaction to the existing list
  }

  // Function to sort the transactions based on the selected criteria (description or category)
  function onSort(sortBy) {
    const sorted = [...filteredTransactions].sort((a, b) => {
      if (sortBy === 'description') {
        return a.description.localeCompare(b.description); // Alphabetical sort by description
      } else {
        return a.category.localeCompare(b.category); // Alphabetical sort by category
      }
    });
    setTransactions(sorted); // Update the transactions state with the sorted list
  }

  // Filter transactions based on the search query (case-insensitive match on description or category)
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(search.toLowerCase()) ||
    transaction.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search component to input search query and update search state */}
      <Search setSearch={setSearch} />
      {/* Form to add a new transaction, calls postTransaction on submit */}
      <AddTransactionForm postTransaction={postTransaction} />
      {/* Dropdown to select sort criteria, calls onSort on change */}
      <Sort onSort={onSort} />
      {/* List component to display the filtered transactions */}
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
