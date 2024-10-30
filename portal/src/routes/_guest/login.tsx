import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Link } from '@/components/ui/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/api';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_guest/login')({
  component: LoginPage,
});

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

function LoginPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const auth = Route.useRouteContext({
    select: ({ auth }) => auth,
  });

  const handleSubmit = async (event: LoginEvent): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const payload: LoginFormData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const { data } = await login(payload);

      if (data && 'id' in data) {
        auth.login(data);
      }

      router.history.push(search.redirect || '/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search.session === 'expired') {
      toast.error('Your session has expired. Please login again.');
      // remove the session from the URL
      navigate({
        search: (prev) => ({
          ...prev,
          session: undefined,
        }),
      });
    }
  }, [search.session]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-semibold text-gray-900 hover:text-indigo-600 dark:text-gray-50 dark:hover:text-indigo-400"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" variant={'default'}>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
