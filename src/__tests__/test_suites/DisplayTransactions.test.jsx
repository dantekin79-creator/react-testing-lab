import { render, screen } from '@testing-library/react';
import AccountContainer from '../components/AccountContainer';

describe('Display Transactions Test Suite', () => {
  test('transactions are displayed on startup', async () => {
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
      }
    ];

    global.setFetchResponse(mockTransactions);

    render(<AccountContainer />);

    expect(await screen.findByText('Paycheck from Bob\'s Burgers')).toBeInTheDocument();
    expect(await screen.findByText('South by Southwest Quinoa Bowl at Fresh & Co')).toBeInTheDocument();
  });
});