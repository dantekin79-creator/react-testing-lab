import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountContainer from '../components/AccountContainer';

// Test suite for verifying search and sort functionality updates the UI
describe('Search and Sort Test Suite', () => {
  test('change event is triggered and page updates', async () => {
    // Mock transactions for testing
    const mockTransactions = [
      {
        id: '1',
        date: '2019-12-01',
        description: 'Paycheck from Bob\'s Burgers',
        category: 'Income',
        amount: 1000
      },
      {
        id: '2',
        date: '2019-12-01',
        description: 'South by Southwest Quinoa Bowl at Fresh & Co',
        category: 'Food',
        amount: -10.55
      },
      {
        id: '3',
        date: '2019-12-02',
        description: 'Chipotle',
        category: 'Food',
        amount: -17.59
      }
    ];

    // Mock initial fetch
    global.setFetchResponse(mockTransactions);

    render(<AccountContainer />);

    // Wait for all transactions to load
    await screen.findByText('Paycheck from Bob\'s Burgers');
    await screen.findByText('South by Southwest Quinoa Bowl at Fresh & Co');
    await screen.findByText('Chipotle');

    // Test search: type 'chipotle' to filter
    const searchInput = screen.getByPlaceholderText('Search your Recent Transactions');
    await userEvent.type(searchInput, 'chipotle');

    // Assert only Chipotle is shown
    expect(screen.getByText('Chipotle')).toBeInTheDocument();
    expect(screen.queryByText('Paycheck from Bob\'s Burgers')).not.toBeInTheDocument();

    // Clear search
    await userEvent.clear(searchInput);

    // Test sort by description
    const sortSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(sortSelect, 'description');

    // Assert order after sort (assuming alphabetical)
    const descriptions = screen.getAllByText(/Paycheck|South|Chipotle/);
    expect(descriptions[0]).toHaveTextContent('Chipotle');
  });
});