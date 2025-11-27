type apiRoutes = 'login' | 'token' | 'transactions';

const apiRoutes: Readonly<
  Record<
    apiRoutes,
    {
      readonly path: string;
      readonly method: 'GET' | 'POST';
    }
  >
> = {
  login: { path: '/login', method: 'POST' },
  token: { path: '/token/refresh', method: 'POST' },
  transactions: { path: '/transactions', method: 'GET' },
};

/**
 * wrapper function for Fetch API to simplify api calls on different services
 * @param endpoint
 * @param options
 * @returns
 */
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
      apiRoutes[endpoint].method === 'GET')
  ) {
    requestConfig.body = options.body;
  }

  const response = await fetch(
    `${apiUrl}${apiRoutes[endpoint].path}`,
    requestConfig,
  );
  return response;
};

/**
 * Wrapper function for Fetch API to simplify authenticated API calls
 */
export const fetchWithAuth = async (
  endpoint: apiRoutes,
  token?: string,
  options: RequestInit = {},
  queryParams?: Record<string, string | number>,
) => {
  if (!token) {
    throw new Error('No authentication token found');
  }

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  // Build query string if parameters are provided
  let url = `${import.meta.env.VITE_API_URL}${apiRoutes[endpoint].path}`;
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
