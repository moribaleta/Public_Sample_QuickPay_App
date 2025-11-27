type apiRoutes = 'login' | 'token' | 'transactions';

const apiRoutes: Readonly<
  Record<
    apiRoutes,
    {
      readonly path: string;
      readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    }
  >
> = {
  login: { path: '/login', method: 'POST' },
  token: { path: '/token/refresh', method: 'POST' },
  transactions: { path: '/transactions', method: 'GET' },
};

export const fetchWrapper = async (
  endpoint: apiRoutes,
  options: RequestInit = {},
) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const requestConfig: RequestInit = {
    method: apiRoutes[endpoint].method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  // Only add body if it exists and method supports it
  if (
    options.body &&
    (apiRoutes[endpoint].method === 'POST' ||
      apiRoutes[endpoint].method === 'PUT')
  ) {
    requestConfig.body = options.body;
  }

  const response = await fetch(
    `${apiUrl}${apiRoutes[endpoint].path}`,
    requestConfig,
  );
  return response;
};

export const fetchWithAuth = async (
  endpoint: apiRoutes,
  token?: string,
  options: RequestInit = {},
  queryParams?: Record<string, string | number>,
) => {
  console.log('Fetching with auth. Endpoint:', endpoint);
  console.log('Auth Headers:', token);

  if (!token) {
    throw new Error('No authentication token found');
  }

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  console.log('Fetching with auth. Endpoint:', endpoint);
  console.log('Auth Headers:', authHeaders);

  // Build query string if parameters are provided
  let url = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}${apiRoutes[endpoint].path}`;
  if (queryParams) {
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.append(key, value.toString());
    });
    url += `?${searchParams.toString()}`;
  }

  const requestConfig: RequestInit = {
    method: apiRoutes[endpoint].method,
    mode: 'cors',
    headers: authHeaders,
    ...options,
  };

  const response = await fetch(url, requestConfig);
  return response;
};
