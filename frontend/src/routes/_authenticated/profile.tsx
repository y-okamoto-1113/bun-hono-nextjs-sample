import { currentUserQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Profile = () => {
  const { isPending, error, data } = useQuery(currentUserQueryOptions);
  if (isPending) return "Loading...";
  if (error) return `Not Logged in. An error has occurred: ${error.message}`;

  return (
    <div className="p-2 max-w-3xl m-auto">
      <h1>Profile</h1>
      <p>{data.user.family_name}</p>
      <a href="/api/logout">Logout!</a>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});
