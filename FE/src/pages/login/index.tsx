import { useAuthentication } from '../../services/authentication';

export const LoginPage = () => {
  const { login } = useAuthentication();

  return (
    <div className="absolute bg-gray-100 top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            login(email, password);
          }}
        >
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
