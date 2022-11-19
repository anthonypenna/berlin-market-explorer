import type { Market } from "@/core/domain/market/entity";
import type { MarketRepository } from "@/core/domain/market/repository";
import { describe, expect, it } from "vitest";
import { MarketServiceImpl } from "@/core/infrastructure/market/service";

class MockMarketRepository implements MarketRepository {
  getMarkets(): Promise<Market[]> {
    return Promise.resolve([]);
  }
}

describe("getMarkets", () => {
  it("gets the list of markets", async () => {
    const repository = new MockMarketRepository();
    const service = new MarketServiceImpl(repository);
    expect(await service.getMarkets()).toEqual([]);
  });
});
