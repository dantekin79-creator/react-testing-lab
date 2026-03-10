import React from "react";

// AddTransactionForm component renders a form for users to input new transaction details.
// On form submission, it collects the input values and calls the postTransaction prop function.
function AddTransactionForm({ postTransaction }) {
  // Function to handle form submission: prevents default, extracts form data, and posts the transaction
  function submitForm(e) {
    e.preventDefault(); // Prevent page reload on submit
    const formData = new FormData(e.currentTarget);
    const newTransaction = {
      date: formData.get("date"),
      description: formData.get("description"),
      category: formData.get("category"),
      amount: formData.get("amount"),
    };
    postTransaction(newTransaction); // Call the parent function to add the transaction
  }

  return (
    <div className="ui segment">
      {/* Form with inline fields for transaction inputs */}
      <form className="ui form" onSubmit={(e) => { submitForm(e) }}>
        <div className="inline fields">
          <input type="date" name="date" data-testid="date-input" /> {/* Date input for transaction date */}
          <input type="text" name="description" placeholder="Description" data-testid="description-input" /> {/* Text input for description */}
          <input type="text" name="category" placeholder="Category" data-testid="category-input" /> {/* Text input for category */}
          <input type="number" name="amount" placeholder="Amount" step="0.01" data-testid="amount-input" /> {/* Number input for amount */}
        </div>
        {/* Submit button to add the transaction */}
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
