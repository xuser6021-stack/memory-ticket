import MemoryForm from "@/components/memory/memory-form";

export default function NewMemoryPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Memory
      </h1>

      <MemoryForm />
    </main>
  );
}
