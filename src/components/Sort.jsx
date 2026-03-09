// Sort component renders a dropdown select for sorting transactions.
// It calls the onSort prop function with the selected value on change.
function Sort({ onSort }) {
  return (
    <select onChange={(e) => {
      onSort(e.target.value); // Call onSort with the selected sort criteria
    }}>
      <option value={"description"}>Description</option> {/* Option to sort by description */}
      <option value={"category"}>Category</option> {/* Option to sort by category */}
    </select>
  );
}

export default Sort;