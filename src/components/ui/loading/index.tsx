import styles from "./loading.module.css";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{message}</p>
    </div>
  );
}
