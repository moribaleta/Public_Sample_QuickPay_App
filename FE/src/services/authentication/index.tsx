import { fetchWrapper } from '../api';
import { useMutation } from '@tanstack/react-query';
import type { AuthData, AuthResponse, LoginParams } from './types';
import { router } from '../../router';
import { useRouter } from '@tanstack/react-router';

let authState = {
  user: null as AuthData | null,
  isAuthenticated: false,
};

export const updateAuthState = (authData: AuthData | null) => {
  authState = {
    user: authData,
    isAuthenticated: !!authData,
  };

  storeTokenInCookies(authData!);
};

export const getAuthState = () => ({ ...authState });

export const clearAuthState = () => {
  updateAuthState(null);
};

const getRefreshTokenFromCookies = (): {
  refresh_token: string | null;
  access_token: string | null;
} => {
  const cookies = document.cookie.split('; ').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return {
    refresh_token: cookies['refresh_token'] || null,
    access_token: cookies['access_token'] || null,
  };
};

const storeTokenInCookies = (authData: AuthData | null) => {
  if (!authData) {
    document.cookie = `access_token=; path=/; max-age=0`;
    document.cookie = `refresh_token=; path=/; max-age=0`;
    return;
  }

  document.cookie = `access_token=${authData.access_token}; path=/; max-age=${authData.expires_in}`;
  document.cookie = `refresh_token=${authData.refresh_token}; path=/; max-age=${1 * 24 * 60 * 60}`; // 7 days
};

export const validateUsingRefreshToken = async () => {
  const { refresh_token, access_token } = getRefreshTokenFromCookies();
  if (!refresh_token) {
    console.log('No refresh token found in cookies.');
    clearAuthState();
    throw new Error('No refresh token found');
  }

  try {
    const response = await fetchWrapper('token', {
      body: JSON.stringify({ refresh_token }),
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      clearAuthState();
      throw new Error('Token refresh failed: ' + response.status);
    } else {
      const data = (await response.json()) as AuthResponse;
      console.log('Token refresh successful:', data.data);
      updateAuthState(data.data);
      return true;
    }
  } catch (error) {
    console.error('Error during token refresh:', error);
    clearAuthState();
    throw error;
  }
};

/**
 * main function to validate authentication state
 * checks both in-memory and cookie-stored tokens
 */
export const validateAuthentication = async (): Promise<boolean> => {
  const isInMemoryAuthenticated = getAuthState().isAuthenticated;
  let isInCookieAuthenticated = false;
  try {
    isInCookieAuthenticated = await validateUsingRefreshToken();
  } catch (error) {
    console.log('Error during token validation:', error);
  }

  if (!isInMemoryAuthenticated && !isInCookieAuthenticated) {
    return false;
  }

  return true;
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
        return (await response.json()) as AuthResponse;
      }
    },
    onSuccess: (data) => {
      updateAuthState(data.data);
      storeTokenInCookies(data.data);
      navigate({ to: '/' });
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  const logout = async () => {
    clearAuthState();
    loginMutation.reset();
    await router.invalidate();
  };

  return {
    login,
    logout,
  };
};
