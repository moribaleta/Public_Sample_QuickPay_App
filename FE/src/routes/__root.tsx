import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <main>
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: Root,
});

export default Route;
