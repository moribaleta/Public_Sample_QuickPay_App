import { fetchWrapper } from '../api';
import { useMutation } from '@tanstack/react-query';

type LoginParams = {
  username: string;
  password: string;
};

export const useAuthentication = () => {
  const { setIsAuthenticated } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: LoginParams) => {
      const response = await fetchWrapper('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      } else {
        return await response.json();
      }
    },
    onMutate: () => {
      //TODO implement mock login success handling

      con;
    },
  });

  const login = async (username: string, password: string) => {
    //TODO implement mock login
    loginMutation.mutate({ username, password });
  };

  const logout = async () => {
    //TODO implement mock logout
  };

  const isAuthenticated = () => {
    //TODO implement mock isAuthenticated
    return false;
  };

  return {
    login,
    logout,
    isAuthenticated,
  };
};
