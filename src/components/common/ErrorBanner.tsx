interface IErrorBannerProps {
  error: string;
  onRetry: () => void;
}

const ErrorBanner = ({ error, onRetry }: IErrorBannerProps) => {
  return (
    <div className="text-center text-red-500" role="alert">
      <p> {error}</p>
      <button
        className="ml-4 px-3 py-1 bg-[#2E7D32] text-white rounded"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
};
export default ErrorBanner;
