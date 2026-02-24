export default function Loading() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-neutral-100 rounded" />
        <div className="h-4 w-96 bg-neutral-100 rounded" />
        <div className="h-4 w-64 bg-neutral-100 rounded" />
      </div>
    </div>
  );
}
