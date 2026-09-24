import { describe, expect, test } from "vitest";

import {
  formatCurrency,
  formatCompactCurrency,
  formatNumber,
  formatCompactNumber,
  formatPercent,
} from "./formatCurrency";

describe("formatCurrency", () => {
  test("formata um valor decimal como moeda em reais", () => {
    expect(formatCurrency(18.54)).toBe("R$\u00A018,54");
  });
});

describe("formatCompactCurrency", () => {
  test("formata valores na casa dos bilhões de forma abreviada", () => {
    expect(formatCompactCurrency(1010030045)).toBe("R$\u00A01,01\u00a0bi");
  });
});

describe("formatNumber", () => {
  test("formata um número decimal com separador de milhar no padrão brasileiro", () => {
    expect(formatNumber(1226.59)).toBe("1.226,59");
  });
});

describe("formatCompactNumber", () => {
  test("formata valores na casa dos milhões de forma abreviada", () => {
    expect(formatCompactNumber(3348122.62)).toBe("3,35\u00a0mi");
  });
});

describe("formatPercent", () => {
  test("formata um número como porcentagem com duas casas decimais", () => {
    expect(formatPercent(93.6)).toBe("93,60%");
  });
});
