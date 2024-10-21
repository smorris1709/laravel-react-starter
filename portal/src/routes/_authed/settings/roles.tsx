import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/settings/roles")({
  component: Roles,
});

function Roles() {
  return (
    <div>
      <h1>Roles</h1>
    </div>
  );
}
