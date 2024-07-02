import type { ApiExpensesRoutesType } from "@backend/app";
import type { CreateExpense } from "@backend/sharedTypes";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

const client = hc<ApiExpensesRoutesType>("/");

export const api = client.api;

const getCurrentUser = async () => {
  const res = await api.me.$get();
  if (!res.ok) throw new Error("Failed to fetch user. Not logged in!!!!");

  const data = res.json();
  return data;
};
export const currentUserQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Number.POSITIVE_INFINITY,
});

export const getAllExpenses = async () => {
  const res = await api.expenses.$get();
  if (!res.ok) throw new Error("Failed to fetch total spent");
  const data = res.json();
  return data;
};

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export const createExpense = async ({ value }: { value: CreateExpense }) => {
  // await new Promise((r) => setTimeout(r, 3000));
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) throw new Error("Failed to create expense");
  const newExpense = await res.json();
  return newExpense;
};

export const deleteExpense = async ({ id }: { id: number }) => {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });
  if (!res.ok) throw new Error("Failed to delete expense");

  const deletedExpense = await res.json();
  return deletedExpense;
};
