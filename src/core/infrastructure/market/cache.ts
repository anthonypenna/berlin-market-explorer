import type { Cache } from "@/core/infrastructure/cache";
import type { Market } from "@/core/domain/market/entity";

export class MarketCache implements Cache<Market[]> {
  constructor(private storage: Record<string, Market[]> = {}) {}

  has(key: string): boolean {
    return key in this.storage;
  }

  get(key: string): Market[] | null {
    return this.storage[key] ?? null;
  }

  set(key: string, value: Market[]): void {
    this.storage[key] = value;
  }
}
