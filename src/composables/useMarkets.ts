import type { Market } from "@/core/domain/market/entity";
import { MarketRepositoryImpl } from "@/core/infrastructure/market/repository";
import { MarketServiceImpl } from "@/core/infrastructure/market/service";
import { debounce } from "@/utils/debounce";
import { ref, watch } from "vue";

export function useMarkets() {
  const markets = ref<Market[]>([]);
  const query = ref("");
  const marketRepository = new MarketRepositoryImpl();
  const marketService = new MarketServiceImpl(marketRepository);
  const marketsCache: Record<string, Market[]> = {};

  const getMarkets = async (query = "") => {
    if (query in marketsCache) {
      markets.value = marketsCache[query];
      return;
    }

    markets.value = await marketService.getMarkets(query);
    marketsCache[query] = markets.value;
  };

  const debouncedGetMarkets = debounce(getMarkets, 500);
  watch(query, (query) => debouncedGetMarkets(query));

  return { markets, query, getMarkets };
}
