import "./App.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl">MinG board</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Starter home page built with shadcn/ui.</p>
          <Input placeholder="Name your first board" />
          <Button>Create board</Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
