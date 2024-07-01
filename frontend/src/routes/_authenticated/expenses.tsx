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
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const getAllExpenses = async () => {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error("Failed to fetch total spent");
  const data = res.json();
  return data;
};

const Expenses = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });
  if (error) return `An error has occurred: ${error.message}`;
  const totalExpenses =
    data?.expenses?.reduce((acc, expense) => acc + expense.amount, 0) ?? 0;

  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of your Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? [1, 2, 3].map((id) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
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
