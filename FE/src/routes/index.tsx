import { createFileRoute, redirect } from '@tanstack/react-router';
import { OverviewPage } from '../pages/overview';
import { validateAuthentication } from '../services/authentication';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const isAuthenticated = await validateAuthentication();
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login.');
      throw redirect({ to: '/login' });
    }
  },
  component: OverviewPage,
});
