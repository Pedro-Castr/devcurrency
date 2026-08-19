import { CoinRow } from "../coinRow";
import { type CoinProps } from "../../types/coin";

import styles from "./coinTable.module.css";

interface CoinTableProps {
  coins: CoinProps[];
}

export function CoinTable({ coins }: CoinTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Valor mercado</th>
          <th>Preço</th>
          <th>Volume</th>
          <th>Mudança 24h</th>
        </tr>
      </thead>

      <tbody>
        {coins.map((coin) => (
          <CoinRow key={coin.id} coin={coin} />
        ))}
      </tbody>
    </table>
  );
}
