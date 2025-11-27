import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginPage } from '../pages/login';

export const Route = createFileRoute('/login/')({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeLoad: async ({ context }: { context: any }) => {
    // No special logic before loading login page for now
    if (context.auth?.isAuthenticated) {
      // If already authenticated, redirect to overview
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage,
});
