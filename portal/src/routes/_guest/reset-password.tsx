import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  return <div>Hello /auth/reset-password!</div>;
}
