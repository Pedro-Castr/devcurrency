import styles from "./rangebar.module.css";

interface RangeBarProps {
  label: string;
  low: number;
  high: number;
  current: number;
  lowFormatted: string;
  highFormatted: string;
}

export function RangeBar({
  label,
  low,
  high,
  current,
  lowFormatted,
  highFormatted,
}: RangeBarProps) {
  const range = high - low;
  const rawPosition = range > 0 ? ((current - low) / range) * 100 : 0;
  const position = Math.min(100, Math.max(0, rawPosition));

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>

      <div className={styles.track}>
        <div
          className={styles.marker}
          style={{ left: `${position}%` }}
          title={`Atual: ${current}`}
        />
      </div>

      <div className={styles.bounds}>
        <span>{lowFormatted}</span>
        <span>{highFormatted}</span>
      </div>
    </div>
  );
}
