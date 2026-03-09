import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AccountContainer from '../components/AccountContainer';

describe('Add Transactions Test Suite', () => {
  test('new transactions are added to frontend and POST request is called', async () => {
    const mockTransactions = [
      {
        id: '1',
        date: '2019-12-01',
        description: 'Paycheck from Bob\'s Burgers',
        category: 'Income',
        amount: 1000
      }
    ];

    global.setFetchResponse(mockTransactions);

    render(<AccountContainer />);

    // Wait for initial transactions to load
    await screen.findByText('Paycheck from Bob\'s Burgers');

    // Mock fetch for POST
    const newTransaction = {
      id: '2',
      date: '2023-01-01',
      description: 'Test Transaction',
      category: 'Test',
      amount: 100
    };

    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(newTransaction),
      ok: true,
      status: 201
    }));

    const dateInput = screen.getByTestId('date-input');
    const descriptionInput = screen.getByTestId('description-input');
    const categoryInput = screen.getByTestId('category-input');
    const amountInput = screen.getByTestId('amount-input');
    const submitButton = screen.getByRole('button', { name: /add transaction/i });

    await userEvent.type(dateInput, '2023-01-01');
    await userEvent.type(descriptionInput, 'Test Transaction');
    await userEvent.type(categoryInput, 'Test');
    await userEvent.type(amountInput, '100');
    await userEvent.click(submitButton);

    // Check POST was called
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:6001/transactions', {
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

    // Check new transaction is displayed
    expect(await screen.findByText('Test Transaction')).toBeInTheDocument();
  });
});