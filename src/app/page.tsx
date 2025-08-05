import TabbedInterface from '@/components/TabbedInterface';

export default function HomePage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Florence</h1>
      <TabbedInterface />
    </main>
  );
}