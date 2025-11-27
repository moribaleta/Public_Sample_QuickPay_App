import { useIsMobile } from '../../hooks/useIsMobile';
import { useAuthentication } from '../../services/authentication';
import { useTransactions } from '../../services/transactions';
import { TransactionList } from './components/TransactionList';
import { TransactionTable } from './components/TransactionTable';

export const OverviewPage = () => {
  const { data } = useTransactions();
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
          <TransactionList data={data} />
        ) : (
          <TransactionTable data={data} />
        )}
      </div>
    </div>
  );
};
