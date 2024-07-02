import { Toaster } from "@/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const NavBar = () => {
  return (
    <div className="p-2 flex justify-between max-w-2xl m-auto items-baseline">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </Link>
      <div className="flex gap-2">
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/help" className="[&.active]:font-bold">
          Help
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expenses
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
};

const Root = () => {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2 gap-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};

export interface MyRouterContext {
  queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Root />
      <TanStackRouterDevtools />
    </>
  ),
});
