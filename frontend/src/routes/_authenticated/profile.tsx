import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUserQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Profile = () => {
  const { isPending, error, data } = useQuery(currentUserQueryOptions);
  if (isPending) return "Loading...";
  if (error) return `Not Logged in. An error has occurred: ${error.message}`;

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            // src={data.user.picture ?? "https://github.com/shadcn.png"}
            alt={data.user.given_name}
          />
          <AvatarFallback>{data.user.given_name}</AvatarFallback>
        </Avatar>
        <p>
          {data.user.given_name}
          {data.user.family_name}
        </p>
      </div>
      <Button asChild className="my-4">
        <a href="/api/logout">Logout!</a>
      </Button>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});
