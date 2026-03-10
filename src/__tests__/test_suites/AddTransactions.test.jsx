import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AccountContainer from '../../components/AccountContainer';

// Test suite for verifying adding transactions and API calls
describe('Add Transactions Test Suite', () => {
  test('new transactions are added to frontend and POST request is called', async () => {
    // Initial mock transactions
    const mockTransactions = [
      {
        id: '1',
        date: '2019-12-01',
        description: 'Paycheck from Bob\'s Burgers',
        category: 'Income',
        amount: 1000
      }
    ];

    // Mock initial fetch
    global.setFetchResponse(mockTransactions);

    render(<AccountContainer />);

    // Wait for initial load
    await screen.findByText('Paycheck from Bob\'s Burgers');

    // Mock the new transaction response
    const newTransaction = {
      id: '2',
      date: '2023-01-01',
      description: 'Test Transaction',
      category: 'Test',
      amount: 100
    };

    // Mock POST fetch
    window.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(newTransaction),
      ok: true,
      status: 201
    }));

    // Get form inputs
    const dateInput = screen.getByTestId('date-input');
    const descriptionInput = screen.getByTestId('description-input');
    const categoryInput = screen.getByTestId('category-input');
    const amountInput = screen.getByTestId('amount-input');
    const submitButton = screen.getByRole('button', { name: /add transaction/i });

    // Fill and submit form
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Transaction' } });
    fireEvent.change(categoryInput, { target: { value: 'Test' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(submitButton);

    // Assert POST was called with correct data
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:6001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: '2023-01-01',
        description: 'Test Transaction',
        category: 'Test',
        amount: '100'
      })
    });

    // Assert new transaction appears
    expect(await screen.findByText('Test Transaction')).toBeInTheDocument();
  });
});