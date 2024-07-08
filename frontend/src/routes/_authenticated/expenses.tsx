import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteExpense, getAllExpensesQueryOptions } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const Expenses = () => {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
  if (error) return `An error has occurred: ${error.message}`;
  const totalExpenses =
    data?.expenses?.reduce((acc, expense) => acc + +expense.amount, 0) ?? 0;

  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of your Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? [1, 2, 3].map((id) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                  <TableCell className="text-right">
                    <DeleteExpenseButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">${totalExpenses}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

export const DeleteExpenseButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: (error, variables, context) => {
      toast("Error", {
        description: `Failed to delete expense: ${id}`,
      });
      console.log("error: ", error);
      console.log("variables: ", variables);
      console.log("context: ", context);
    },
    onSuccess: async () => {
      toast("Expense deleted", {
        description: `Successfully deleted expense: ${id}`,
      });
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions,
      );

      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        expenses: existingExpenses.expenses.filter((e) => e.id !== id),
      });
    },
  });

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
    >
      {mutation.isPending ? "削除中" : <Trash className="h-4 w-4" />}
    </Button>
  );
};
