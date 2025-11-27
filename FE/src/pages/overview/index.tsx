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
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-100">
      <div className="flex justify-between items-center mb-8 p-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          role="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col gap-4 max-w-[750px] mx-auto p-4 bg-white md:rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Transactions</h1>
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
