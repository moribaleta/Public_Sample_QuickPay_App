import type { Transaction } from '../../../services/transactions/types';

export const TransactionTable = ({ data }: { data?: Transaction[] }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>
                {transaction.amount_in_cents} {transaction.currency}
              </td>
              <td>{transaction.type}</td>
              <td>{transaction.status}</td>
              <td>{transaction.created_at}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
