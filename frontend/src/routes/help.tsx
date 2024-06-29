import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
  component: Help,
});

function Help() {
  return (
    <div className="p-2">
      <h3>Help Page</h3>
    </div>
  );
}
