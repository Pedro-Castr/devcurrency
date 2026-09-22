import { describe, expect, test } from "vitest";
import {
  formatCurrency,
  formatCompactCurrency,
  formatNumber,
  formatCompactNumber,
  formatPercent,
} from "./formatCurrency";

describe("Testes de Formatação", () => {
  test("FormatCurrency de 18.54 deve retornar R$ 18,54", () => {
    expect(formatCurrency(18.54)).toBe("R$\u00A018,54");
  });

  test("formatCompactCurrency de 1010030045 deve retornar R$ 1,01 bi", () => {
    expect(formatCompactCurrency(1010030045)).toBe("R$\u00A01,01\u00a0bi");
  });

  test("formatNumber de 1226.59 deve retornar 1.226,59", () => {
    expect(formatNumber(1226.59)).toBe("1.226,59");
  });

  test("formatCompactNumber de 3348122.62 deve retornar 3,35 mi", () => {
    expect(formatCompactNumber(3348122.62)).toBe("3,35\u00a0mi");
  });

  test("formatPercent de 93.6 deve retornar 93,60%", () => {
    expect(formatPercent(93.6)).toBe("93,60%");
  });
});
