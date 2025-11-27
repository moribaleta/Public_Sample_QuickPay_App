import { fetchWrapper } from '../api';
import { useMutation } from '@tanstack/react-query';
import type { AuthData } from './types';
import { router } from '../../router';
import { useRouter } from '@tanstack/react-router';

// Auth state management
let authState = {
  user: null as AuthData | null,
  isAuthenticated: false,
};

// Auth state functions
export const updateAuthState = (authData: AuthData | null) => {
  authState = {
    user: authData,
    isAuthenticated: !!authData,
  };
};

export const getAuthState = () => authState;

export const clearAuthState = () => {
  updateAuthState(null);
};

type LoginParams = {
  email: string;
  password: string;
};

export const useAuthentication = () => {
  const { navigate } = useRouter();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const response = await fetchWrapper('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Explicit JSON
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      } else {
        return (await response.json()) as AuthData;
      }
    },
    onSuccess: (data) => {
      updateAuthState(data);
      router.invalidate();
      navigate({ to: '/' });
      // You might want to trigger router update here or handle it in the component
    },
  });

  const login = async (email: string, password: string) => {
    //TODO implement mock login
    loginMutation.mutate({ email, password });
  };

  const logout = async () => {
    //TODO implement mock logout
    loginMutation.reset();
    clearAuthState();
    router.invalidate();
  };

  const isAuthenticated = () => {
    //TODO implement mock isAuthenticated
    return authState.isAuthenticated;
  };

  return {
    login,
    logout,
    isAuthenticated,
  };
};
