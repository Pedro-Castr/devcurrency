import { useEffect, useRef, type SubmitEvent } from "react";
import { BsSearch } from "react-icons/bs";

import type { AssetSuggestion } from "../../types/assets";

import styles from "./searchForm.module.css";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  suggestions: AssetSuggestion[];
  isOpen: boolean;
  onSelectSuggestion: (suggestion: AssetSuggestion) => void;
  onCloseSuggestions: () => void;
}

export function SearchForm({
  value,
  onChange,
  onSubmit,
  suggestions,
  isOpen,
  onSelectSuggestion,
  onCloseSuggestions,
}: SearchFormProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onCloseSuggestions();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCloseSuggestions]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Digite o ticker do ativo"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />

        <button type="submit">
          <BsSearch size={18} />
        </button>
      </form>

      {isOpen && (
        <ul className={styles.suggestions}>
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <li key={item.stock}>
                <button
                  type="button"
                  className={styles.suggestionItem}
                  onClick={() => onSelectSuggestion(item)}
                >
                  <img
                    className={styles.suggestionLogo}
                    src={item.logo}
                    alt=""
                  />

                  <span className={styles.suggestionInfo}>
                    <strong>{item.stock}</strong>
                    <span>{item.name}</span>
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className={styles.emptyState}>
              Nenhum ativo encontrado para "{value}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
