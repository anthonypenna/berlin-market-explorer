import type { Market } from "@/core/domain/market/entity";

export interface MarketService {
  getMarkets(): Promise<Market[]>;
}
