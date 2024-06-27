import { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hc } from "hono/client";
import type { ApiExpensesRoutesType } from "../../backend/app";

const client = hc<ApiExpensesRoutesType>("/");

async function App() {
  const [totalSpent, setTotalSpent] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await client.api.expenses["total-spent"].$get();
      const data = await res.json();
      setTotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  }, []);
  return (
    <Card className="max-w-md m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
      <CardFooter>
        <p>developed by okamoto</p>
      </CardFooter>
    </Card>
  );
}

export default App;
