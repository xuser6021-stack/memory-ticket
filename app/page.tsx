import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Memory Ticket</CardTitle>
        </CardHeader>

        <CardContent>
          <p>My first full-stack project 🚀</p>
        </CardContent>
      </Card>
    </main>
  );
}