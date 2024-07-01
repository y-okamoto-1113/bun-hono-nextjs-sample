import { Button } from "@/components/ui/button";
import { currentUserQueryOptions } from "@/lib/api";
import { Outlet, createFileRoute } from "@tanstack/react-router";

const Login = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center">
      <h1>You have to login or register</h1>
      <Button asChild>
        <a href="/api/login">Login</a>
      </Button>
      <Button asChild>
        <a href="/api/register">Register</a>
      </Button>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(currentUserQueryOptions);
      return data;
    } catch (e) {
      console.error(`beforeLoadでエラー発生。${e}`);
      return { user: null };
    }
  },
  component: Component,
});
