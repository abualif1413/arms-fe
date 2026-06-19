import type { PaginationProps } from "../types/props";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
}) => {
  const maxVisible = limit;

  // Determine the visible page range
  const half = Math.floor(maxVisible / 2);
  let startPage = Math.max(1, currentPage - half);
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex flex-col items-center justify-center mt-6 space-y-2 text-sm">
      {/* Info */}
      <div className="text-gray-600">
        Page{" "}
        <span className="font-semibold text-indigo-600">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span> - Total items:{" "}
        <span className="font-semibold">{totalItems}</span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-2">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-md transition ${
              page === currentPage
                ? "bg-indigo-600 text-white border-indigo-600"
                : "text-gray-700 hover:bg-indigo-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
