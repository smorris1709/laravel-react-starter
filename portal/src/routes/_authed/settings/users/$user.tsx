import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/settings/users/$user')({
  loader: async () => {},
  component: UserPage,
});

function UserPage() {
  const { user } = Route.useParams();

  return <div>User {user}</div>;
}
