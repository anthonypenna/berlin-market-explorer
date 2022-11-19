import type { Market } from "@/core/domain/market/entity";
import type { MarketRepository } from "@/core/domain/market/repository";
import type { MarketService } from "@/core/domain/market/service";

export class MarketServiceImpl implements MarketService {
  constructor(private marketRepository: MarketRepository) {}

  async getMarkets(query = ""): Promise<Market[]> {
    return this.marketRepository.getMarkets(query);
  }
}
