import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Loading } from ".";

describe("loading", () => {
  test("exibe a mensagem de carregamento", () => {
    render(<Loading message="Mensagem de teste." />);
    const element = screen.getByText("Mensagem de teste.");
    expect(element).toBeInTheDocument();
  });
});
