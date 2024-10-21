import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/settings/users")({
  component: () => <Users />,
});

function Users() {
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}
