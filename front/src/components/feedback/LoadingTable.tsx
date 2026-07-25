import { memo } from "react";

const LoadingTable = () => (
  <div className="space-y-3 p-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
    ))}
  </div>
);

export default memo(LoadingTable);
