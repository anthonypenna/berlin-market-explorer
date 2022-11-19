import type { Market } from "@/core/domain/market/entity";

export interface MarketService {
  getMarkets(query?: string): Promise<Market[]>;
}
