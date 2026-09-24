import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("valor inicial é devolvido antes do tempo passar", () => {
    const { result } = renderHook(() => useDebounce("teste", 2000));

    expect(result.current).toBe("teste");
  });

  test("valor não muda antes do delay terminar", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 2000 } },
    );

    rerender({ value: "b", delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe("a");
  });

  test("valor muda depois do delay terminar", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 2000 } },
    );

    rerender({ value: "b", delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe("b");
  });

  test("usa o valor mais recente quando o input muda antes do delay terminar", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 2000 } },
    );

    rerender({ value: "b", delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    rerender({ value: "c", delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current).toBe("c");
  });
});
