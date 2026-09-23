import { describe, expect, test } from "vitest";

import { getPageNumbers } from "./getPageNumbers";

describe("getPageNumbers", () => {
  test("retorna todas as páginas quando o total cabe sem precisar de ellipsis", () => {
    expect(getPageNumbers(2, 7)).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("retorna ellipsis dos dois lados quando a página atual está no meio da lista", () => {
    expect(getPageNumbers(10, 20)).toStrictEqual([
      1,
      "ellipsis",
      9,
      10,
      11,
      "ellipsis",
      20,
    ]);
  });

  test("omite o ellipsis da direita quando a página atual está perto do fim", () => {
    expect(getPageNumbers(19, 20)).toStrictEqual([1, "ellipsis", 18, 19, 20]);
  });

  test("omite o ellipsis da esquerda quando a página atual é igual a 3", () => {
    expect(getPageNumbers(3, 20)).toStrictEqual([1, 2, 3, 4, "ellipsis", 20]);
  });

  test("omite o ellipsis da direita quando a página atual está a 2 casas do fim", () => {
    expect(getPageNumbers(18, 20)).toStrictEqual([
      1,
      "ellipsis",
      17,
      18,
      19,
      20,
    ]);
  });
});
