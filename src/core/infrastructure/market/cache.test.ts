import { describe, expect, it } from "vitest";
import { MarketCache } from "@/core/infrastructure/market/cache";
import type { Market } from "@/core/domain/market/entity";

describe("has", () => {
  describe("when the key doesnt exist", () => {
    it("returns false", () => {
      const cache = new MarketCache();
      expect(cache.has("foo")).toEqual(false);
    });
  });

  describe("when the key exists", () => {
    it("returns true", () => {
      const cache = new MarketCache();
      cache.set("foo", []);
      expect(cache.has("foo")).toEqual(true);
    });
  });
});

describe("get", () => {
  describe("when the key doesnt exist", () => {
    it("returns null", () => {
      const cache = new MarketCache();
      expect(cache.get("foo")).toEqual(null);
    });
  });

  describe("when the key exists", () => {
    it("returns the correct value", () => {
      const cache = new MarketCache();
      cache.set("foo", []);
      expect(cache.get("foo")).toEqual([]);
    });
  });
});

describe("set", () => {
  it("sets the correct key and value", () => {
    const storage: Record<string, Market[]> = {};
    const cache = new MarketCache(storage);
    cache.set("foo", []);
    expect(storage).toEqual({ foo: [] });
  });
});
