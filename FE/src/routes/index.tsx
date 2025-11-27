import { createFileRoute, redirect } from '@tanstack/react-router';
import { OverviewPage } from '../pages/overview';

export const Route = createFileRoute('/')({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeLoad: async ({ context }: { context: any }) => {
    if (!context.auth?.isAuthenticated) {
      // Redirect to login if not authenticated
      throw redirect({ to: '/login' });
    }
  },
  component: OverviewPage,
});
