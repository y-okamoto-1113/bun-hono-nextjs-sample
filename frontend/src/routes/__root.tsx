import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const NavBar = () => {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
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
    </div>
  );
};

const Root = () => {
  return (
    <>
      <NavBar />
      <hr />
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: () => (
    <>
      <Root />
      <TanStackRouterDevtools />
    </>
  ),
});
