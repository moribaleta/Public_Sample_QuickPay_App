import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginPage } from '../pages/login';
import { validateAuthentication } from '../services/authentication';

export const Route = createFileRoute('/login/')({
  beforeLoad: async () => {
    const isAuthenticated = await validateAuthentication();
    if (isAuthenticated) {
      console.log('User already authenticated, redirecting to overview.');
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});
