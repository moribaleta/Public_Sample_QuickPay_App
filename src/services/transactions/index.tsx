import { useQuery } from '@tanstack/react-query';
import type { Transaction } from './types';

export const useTransactions = () => {
  //TODO implement mock transactions service
  const transactions = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      return [
        {
          id: '1',
          amount_in_cents: 100,
          currency: 'USD',
          type: 'TRANSFER',
          status: 'completed',
          created_at: '2024-01-01',
          destination_id: 'dest1',
        },
        {
          id: '2',
          amount_in_cents: 200,
          currency: 'USD',
          type: 'TOPUP',
          status: 'pending',
          created_at: '2024-01-02',
          destination_id: 'dest2',
        },
      ];
    },
  });

  return {
    ...transactions,
  };
};
