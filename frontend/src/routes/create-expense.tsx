import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

function CreateExpense() {
  return (
    <div className="p-2">
      <form className="max-w-3xl m-auto">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Title" />
        <br />
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" placeholder="Amount" />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>
    </div>
  );
}

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});
