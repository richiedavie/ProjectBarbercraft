export default function OwnerLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-[#E6DFD3]/60 rounded-md w-48" />

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#E6DFD3] rounded-[12px] p-5 h-28 flex flex-col justify-between"
          >
            <div className="h-4 bg-[#E6DFD3]/50 rounded w-24" />
            <div className="h-7 bg-[#E6DFD3]/70 rounded w-16" />
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3 pt-4">
        <div className="h-5 bg-[#E6DFD3]/60 rounded w-36" />
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#E6DFD3] rounded-[12px] p-6 h-36"
          />
        ))}
      </div>
    </div>
  );
}

