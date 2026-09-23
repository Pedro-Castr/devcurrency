import { beforeEach, describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorageState } from "./useLocalStorageState";

describe("useLocalStorageState", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("usa o valor padrão quando não há nada salvo", () => {
    const { result } = renderHook(() => useLocalStorageState("theme", "light"));

    expect(result.current[0]).toBe("light");
  });

  test("lê o valor salvo, quando existe", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));
    const { result } = renderHook(() => useLocalStorageState("theme", "light"));

    expect(result.current[0]).toBe("dark");
  });

  test("setItem atualiza o estado e o localStorage", () => {
    const { result } = renderHook(() => useLocalStorageState("theme", "light"));
    act(() => {
      result.current[1]("dark");
    });

    expect(result.current[0]).toBe("dark");
    expect(localStorage.getItem("theme")).toBe(JSON.stringify("dark"));
  });

  test("aceita uma função atualizadora e salva o valor resolvido, não a função", () => {
    const { result } = renderHook(() =>
      useLocalStorageState("isDescending", true),
    );
    act(() => {
      result.current[1]((prev) => !prev);
    });

    expect(result.current[0]).toBe(false);
    expect(localStorage.getItem("isDescending")).toBe(JSON.stringify(false));
  });
});
