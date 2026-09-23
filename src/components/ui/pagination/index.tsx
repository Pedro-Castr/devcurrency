import { getPageNumbers } from "./getPageNumbers";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

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
