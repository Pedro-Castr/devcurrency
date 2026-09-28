import { describe, expect, test, vi, afterEach } from "vitest";
import { getTicker, getTickers } from "./brapi";

function mockFetchResponse(options: {
  ok: boolean;
  status?: number;
  json?: () => Promise<unknown>;
}) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: options.ok,
      status: options.status ?? 200,
      json: options.json ?? vi.fn().mockResolvedValue({}),
    }),
  );
}

describe("Brapi", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("getTickers", () => {
    test("lança um erro quando a resposta da API não é ok", async () => {
      mockFetchResponse({ ok: false, status: 500 });

      await expect(getTickers("stock")).rejects.toThrow("Erro na API: 500");
    });

    test("retorna os ativos formatados quando a resposta é bem-sucedida", async () => {
      mockFetchResponse({
        ok: true,
        json: vi.fn().mockResolvedValue({
          stocks: [
            {
              stock: "PETR4",
              name: "PETROLEO BRASILEIRO S.A. PETROBRAS",
              close: 48.92,
              change: -0.16,
              volume: 32098300,
              market_cap: 666002537664,
              logo: "https://icons.brapi.dev/icons/PETR4.svg",
            },
          ],
          currentPage: 1,
          totalPages: 79,
        }),
      });

      const result = await getTickers("stock");

      expect(result.tickers[0].stock).toBe("PETR4");
      expect(result.totalPages).toBe(79);
    });
  });

  describe("getTicker", () => {
    test('lança "Ativo não encontrado" quando a busca não retorna nenhum resultado', async () => {
      mockFetchResponse({
        ok: true,
        json: vi.fn().mockResolvedValue({ stocks: [] }),
      });

      await expect(getTicker("INEXISTENTE4")).rejects.toThrow(
        "Ativo não encontrado",
      );
    });

    test("retorna o ativo formatado quando a resposta é bem-sucedida", async () => {
      mockFetchResponse({
        ok: true,
        json: vi.fn().mockResolvedValue({
          results: [
            {
              symbol: "PETR4",
              shortName: "PETR4",
              longName: "Petroleo Brasileiro SA Pfd",
              currency: "BRL",
              logourl: "https://icons.brapi.dev/icons/PETR4.svg",
            },
          ],
        }),
      });

      const result = await getTicker("PETR4");

      expect(result.symbol).toBe("PETR4");
    });
  });
});
