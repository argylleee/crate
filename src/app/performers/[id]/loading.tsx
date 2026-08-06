export default function PerformerLoading() {
  return (
    <div>
      <div className="h-64 animate-pulse bg-gray-800 sm:h-80 lg:h-96" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="-mt-20 flex gap-6">
          <div className="h-32 w-32 animate-pulse rounded-2xl bg-gray-800" />
          <div className="space-y-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-800" />
            <div className="h-8 w-48 animate-pulse rounded bg-gray-800" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-800" />
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-800" />
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
