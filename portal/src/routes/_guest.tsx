import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_guest")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: async ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: search.redirect || "/",
      });
    }
  },
  component: () => (
    <div className="h-screen flex flex-col">
      <Outlet />
    </div>
  ),
});
