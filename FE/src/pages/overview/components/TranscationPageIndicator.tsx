export const TransactionPageIndicator = ({
  totalPages,
  currentPage,
  onNextPage,
  onPrevPage,
}: {
  totalPages: number;
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      {currentPage > 1 && (
        <div
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
          onClick={onPrevPage}
        >
          Previous
        </div>
      )}
      <span className="px-2">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <div
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
          onClick={onNextPage}
        >
          Next
        </div>
      )}
    </div>
  );
};
