import React, { memo, useCallback } from "react";

interface IErrorBannerProps {
  error: string;
  onRetry: () => void;
}

const ErrorBanner = ({ error, onRetry }: IErrorBannerProps) => {
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return (
    <div className="text-center text-red-500" role="alert">
      <p className="mb-2">{error}</p>
      <button
        className="ml-4 px-3 py-1 bg-[#2E7D32] text-white rounded transition-colors duration-150 hover:bg-green-700"
        onClick={handleRetry}
        aria-label="Retry"
      >
        Retry
      </button>
    </div>
  );
};
export default memo(ErrorBanner);
