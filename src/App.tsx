import { RouterProvider } from '@tanstack/react-router';
import { router } from './lib/router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

export default App;

// Ensure type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
