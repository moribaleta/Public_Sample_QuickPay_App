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
  // Use proxy in development, full URL in production
  // Temporarily use direct URL to bypass proxy for testing
  const apiUrl = 'http://localhost:3000/api/v1';

  // Build the request config step by step to avoid any merging issues
  const requestConfig: RequestInit = {
    method: options.method || 'GET',
    mode: 'cors', // Changed from 'no-cors' to 'cors'
    // Remove credentials until server supports it properly
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  // Only add body if it exists and method supports it
  if (
    options.body &&
    (options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH')
  ) {
    requestConfig.body = options.body;
  }

  console.log('=== DEBUG fetchWrapper ===');
  console.log('Endpoint:', endpoint);
  console.log(
    'Environment:',
    import.meta.env.DEV ? 'development' : 'production',
  );
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('Computed apiUrl:', apiUrl);
  console.log('Final requestConfig:', requestConfig);
  console.log('Full Request URL:', `${apiUrl}${apiRoutes[endpoint]}`);
  console.log('========================');

  const response = await fetch(
    `${apiUrl}${apiRoutes[endpoint]}`,
    requestConfig,
  );
  return response;
};
