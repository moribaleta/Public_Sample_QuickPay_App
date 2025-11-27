import type { Transaction } from '../../../services/transactions/types';

export const TransactionTable = ({ data }: { data?: Transaction[] }) => {
  return (
    <table className="w-full table-auto rounded-lg border border-gray-300">
      <thead>
        <tr>
          <th className="text-left font-medium p-2 border border-gray-300">
            ID
          </th>
          <th className="text-left font-medium p-2 border border-gray-300">
            Amount
          </th>
          <th className="text-left font-medium p-2 border border-gray-300">
            Type
          </th>
          <th className="text-left font-medium p-2 border border-gray-300">
            Status
          </th>
          <th className="text-left font-medium p-2 border border-gray-300">
            Created At
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((transaction) => {
          return (
            <tr key={transaction.id} className="hover:bg-gray-100">
              <td className="text-left p-2 border border-gray-300">
                {transaction.id}
              </td>
              <td className="text-left p-2 border border-gray-300">
                {transaction.amount_in_cents} {transaction.currency}
              </td>
              <td className="text-left p-2 border border-gray-300">
                {transaction.type}
              </td>
              <td className="text-left p-2 border border-gray-300">
                {transaction.status}
              </td>
              <td className="text-left p-2 border border-gray-300">
                {transaction.created_at}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
