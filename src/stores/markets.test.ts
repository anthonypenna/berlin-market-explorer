import type { Market } from "@/core/domain/market/entity";
import type { MarketService } from "@/core/domain/market/service";
import { describe, expect, it } from "vitest";
import { MarketStore } from "@/stores/markets";
import { MarketCache } from "@/core/infrastructure/market/cache";

const mockMarket: Market = {
  id: "1",
  name: "Foo",
  address: {
    district: "Foo district",
    postalCode: "Foo postal code",
    street: "Foo street",
  },
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
};

class MockMarketService implements MarketService {
  getMarkets(query = ""): Promise<Market[]> {
    const markets: Market[] = [mockMarket];
    return Promise.resolve<Market[]>(
      markets.filter((market) =>
        JSON.stringify(market).toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}

describe("getMarkets", () => {
  it("gets the list of markets", async () => {
    const marketService = new MockMarketService();
    const marketCache = new MarketCache();
    const marketStore = new MarketStore(marketService, marketCache);
    expect(marketStore.markets$.value).toEqual([]);

    await marketStore.getMarkets();
    expect(marketStore.markets$.value).toEqual([mockMarket]);
    expect(marketCache.get("")).toEqual([mockMarket]);

    await marketStore.getMarkets("bar");
    expect(marketStore.markets$.value).toEqual([]);
    expect(marketCache.get("bar")).toEqual([]);
  });
});
