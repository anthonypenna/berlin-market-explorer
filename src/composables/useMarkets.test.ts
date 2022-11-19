import { describe, expect, it, vi } from "vitest";
import { useMarkets } from "@/composables/useMarkets";
import type { Market } from "@/core/domain/market/entity";
import { promisify } from "util";

vi.mock("@/core/infrastructure/market/service", () => {
  return {
    MarketServiceImpl: vi.fn().mockReturnValue({
      getMarkets: vi.fn((query: string) => {
        const markets: Market[] = [
          {
            id: "1",
            name: "Some market",
            address: {
              district: "Some place",
              postalCode: "Some postal code",
              street: "Some street",
            },
            coordinates: {
              latitude: 0,
              longitude: 0,
            },
          },
        ];

        if (query) {
          return Promise.resolve(
            markets.filter((market) => JSON.stringify(market).includes(query))
          );
        }

        return Promise.resolve(markets);
      }),
    }),
  };
});

describe("getMarkets", () => {
  it("gets the list of markets", async () => {
    const { markets, query, getMarkets } = useMarkets();
    expect(markets.value).toEqual([]);

    await getMarkets();
    expect(markets.value).toEqual<Market[]>([
      {
        id: "1",
        name: "Some market",
        address: {
          district: "Some place",
          postalCode: "Some postal code",
          street: "Some street",
        },
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
      },
    ]);

    query.value = "foo";

    await promisify(process.nextTick)();
    expect(markets.value).toEqual([]);
  });
});
