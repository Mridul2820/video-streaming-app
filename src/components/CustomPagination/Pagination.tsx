import React from "react";
import NextIcon from "../Icons/NextIcon";
import PreviousIcon from "../Icons/PreviousIcon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
    window.scrollTo(0, 0);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    startPage = Math.max(1, endPage - maxVisiblePages + 1);

    // Add previous button
    items.push(
      <li
        key="prev"
        className={`cursor-pointer ${currentPage === 1 ? "opacity-50" : ""}`}
      >
        <a
          onClick={handlePrevious}
          className="flex items-center justify-center"
        >
          <PreviousIcon />
        </a>
      </li>
    );

    // Add ellipsis
    if (startPage > 1) {
      items.push(
        <li
          key="ellipsis-start"
          className="flex text-white items-center justify-center"
        >
          <span>...</span>
        </li>
      );
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      items.push(
        <li key={i} className="flex items-center justify-center">
          <a
            onClick={() => onPageChange(i)}
            className={`${
              isActive
                ? "bg-white text-secondary w-4 h-4 flex items-center justify-center rounded-full"
                : "bg-gray-500 hover:bg-gray-200 w-4 h-4 flex items-center justify-center rounded-full"
            }`}
          >
            {/* {i} */}
          </a>
        </li>
      );
    }

    // Add right ellipsis
    if (endPage < totalPages) {
      items.push(
        <li
          key="ellipsis-end"
          className="text-white flex items-center justify-center"
        >
          <span>...</span>
        </li>
      );
    }

    // Add next button
    items.push(
      <li
        key="next"
        className={`cursor-pointer ${
          currentPage === totalPages ? "opacity-50" : ""
        }`}
      >
        <a onClick={handleNext} className="flex items-center justify-center">
          <NextIcon />
        </a>
      </li>
    );

    return items;
  };

  return (
    <nav className="flex justify-center items-center">
      <ul className="flex items-center gap-3 text-sm leading-5">
        {renderPaginationItems()}
      </ul>
    </nav>
  );
};

export default Pagination;
