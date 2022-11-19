import type { Market } from "@/core/domain/market/entity";
import { MarketRepositoryImpl } from "@/core/infrastructure/market/repository";
import { MarketServiceImpl } from "@/core/infrastructure/market/service";
import { ref, watch } from "vue";

export function useMarkets() {
  const marketRepository = new MarketRepositoryImpl();
  const marketService = new MarketServiceImpl(marketRepository);

  const markets = ref<Market[]>([]);
  const query = ref("");

  watch(query, getMarkets);

  async function getMarkets() {
    markets.value = await marketService.getMarkets(query.value);
  }

  return { markets, query, getMarkets };
}