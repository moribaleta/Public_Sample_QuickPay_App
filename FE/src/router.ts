import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import type { AuthData } from './services/authentication/types';
import { getAuthState } from './services/authentication';

export interface RouterContext {
  auth: {
    user: AuthData | null;
    isAuthenticated: boolean;
  };
}

export const router = createRouter({
  routeTree,
  context: {
    auth: getAuthState(),
  } satisfies RouterContext,
});

// Ensure type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
