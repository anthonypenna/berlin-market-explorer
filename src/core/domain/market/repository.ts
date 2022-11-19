import type { Market } from "@/core/domain/market/entity";

export interface MarketRepository {
  getMarkets(): Promise<Market[]>;
}
