import { beforeEach, describe, expect, it, vi } from "vitest";
import { MarketRepositoryImpl } from "@/core/infrastructure/market/repository";

describe("getMarkets", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ features: [] }),
    });
  });

  it("returns the list of markets", async () => {
    const repository = new MarketRepositoryImpl();
    expect(await repository.getMarkets()).toEqual([]);
  });
});
