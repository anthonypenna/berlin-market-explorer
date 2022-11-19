import { beforeEach, describe, expect, it, vi } from "vitest";
import { MarketRepositoryImpl } from "@/core/infrastructure/market/repository";
import type { GetMarketListDto } from "@/core/infrastructure/market/dto";
import type { Market } from "@/core/domain/market/entity";

describe("getMarkets", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn<any>((url: string) => {
      if (url.includes("none")) {
        return Promise.resolve({
          json: vi.fn().mockResolvedValue({
            features: [],
          }),
        });
      }

      return Promise.resolve({
        json: vi.fn().mockResolvedValue(<GetMarketListDto>{
          features: [
            {
              properties: {
                data: {
                  id: "1",
                  bezeichnung: "Name",
                  bezirk: "District",
                  plz: "Postal code",
                  strasse: "Street",
                  _wgs84_lat: "0",
                  _wgs84_lon: "0",
                },
              },
            },
          ],
        }),
      });
    });
  });

  describe("when no query is specified", () => {
    it("returns the list of all markets", async () => {
      const repository = new MarketRepositoryImpl();
      expect(await repository.getMarkets()).toEqual<Market[]>([
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
      const repository = new MarketRepositoryImpl();
      expect(await repository.getMarkets("none")).toEqual<Market[]>([]);
    });
  });
});
