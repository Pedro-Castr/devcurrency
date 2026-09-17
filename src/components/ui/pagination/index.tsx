import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SIBLING_COUNT = 1;

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Paginação de ativos">
      <button
        type="button"
        className={styles.arrowButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <BsChevronLeft size={14} />
      </button>

      <ul className={styles.pageList}>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <li key={`ellipsis-${index}`} className={styles.ellipsis}>
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={
                  page === currentPage
                    ? styles.pageButtonActive
                    : styles.pageButton
                }
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={styles.arrowButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <BsChevronRight size={14} />
      </button>
    </nav>
  );
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const totalVisible = SIBLING_COUNT * 2 + 5;

  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - SIBLING_COUNT, 1);
  const rightSibling = Math.min(currentPage + SIBLING_COUNT, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const pages: (number | "ellipsis")[] = [1];

  if (showLeftEllipsis) {
    pages.push("ellipsis");
  }

  for (let page = leftSibling; page <= rightSibling; page++) {
    if (page !== 1 && page !== totalPages) {
      pages.push(page);
    }
  }

  if (showRightEllipsis) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}
