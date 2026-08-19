import styles from "./loading.module.css";

interface LoadingProps {
  frase: string;
}

export default function Loading({ frase }: LoadingProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{frase}</h1>
    </div>
  );
}
