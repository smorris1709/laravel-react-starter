import { getUsers } from '@/api';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Route = createFileRoute('/_authed/settings/users/')({
  loader: async () => {
    let users = await getUsers();
    return { users };
  },
  staleTime: 30_000,
  component: Users,
});

function Users() {
  const users = Route.useLoaderData({
    select: ({ users }) => users,
  });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              href="/settings/users/$user"
              params={{
                user: user.id,
              }}
            >
              <TableCell>{user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
