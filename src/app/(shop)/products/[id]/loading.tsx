export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />
        <div className="flex flex-col gap-4">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="mt-2 h-12 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
