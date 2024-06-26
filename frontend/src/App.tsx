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

function App() {
  const [totalSpent, setTotalSpent] = useState<number>(0);

  useEffect(() => {
    fetch("/api/expenses/total-spent")
      .then((res) => res.json())
      .then((data) => {
        setTotalSpent(data.totalSpent);
      });
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
