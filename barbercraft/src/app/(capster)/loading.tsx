export default function CapsterLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title & Description Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-[#E6DFD3]/60 rounded-md w-48" />
        <div className="h-4 bg-[#E6DFD3]/40 rounded-md w-64" />
      </div>

      {/* Filter / Tabs Skeleton */}
      <div className="flex gap-2 pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 bg-[#E6DFD3]/50 rounded-full w-24" />
        ))}
      </div>

      {/* Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 sm:p-6 h-44"
          />
        ))}
      </div>
    </div>
  );
}

