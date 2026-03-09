import React from "react";

// Search component renders an input field for users to enter a search query.
// It updates the search state in the parent component on every change.
function Search({ setSearch }) {
  return (
    <div className="ui large fluid icon input">
      {/* Input field for search query, updates parent state on change */}
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(e) => setSearch(e.target.value)} // Call setSearch with the input value
      />
      <i className="circular search link icon"></i> {/* Search icon */}
    </div>
  );
}

export default Search;
