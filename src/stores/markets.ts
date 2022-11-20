import type { Market } from "@/core/domain/market/entity";
import type { MarketService } from "@/core/domain/market/service";
import { MarketCache } from "@/core/infrastructure/market/cache";
import { MarketRepositoryImpl } from "@/core/infrastructure/market/repository";
import { MarketServiceImpl } from "@/core/infrastructure/market/service";
import { BehaviorSubject } from "rxjs";

export class MarketStore {
  constructor(
    private marketService: MarketService,
    private marketCache: MarketCache
  ) {}

  markets$ = new BehaviorSubject<Market[]>([]);
  query$ = new BehaviorSubject("");

  async getMarkets(query = "") {
    if (this.marketCache.has(query)) {
      const markets = this.marketCache.get(query)!;
      this.markets$.next(markets);
      return;
    }

    const markets = await this.marketService.getMarkets(query);
    this.markets$.next(markets);
    this.marketCache.set(query, markets);
  }
}

const marketRepository = new MarketRepositoryImpl();
const marketService = new MarketServiceImpl(marketRepository);
const marketCache = new MarketCache();

export const marketStore = new MarketStore(marketService, marketCache);
