import { useIsMobile } from '../../hooks/useIsMobile';
import { useAuthentication } from '../../services/authentication';
import { useTransactions } from '../../services/transactions';
import { TransactionList } from './components/TransactionList';
import { TransactionTable } from './components/TransactionTable';
import { TransactionPageIndicator } from './components/TranscationPageIndicator';

export const OverviewPage = () => {
  const { data, onNextPage, onPrevPage } = useTransactions();
  const { logout } = useAuthentication();

  const isMobile = useIsMobile();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>Overview Page</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <h2>Transactions</h2>
        {isMobile ? (
          <TransactionList data={data?.data ?? []} />
        ) : (
          <TransactionTable data={data?.data ?? []} />
        )}
        <TransactionPageIndicator
          totalPages={data?.pagination.total_pages ?? 1}
          currentPage={data?.pagination.current_page ?? 1}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      </div>
    </div>
  );
};
