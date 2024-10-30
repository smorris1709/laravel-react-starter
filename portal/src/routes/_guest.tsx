import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_guest')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
    session: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      return redirect({
        to: search.redirect ?? '/',
      });
    }
  },
  component: () => (
    <div className="flex h-screen flex-col">
      <Outlet />
    </div>
  ),
});
