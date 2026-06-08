import { memo } from "react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No data available." }: EmptyStateProps) => (
  <div className="flex items-center justify-center p-12 text-center">
    <div className="space-y-2">
      <div className="text-gray-400 text-6xl mb-4">📭</div>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  </div>
);

export default memo(EmptyState);
