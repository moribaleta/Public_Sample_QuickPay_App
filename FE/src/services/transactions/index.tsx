import { useQuery } from '@tanstack/react-query';
import type { TransactionResponse } from './types';
import { fetchWithAuth } from '../api';
import { useState } from 'react';
import { getAuthState } from '../authentication';

export const useTransactions = () => {
  const [page, setPage] = useState(1);

  const transactions = useQuery<TransactionResponse>({
    queryKey: ['transactions', page],
    queryFn: async () => {
      const response = await fetchWithAuth(
        'transactions',
        getAuthState().user?.access_token,
        {
          method: 'GET',
        },
        { page: page }, // Pass page as query parameter
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      return await response.json();
    },
  });

  if (transactions.error) {
    console.error('Error fetching transactions:', transactions.error);
  }

  const onNextPage = () => {
    if (page < (transactions.data?.pagination?.total_pages || 0))
      setPage((prev) => prev + 1);
  };

  const onPrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    ...transactions,
    onNextPage,
    onPrevPage,
    page,
  };
};
