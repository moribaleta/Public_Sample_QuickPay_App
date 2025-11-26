import { createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import type { AuthData } from '../services/authentication/types';

// Define your router context type
export interface RouterContext {
  auth: {
    user: AuthData | null;
    isAuthenticated: boolean;
  };
}

// Create router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: {
      user: null,
      isAuthenticated: false,
    },
  } satisfies RouterContext,
});

// Helper functions for auth state management
export const updateAuthContext = (authData: AuthData | null) => {
  router.invalidate(); // This triggers re-renders
  // Update context through a state manager or use router's built-in methods
};

export const logout = () => {
  updateAuthContext(null);
};

// Ensure type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}