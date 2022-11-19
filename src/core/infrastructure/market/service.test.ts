import type { Market } from "@/core/domain/market/entity";
import type { MarketRepository } from "@/core/domain/market/repository";
import { describe, expect, it } from "vitest";
import { MarketServiceImpl } from "@/core/infrastructure/market/service";

class MockMarketRepository implements MarketRepository {
  getMarkets(query = ""): Promise<Market[]> {
    if (query === "none") {
      return Promise.resolve([]);
    }

    return Promise.resolve<Market[]>([
      {
        id: "1",
        name: "Name",
        address: {
          district: "District",
          postalCode: "Postal code",
          street: "Street",
        },
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
    ]);
  }
}

describe("getMarkets", () => {
  describe("when no query is specified", () => {
    it("returns the list of all markets", async () => {
      const repository = new MockMarketRepository();
      const service = new MarketServiceImpl(repository);
      expect(await service.getMarkets()).toEqual<Market[]>([
        {
          id: "1",
          name: "Name",
          address: {
            district: "District",
            postalCode: "Postal code",
            street: "Street",
          },
          coordinates: {
            latitude: 0,
            longitude: 0,
          },
        },
      ]);
    });
  });

  describe("when a query is specified", () => {
    it("returns the list of available markets", async () => {
      const repository = new MockMarketRepository();
      const service = new MarketServiceImpl(repository);
      expect(await service.getMarkets("none")).toEqual([]);
    });
  });
});
