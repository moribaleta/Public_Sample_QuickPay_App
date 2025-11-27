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
      <button
        className={`px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={`px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
