import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExpense, getAllExpensesQueryOptions } from "@/lib/api";
import { createExpenseRequestSchema } from "@backend/sharedTypes";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";

function FieldInfo({
  field,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: Readonly<{ field: FieldApi<any, any, any, any> }>) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function CreateExpense() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions,
      );

      const newExpense = await createExpense({ value });
      queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
        expenses: [newExpense, ...existingExpenses.expenses],
      });
      navigate({ to: "/expenses" });
    },
  });

  return (
    <div className="p-2">
      <form
        className="flex flex-col max-w-3xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: createExpenseRequestSchema.shape.title,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                type="text"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <br />
        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseRequestSchema.shape.amount,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                type="number"
                step="0.01"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <br />
        <form.Field
          name="date"
          validators={{
            onChange: createExpenseRequestSchema.shape.date,
          }}
        >
          {(field) => (
            <div className="self-center">
              <Label htmlFor={field.name}>Date</Label>
              <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={(date) =>
                  field.handleChange((date ?? new Date()).toISOString())
                }
                className="rounded-md border"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
        <br />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" className="mt-4" disabled={!canSubmit}>
              Create
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});
