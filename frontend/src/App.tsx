import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const getTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("Failed to fetch total spent");
  const data = await res.json();
  return data;
};

const App = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <Card className="max-w-md m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.totalSpent}</CardContent>
      <CardFooter>
        <p>developed by okamoto</p>
      </CardFooter>
    </Card>
  );
};

export default App;
