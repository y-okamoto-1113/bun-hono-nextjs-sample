import { currentUserQueryOptions } from "@/lib/api";
import { Outlet, createFileRoute } from "@tanstack/react-router";

const Login = () => {
  return (
    <div className="p-2">
      <h1>You have to Login!</h1>
      <a href="/api/login">login</a>
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
