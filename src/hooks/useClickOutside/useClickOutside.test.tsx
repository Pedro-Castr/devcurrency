import { describe, expect, test, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { useClickOutside } from "./useClickOutside";

function TestComponent({ onClose }: { onClose: () => void }) {
  const ref = useClickOutside(onClose);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        conteúdo de dentro
      </div>
      <div data-testid="outside">conteúdo de fora</div>
    </div>
  );
}

describe("useClickOutside", () => {
  afterEach(() => {
    cleanup();
  });

  test("chama onClose quando o clique acontece fora do elemento", () => {
    const onClose = vi.fn();

    render(<TestComponent onClose={onClose} />);

    const outsideElement = screen.getByTestId("outside");
    fireEvent.mouseDown(outsideElement);

    expect(onClose).toHaveBeenCalled();
  });

  test("não chama onClose quando o clique acontece dentro do elemento", () => {
    const onClose = vi.fn();

    render(<TestComponent onClose={onClose} />);

    const insideElement = screen.getByTestId("inside");
    fireEvent.mouseDown(insideElement);

    expect(onClose).not.toHaveBeenCalled();
  });
});
