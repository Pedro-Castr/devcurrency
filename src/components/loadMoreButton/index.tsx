import styles from "./loadMoreButton.module.css";

interface LoadMoreButtonProps {
  onClick: () => void;
}

export function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <button className={styles.buttonMore} type="button" onClick={onClick}>
      Buscar Mais
    </button>
  );
}
