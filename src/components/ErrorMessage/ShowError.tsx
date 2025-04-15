const ErrorMessage = ({
  message,
  className,
  showBtn,
  black,
}: {
  message: string;
  className?: string;
  showBtn: boolean;
  black?: string;
}) => {
  const handleRetry = () => {
    window.location.reload();
  };
  return (
    <div className={className}>
      <p style={{ color: black && "black" }} className={`text-gray-200 text-lg`}>
        {message || "Oops! Something went wrong!"}
      </p>
      {showBtn && (
        <button
          onClick={handleRetry}
          className="text-sm bg-primary-red border border-primary-red text-white rounded-lg py-3 px-8 w-auto mt-7 font-semibold"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
export default ErrorMessage;
