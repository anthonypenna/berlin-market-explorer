import type { Market } from "@/core/domain/market/entity";
import type { MarketService } from "@/core/domain/market/service";
import { MarketRepositoryImpl } from "@/core/infrastructure/market/repository";
import { MarketServiceImpl } from "@/core/infrastructure/market/service";
import { BehaviorSubject } from "rxjs";

export class MarketStore {
  constructor(private marketService: MarketService) {}

  markets$ = new BehaviorSubject<Market[]>([]);
  query$ = new BehaviorSubject("");

  async getMarkets(query = "") {
    const markets = await this.marketService.getMarkets(query);
    this.markets$.next(markets);
  }
}

const marketRepository = new MarketRepositoryImpl();
const marketService = new MarketServiceImpl(marketRepository);
export const marketStore = new MarketStore(marketService);
