import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="flex flex-col bg-background max-w-md m-auto gap-y-5">
      <Button className="" type="button" onClick={() => setCount(count + 1)}>
        up
      </Button>
      <Button type="button" onClick={() => setCount(count - 1)}>
        down
      </Button>
      <p>{count}</p>
    </div>
  );
}

export default App;
