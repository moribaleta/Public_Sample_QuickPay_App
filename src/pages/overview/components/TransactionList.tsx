import type { Transaction } from '../../../services/transactions/types';

export const TransactionList = ({ data }: { data?: Transaction[] }) => {
  return (
    <div>
      {data?.map((transaction) => (
        <div
          key={transaction.id}
          className="border p-4 mb-2 rounded-lg shadow-sm"
        >
          <div className="font-semibold">Transaction ID: {transaction.id}</div>
          <div>
            Amount: {transaction.amount_in_cents} {transaction.currency}
          </div>
          <div>Type: {transaction.type}</div>
          <div>Status: {transaction.status}</div>
          <div>Created At: {transaction.created_at}</div>
        </div>
      ))}
    </div>
  );
};
