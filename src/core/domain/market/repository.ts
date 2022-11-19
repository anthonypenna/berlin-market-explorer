import type { Market } from "@/core/domain/market/entity";

export interface MarketRepository {
  getMarkets(query?: string): Promise<Market[]>;
}
