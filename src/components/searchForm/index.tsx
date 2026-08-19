import { BsSearch } from "react-icons/bs";
import { type SubmitEvent } from "react";

import styles from "./searchForm.module.css";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

export function SearchForm({ value, onChange, onSubmit }: SearchFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Digite o nome da moeda"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      <button type="submit">
        <BsSearch size={30} color="#fff" />
      </button>
    </form>
  );
}
