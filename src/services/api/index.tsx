type apiRoutes = 'login' | 'token' | 'transactions';

const apiRoutes: Readonly<Record<apiRoutes, string>> = {
  login: '/login',
  token: '/token/refresh',
  transactions: '/transactions',
};

export const fetchWrapper = async (
  endpoint: apiRoutes,
  options: RequestInit = {},
) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/v1';
  const response = await fetch(`${apiUrl}${apiRoutes[endpoint]}`, options);
  return response;
};
