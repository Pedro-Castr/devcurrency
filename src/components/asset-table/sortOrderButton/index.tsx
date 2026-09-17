import { BsChevronDown } from "react-icons/bs";

import styles from "./sortOrderButton.module.css";

interface SortOrderButtonProps {
  onToggle: () => void;
  isDescending: true | false;
}

export function SortOrderButton({
  onToggle,
  isDescending,
}: SortOrderButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onToggle}
      aria-label={isDescending ? "Ordem decrescente" : "Ordem crescente"}
    >
      <BsChevronDown
        size={16}
        className={isDescending ? styles.iconDown : styles.iconUp}
      />
    </button>
  );
}
